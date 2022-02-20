import { useContext } from "react";

import NavBarMapStyled from "./NavBarMap.styled";

import firebaseApp from "../../firebase/firebase";

import { getAuth, signOut} from "firebase/auth";
import UserContext from "../../context/UserContext";

const auth = getAuth(firebaseApp);

const NavBarMap = ({isMap}) => {

    const user = { name: "Pedro"};

    const {value, setValue} = useContext(UserContext);

    return(
        <NavBarMapStyled className="container-fluid backColor">
            <div className="row justify-content-between">
                <div className="col col-3 pt-3 pb-3">
                    <h5 className='pt-1'>Bienvenido {value}</h5>
                </div>
                <div className="col col-3 pt-3 pb-3">
                    {isMap ? <button className="btn btn-secondary" onClick={() => signOut(auth)}>Cerrar Sesión</button> : <a href={`/`}><button className="btn btn-secondary">Volver al Mapa</button></a>}
                </div>
            </div>
        </NavBarMapStyled>
    );
}

export default NavBarMap;