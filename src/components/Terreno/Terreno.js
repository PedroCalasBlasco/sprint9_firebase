import { useParams} from "react-router-dom";
import axios from "axios";
import {useState, useEffect} from 'react';

import UserContext from "../../context/UserContext";
import NavBarMap from "../NavBarMap/NavBarMap";

import StyledTerreno from "./Terreno.styled";

import firebaseApp from "../../firebase/firebase";

import { getAuth, signOut} from "firebase/auth";

const auth = getAuth(firebaseApp);


const Terreno = () => {

    const { id } = useParams();
    const [terreno, setTerreno] = useState({});
    const [terrenoApi, setTerrenoApi] = useState({});
    const [construcciones, setConstrucciones] = useState([]);

    const [codigoTerreno, setCodigoTerreno] = useState("");

    const [value, setValue] = useState(auth.currentUser.email);

    useEffect(() => {
        axios.get(`https://www.hades.palomar.org.es/geoserver/cite/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=cite%3Aterrenosvista19&maxFeatures=50&outputFormat=application%2Fjson`).then(res =>{
            setTerreno(res.data.features[id]);
            setCodigoTerreno(res.data.features[id].properties.codigo);        
        });

    },[id])


    useEffect(() => {
        axios.get(`https://riberalta.mapearte.com/apiriberalta/terrenos19`).then(res =>{
            setTerrenoApi(res.data.features[id]);
            setCodigoTerreno(res.data.features[id].properties.codigo);        
        });

    },[id])



    useEffect(() => {
        axios.get(`https://www.hades.palomar.org.es/geoserver/cite/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=cite%3Aconstruccionesvista19&maxFeatures=50&outputFormat=application%2Fjson`).then(res =>{
            setConstrucciones(res.data.features);
            console.log(res.data.features);
        });
    },[])






    return(

    
        <UserContext.Provider value={{value, setValue}}>
        <StyledTerreno className="container-fluid">
            <NavBarMap/>
        
            <div className="container TerrenoCont mt-5 mb-5">
            {/* <div className="row ">
                
            </div>
            <div className="row">
                <div className="col col-12 text-center mt-5">
                    <img src="../../../public/assets/img/bg-mobile-fallback.jpg" alt="" />
                </div>
            </div> */}
            <div className="row white">
                <div className="col col-12 text-center mt-5 mb-4">
                    <h4>INFORMACIÓN DEL TERRENO</h4>
                </div>
                <div className="col col-12 col-xl-6 text-center">
                    <h6>Código Catastral:  {terreno && terreno.properties && terreno.properties.codigo}</h6>
                    <h6>Superficie:  {terreno && terreno.properties && terreno.properties.superficie} m2</h6>
                    <h6>Dirección:  {terreno && terreno.properties && terreno.properties.direccion}</h6>
                    <h6>Barrio:  {terreno && terreno.properties && terreno.properties.barrio}</h6>
                    <h6>Predio:  {terreno && terreno.properties && terreno.properties.predio}</h6>
                    <h6>SubPredio:  {terreno && terreno.properties && terreno.properties.subpredio}</h6>
                    <h6>Manzano:  {terreno && terreno.properties && terreno.properties.manzano}</h6>

                </div>
                <div className="col col-12 col-xl-6 text-center">
                    <h6>Titular: {terreno && terreno.properties && terreno.properties.nombre + " " + terreno.properties.apellidos}</h6>
                    <h6>DNI:  {terreno && terreno.properties && terreno.properties.documento}</h6>
                    <h6>Tipo de Propiedad:  {terreno && terreno.properties && terreno.properties.documentopropiedad}</h6>
                    <h6>Colindante Norte:  {terreno && terreno.properties && terreno.properties.norte}</h6>
                    <h6>Colindante Sur:  {terreno && terreno.properties && terreno.properties.sur}</h6>
                    <h6>Colindante Este:  {terreno && terreno.properties && terreno.properties.este}</h6>
                    <h6>Colindante Oeste:  {terreno && terreno.properties && terreno.properties.oeste}</h6>
                </div>
            </div>
            <div className="row">
                <div className="col col-12 text-center mt-5 mb-4">
                    <h4>CARACTERÍSTICAS DEL TERRENO</h4>
                </div>
                <div className="col col-12 col-xl-6 text-center">
                    <h6>Forma del Terreno:  {terreno && terreno.properties && terreno.properties.nombreforma}</h6>
                    <h6>Inclinación del Terreno:  {terreno && terreno.properties && terreno.properties.nombretopo}</h6>
                    <h6>Ubicación del Terreno:  {terreno && terreno.properties && terreno.properties.nombreubicacion}</h6>
                </div>
                <div className="col col-12 col-xl-6 text-center">
                    <h6>Distancia Frente:  {terreno && terreno.properties && terreno.properties.frente} m</h6>
                    <h6>Distancia Fondo:  {terreno && terreno.properties && terreno.properties.fondo} m</h6>
                    <h6>Tipo de Calle:  {terreno && terreno.properties && terreno.properties.tipovia}</h6>
                    <h6>Material de Calle:  {terreno && terreno.properties && terreno.properties.materialvia}</h6>
                </div>
            </div>
            <div className="row">
                <div className="col col-12 text-center mt-5 mb-4">
                    <h4>SERVICIOS DEL TERRENO</h4>
                </div>
                <div className="col col-12 col-xl-6 text-center">
                    <h6>Servicio Agua Potable:  {terreno && terreno.properties && (terreno.properties.agua ? "Sí" : "No")}</h6>
                    <h6>Energía Eléctrica:  {terreno && terreno.properties && (terreno.properties.energia ? "Sí" : "No")}</h6>
                    <h6>Acceso a Internet:  {terreno && terreno.properties && (terreno.properties.internet ? "Sí" : "No")}</h6>  
                </div>
                <div className="col col-12 col-xl-6 text-center">
                    <h6>Teléfono:  {terreno && terreno.properties && (terreno.properties.telefono ? "Sí" : "No")}</h6>
                    <h6>Transporte Público:  {terreno && terreno.properties && (terreno.properties.transporte ? "Sí" : "No")}</h6>
                    <h6>Alcantarillado:  {terreno && terreno.properties && (terreno.properties.alcantarillado ? "Sí" : "No")}</h6>
                </div>
            </div>
            {/* <div className="row">
                <div className="col col-12 text-center mt-5 mb-4">
                    <h4>CONSTRUCCIONES</h4>
                </div>
             </div> */}
            {/* <div className="row justify-content-around">   
                {
                    construcciones.map((item, index) => {
                        return( 
                            <div className="col col-2 text-center mr-1" key={index}>
                                {item.properties.codigo === codigoTerreno ? 
                                    <a href={`/construccion/${item.properties.cod}`}>
                                        <button className="btn btn-primary">Construcción {item.properties.cod}</button>
                                    </a>  : <></>
                                }
                            </div>
                        )    
                    })
                }
            </div> */}


            {/* ${item.properties.cod */}
        
            </div>

        </StyledTerreno>
        </UserContext.Provider>

      
    )
}

export default Terreno;