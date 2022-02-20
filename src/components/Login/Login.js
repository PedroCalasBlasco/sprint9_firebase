import { useState, useRef, useContext } from "react";

import { AppContext } from "../Provider/Provider";

import firebaseApp from "../../firebase/firebase";

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(firebaseApp);


const Login = () => {

        const [estaRegistrandose, setEstaRegistrandose] = useState(false);

        const emailRef = useRef();
        // const[state, setState] = useContext(AppContext);


        const psdRef = useRef();

        async function submitHandler(e) {
            e.preventDefault();

            console.log(auth);

            const email = emailRef.current.value;
            const password = psdRef.current.value;

            if(estaRegistrandose){
                await createUserWithEmailAndPassword(auth, email, password);
            }else{
                signInWithEmailAndPassword(auth, email, password);
            }

            
        }

        return (
            <div className="form mb-4 text-center" onSubmit={submitHandler}>
                <p className="mt-1">{ estaRegistrandose ? "Registrate" : "Inicia Sesión"}</p>
                <form >
                    <div className="input-group mb-3 px-5">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">@</span>
                        </div>
                        <input type="email" className="form-control" placeholder="Ingresa tu Email"  ref={emailRef}/>
                    </div>

                    {/*  onChange={ () =>{setState({name:emailRef.current.value})}} */}

                    <div className="input-group mb-3 mt-3 px-5">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">$</span>
                        </div>
                        <input type="password" className="form-control" placeholder="Ingresa Contraseña"  ref={psdRef} />
                    </div>

                    <button type="submit" className="btn btn-success">{ estaRegistrandose ? "Registrate" : "Inicia Sesión"}</button>
                </form>
                    <button  className="btn btn-secondary mt-4" onClick={() => setEstaRegistrandose(!estaRegistrandose)}>{estaRegistrandose ? "¿Ya tienes cuenta? Inicia Sesión" : "¿No tienes cuenta? Registrate"}</button>
            </div> 
        )

}

export default Login;