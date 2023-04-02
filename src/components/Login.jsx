import React from 'react'
import { useState } from 'react';
import image from '../img/pexels-sigrid-abalos-824572.jpg';
import LoginForm from './LoginForm';

const Login = () => {
    const [register, setRegister] = useState(false);
    return (
        <div className='row container p-4 d-flex'>
            <div className="col-md-8">
                <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src={image} className="d-block w-100 tamaño-img" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src={image} className="d-block w-100 tamaño-img" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src={image} className="d-block w-100 tamaño-img" alt="..." />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>

            </div>
            {/* En esta sesión se hará el formulario */}
            <div className="col-md-4 ">
                <LoginForm setRegister={setRegister} register={register} />

            </div>
        </div>
    )
}

export default Login
