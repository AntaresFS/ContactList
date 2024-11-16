import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Single = () => {
	const { store } = useContext(Context);
	const { theid } = useParams();
	const contact = store.contacts[theid];

	return (
		<div className="container text-center mt-5 retro-style">
			<h1 className="display-4">Detalles del Contacto</h1>
			<ul className="list-group">
				<li className="list-group-item"><strong>Nombre:</strong> {contact.name}</li>
				<li className="list-group-item"><strong>Teléfono:</strong> {contact.phone || "No proporcionado"}</li>
				<li className="list-group-item"><strong>Email:</strong> {contact.email || "No proporcionado"}</li>
				<li className="list-group-item"><strong>Dirección:</strong> {contact.address || "No proporcionado"}</li>
			</ul>
			<Link to="/demo">
				<button className="btn btn-primary mt-4">Volver a contactos</button>
			</Link>
		</div>
	);
};

