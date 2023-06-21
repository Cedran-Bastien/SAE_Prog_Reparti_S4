import java.rmi.Remote;
import java.rmi.RemoteException;
import java.util.List;
import java.util.Map;

public interface HttpHandlerProxy extends Remote {
    Response handle(String method, List<String> paths, Map<String, String> arguments, byte[] body) throws RemoteException;
}
