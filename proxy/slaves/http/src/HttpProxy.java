import java.io.IOException;
import java.net.InetSocketAddress;
import java.net.ProxySelector;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.rmi.NotBoundException;
import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.rmi.server.UnicastRemoteObject;
import java.util.Base64;
import java.util.List;
import java.util.Map;

public class HttpProxy implements HttpHandlerProxy {

    public static final String HTTP = "/http";

    public static void main(String[] args) throws RemoteException, NotBoundException {
        Registry registry = LocateRegistry.getRegistry(34545);
        ProxyI proxy = (ProxyI) registry.lookup("proxy");
        HttpHandlerProxy remoteObject = (HttpHandlerProxy) UnicastRemoteObject.exportObject(new HttpProxy(), 0);
        proxy.enregistrerService(HTTP, remoteObject);
    }

    @Override
    public Response handle(String method, List<String> paths, Map<String, String> arguments, byte[] body) throws RemoteException {
        HttpClient client = HttpClient.newBuilder()
                .proxy(ProxySelector.of(new InetSocketAddress("www-cache.iutnc.univ-lorraine.fr", 3128)))
                .build();

        String url = arguments.get("url");

        if (url == null) {
            String encoded_url = arguments.get("base64");

            if (encoded_url == null)
                return new Response(404, "application/json", "{\"erreur\": \"l'argument url n'est pas présent\"}".getBytes());

            url = new String(Base64.getDecoder().decode(encoded_url));
        }


        URI uri = null;
        try {
            uri = URI.create(url);
        } catch (Exception e) {
            return new Response(404, "application/json", "{\"erreur\": \"l'url est invalide ou malformée\"}".getBytes());
        }
        HttpRequest request = HttpRequest.newBuilder(uri).build();

        try {
            HttpResponse<byte[]> response = client.send(request, HttpResponse.BodyHandlers.ofByteArray());
            return new Response(response.statusCode(), response.headers().firstValue("Content-Type").orElse(""), response.body());

        } catch (IOException | InterruptedException e) {
            return new Response(404, "application/json", "{\"erreur\": \"erreur dans la requête\"}".getBytes());
        }
    }
}
