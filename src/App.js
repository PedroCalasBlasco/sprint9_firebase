import {useState} from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";

import MyProvider from './components/Provider/Provider';


import Home from './components/Home/Home';

import Map from './components/Map/Map';
import Terreno from './components/Terreno/Terreno';



import firebaseApp from './firebase/firebase';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth(firebaseApp);



function App() {

  const [usuarioGlobal, setUsuarioGlobal] = useState(null);

 

  
  onAuthStateChanged(auth, (usuarioFirebase) => {
    if(usuarioFirebase){
      setUsuarioGlobal(usuarioFirebase);
    }else{
      setUsuarioGlobal(null);
    }


  });

  return (
          
          <BrowserRouter>
            <Routes>
                <Route path="/" element={usuarioGlobal ? <Map/> : <Home />}></Route>
                <Route path="/:id" element={usuarioGlobal ? <Terreno/> : <Home />}></Route>
              {/* <Route path="/:id" element={<PrivateRoute redirectTo={'/'}><Terreno/></PrivateRoute>}></Route> */}
            </Routes>
          </BrowserRouter>
       
  )
  
    
}
  
 


export default App;
