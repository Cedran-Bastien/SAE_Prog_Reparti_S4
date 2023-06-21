import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpsConfigurator;
import com.sun.net.httpserver.HttpsParameters;
import com.sun.net.httpserver.HttpsServer;

import javax.net.ssl.*;
import java.io.IOException;
import java.io.InputStream;
import java.net.InetSocketAddress;
import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.rmi.server.UnicastRemoteObject;
import java.security.*;
import java.security.cert.CertificateException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.regex.Pattern;

public class Proxy implements ProxyI {

    private static HttpsServer server;

    public Proxy() throws IOException, NoSuchAlgorithmException, KeyStoreException, UnrecoverableKeyException, CertificateException, KeyManagementException {
        server = HttpsServer.create(new InetSocketAddress(34546), 0);

        SSLContext sslContext = SSLContext.getInstance("TLS");

        char[] password = "password".toCharArray();
        KeyStore ks = KeyStore.getInstance("PKCS12");
        InputStream fis = getClass().getResourceAsStream("keystore.jks");
        ks.load(fis, password);

        // setup the key manager factory
        KeyManagerFactory kmf = KeyManagerFactory.getInstance("SunX509");
        kmf.init(ks, password);

        // setup the trust manager factory
        TrustManagerFactory tmf = TrustManagerFactory.getInstance("SunX509");
        tmf.init(ks);

        // setup the HTTPS context and parameters
        sslContext.init(kmf.getKeyManagers(), tmf.getTrustManagers(), null);

        server.setHttpsConfigurator(new HttpsConfigurator(sslContext) {
            @Override
            public void configure(HttpsParameters params) {
                try {
                    // initialise the SSL context
                    SSLContext c = getSSLContext();
                    SSLEngine engine = c.createSSLEngine();
                    params.setNeedClientAuth(false);
                    params.setCipherSuites(engine.getEnabledCipherSuites());
                    params.setProtocols(engine.getEnabledProtocols());

                    // Set the SSL parameters
                    SSLParameters sslParameters = c.getSupportedSSLParameters();
                    params.setSSLParameters(sslParameters);

                } catch (Exception ex) {
                    System.out.println("Failed to create HTTPS port");
                    System.out.println(ex.getMessage());
                }
            }
        });
        server.setExecutor(null);
        server.start();
    }

    public static void main(String[] args) throws IOException, NoSuchAlgorithmException, UnrecoverableKeyException, CertificateException, KeyStoreException, KeyManagementException {
        Registry registry = LocateRegistry.createRegistry(34545);
        ProxyI proxy = (ProxyI) UnicastRemoteObject.exportObject(new Proxy(), 0);
        registry.rebind("proxy", proxy);
    }

    @Override
    public void enregistrerService(String route, HttpHandler handler) throws RemoteException {
        try {
            server.removeContext(route);
        } catch (IllegalArgumentException ignored) {
        }
        server.createContext(route, handler);
    }

    @Override
    public void enregistrerService(String route, HttpHandlerProxy handler) throws RemoteException {
        enregistrerService(route, exchange -> {
            // autorise les requêtes CORS
            exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
            exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "content-type");

            HashMap<String, String> arguments = new HashMap<>();

            String query = exchange.getRequestURI().getQuery();
            if (query != null) {
                for (String raw_args : query.split(Pattern.quote("&"))) {
                    String[] key_value = raw_args.split(Pattern.quote("="));
                    if (key_value.length > 1) {
                        arguments.put(key_value[0], key_value[1]);
                    } else if (key_value.length == 1) {
                        arguments.put(key_value[0], "");
                    }
                }
            }

            String[] paths = exchange.getRequestURI().getPath().split(Pattern.quote("/"));
            List<String> pathsList = new ArrayList<>(List.of(paths));
            if (!pathsList.isEmpty())
                pathsList.remove(0);

            Response handle = handler.handle(exchange.getRequestMethod(), pathsList, arguments, exchange.getRequestBody().readAllBytes());

            exchange.getResponseHeaders().add("Content-Type", handle.getContentType());

            exchange.sendResponseHeaders(handle.getStatusCode(), handle.getBody().length);
            exchange.getResponseBody().write(handle.getBody());
            exchange.getResponseBody().close();
        });
    }

    @Override
    public void enregistrerServiceJSON(String route, HttpHandlerProxyJson handler) throws RemoteException {
        enregistrerService(route, exchange -> {
            exchange.getResponseHeaders().add("Content-Type", "application/json");

            // autorise les requêtes CORS
            exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
            exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "content-type");

            HashMap<String, String> arguments = new HashMap<>();

            String query = exchange.getRequestURI().getQuery();
            if (query != null) {
                for (String raw_args : query.split(Pattern.quote("&"))) {
                    String[] key_value = raw_args.split(Pattern.quote("="));
                    if (key_value.length > 1) {
                        arguments.put(key_value[0], key_value[1]);
                    } else if (key_value.length == 1) {
                        arguments.put(key_value[0], "");
                    }
                }
            }

            String[] paths = exchange.getRequestURI().getPath().split(Pattern.quote("/"));
            List<String> pathsList = new ArrayList<>(List.of(paths));
            if (!pathsList.isEmpty())
                pathsList.remove(0);

            String handle = handler.handle(exchange.getRequestMethod(), pathsList, arguments, exchange.getRequestBody().readAllBytes());

            byte[] sendData = handle.getBytes();

            exchange.sendResponseHeaders(200, sendData.length);
            exchange.getResponseBody().write(sendData);
            exchange.getResponseBody().close();
        });
    }
}
