import { Navigate, useLocation } from "react-router-dom";


const PrivateRoute = ({ children, redirectTo}) => { 

    let as = useLocation();

    console.log(as);
            
    return as.pathname === '/id' ? children : <Navigate to={redirectTo} />;
   
}
export default PrivateRoute;