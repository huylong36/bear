import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hook";
import { Router } from "../routes";


function PrivateRoute({ children } : any) {
    const isLogin = useAppSelector(store => store.userState.isLogin)    
    return isLogin ? <>{children}</> : <Navigate to={Router.Login} />;
}

export default PrivateRoute