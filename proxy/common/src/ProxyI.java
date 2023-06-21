import com.sun.net.httpserver.HttpHandler;

import java.rmi.Remote;
import java.rmi.RemoteException;

public interface ProxyI extends Remote {

    @Deprecated
    void enregistrerService(String route, HttpHandler handler) throws RemoteException;

    void enregistrerService(String route, HttpHandlerProxy handler) throws RemoteException;

    void enregistrerServiceJSON(String route, HttpHandlerProxyJson handler) throws RemoteException;
}
