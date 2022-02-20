import Login from "../Login/Login";

import HomeStyled from "./Home.styled";


const Home = () => {

    
    return (

        <HomeStyled clasName="container-fluid">
            {/* <video className="bg-video" playsInline="playsinline" autoPlay="autoplay" muted="muted" loop="loop"><source src="../../../public/assets/mp4/bg.mp4" type="video/mp4" /></video> */}
            <div className="row">
                <div className="masthead col col-12 pt-5 text-white contPrincipal ">               
                    <h1 className="fst-italic  mb-5 mt-5 text-center">Catastro Riberalta</h1>
                    <h3 className="mb-5 mt-5 text-center">Bienvenido al Visor Técnico del Colegio de Topógrafos de Riberalta</h3>
                    <div className="row justify-content-center">
                        <div className="col col-8 col-md-6 col-xl-4 mt-3">
                            <Login/>  
                        </div>
                    </div>                   
                </div>
            </div>            
        </HomeStyled>
    )
}

export default Home;