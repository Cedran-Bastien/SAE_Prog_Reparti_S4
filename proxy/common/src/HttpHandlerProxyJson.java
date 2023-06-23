import java.rmi.Remote;
import java.rmi.RemoteException;
import java.util.List;
import java.util.Map;

public interface HttpHandlerProxyJson extends Remote {
    String handle(String method, List<String> paths, Map<String, String> arguments, byte[] body) throws RemoteException;
}
