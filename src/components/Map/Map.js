import {useState, useEffect} from 'react';

import UserContext from '../../context/UserContext';

import {MapContainer, TileLayer, GeoJSON, Popup} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from "axios";
import hash from 'object-hash';

import StyledMap from './Map.styled';

import NavBarMap from '../NavBarMap/NavBarMap';

import firebaseApp from "../../firebase/firebase";

import { getAuth, signOut} from "firebase/auth";

const auth = getAuth(firebaseApp);





const Map = () => {

    const[isMap, setIsMap] = useState(true);

    const [value, setValue] = useState(auth.currentUser.email);

    const [listTerrenos, setListTerrenos] = useState([]);
    const [listTerrenosApi, setListTerrenosApi] = useState([]);

    const [listConstrucciones, setListConstrucciones] = useState([]);

    
   
    const [featuresArray, setFeaturesArray] = useState([]);
    const [featuresParse, setFeaturesParse] = useState({});

    useEffect(() => {
        axios.get(`https://riberalta.mapearte.com/apiriberalta/terrenos19`).then(res =>{
            console.log(res.data);
            setListTerrenosApi(res.data);           
        });
        
        console.log(auth.currentUser.email);
    },[]);


    useEffect(() => {
        axios.get(`https://www.hades.palomar.org.es/geoserver/cite/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=cite%3Aterrenosvista19&maxFeatures=50&outputFormat=application%2Fjson`).then(res =>{
            console.log(res.data.features);
            setListTerrenos(res.data.features);
            // setListNaus((prevNaus) => prevNaus.concat(res.data.results));
        });
        
    },[]);

    useEffect(() => {
        axios.get(`https://www.hades.palomar.org.es/geoserver/cite/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=cite%3Aconstruccionesvista19&maxFeatures=50&outputFormat=application%2Fjson`).then(res =>{
            console.log(res.data.features);
            setListConstrucciones(res.data.features);
            // setListNaus((prevNaus) => prevNaus.concat(res.data.results));
        });
        
    },[]);


    const styleTerreno = () => {
        return {
            color: 'blue',
            fillColor: 'green',  
            weight: 1,
            fillOpacity: 0.3
        };
    };


    const styleConstruccion = () => {
        return {
            color: 'black',
            fillColor: 'red',  
            weight: 1,
            fillOpacity: 0.8,
        }; 
    };


    return (
        <UserContext.Provider value={{value, setValue}}>
        <StyledMap>

            <NavBarMap isMap={isMap}/>
            <MapContainer center={{lat: '-11.0045', lng: '-66.0636'}} zoom={16} className='mapCont'>
                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            
                {
                    listTerrenos.map((item,index) => {
                        return (
                        <GeoJSON data={listTerrenos[index]} style={styleTerreno} key={hash(listTerrenos) + index} eventHandlers={{click:(e) => {
                        console.log(hash(listTerrenos)) }}}>
                            <Popup>
                                <h5>{"Código Catastral: " + listTerrenos[index].properties.codigo}</h5>
                                <a href={`/${index}`}>Ver Más</a> 
                            </Popup> 
                        </GeoJSON>
                        )
                    }) 
                }

                {
                    listConstrucciones.map((item,index) => {
                        return (
                            <GeoJSON data={listConstrucciones[index]} style={styleConstruccion} key={hash(listConstrucciones) + index} eventHandlers={{click:(e) => { console.log(hash(listConstrucciones)) }}}>
                            </GeoJSON>
                        )
                    }) 
                }
            </MapContainer> 
        </StyledMap>
        </UserContext.Provider>

    );
        
}

export default Map;