import React, { useContext } from "react";
import './top.css'

//Importar Imagenes
import video from '../../assets/LoginAssets/video.mp4'


const Top = () => {

    return (
        <div className="topSection">
            <div className="headerSection flex">
                <div className="title">
                    <h1>Bienvenido a Order Easy</h1>
                </div>
            </div>

            <div className="cardSection flex">

                <div className="rightCard flex">
                    <h1>Gestiona y potencia tu negocio con los mejores productos tecnológicos. </h1>
                    <p>¡El sistema de inventario más ágil y avanzado para tecnología!</p>

                    <div className="videoDiv">
                        <video src={video} autoPlay loop muted></video>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default Top