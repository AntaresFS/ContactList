import React from "react";
import "../../styles/home.css";  // Asegúrate de que home.css esté vinculado

export const Home = () => (
	<>
		<div className="container text-center mt-5 retro-style">
			<h1 className="display-1 fw-bold">Bienvenido a Agenda Virtual</h1>
			<p className="lead">
				Organiza tus contactos fácilmente con nuestra App.
			</p>
			<p>
				<strong>Inicia sesión para gestionar tus contactos.</strong>
			</p>
			<button className="btn retro-navbar-btn fw-bold" data-bs-toggle="modal" data-bs-target="#loginModal">
				Iniciar sesión
			</button>
		</div>
		<footer>
			<p>&copy; 2024 Agenda Virtual. Todos los derechos reservados.</p>
		</footer>
	</>
);


