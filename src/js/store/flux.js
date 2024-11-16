import { useNavigate } from "react-router-dom";

const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            contacts: [],     // Lista de contactos
            isLogged: false,  // Estado de login
            username: null,   // Nombre de usuario del login
            error: "",        // Mensaje de error o estado
            showModal: false,    // Estado para manejar la visibilidad del modal
            editingContactId: null, // ID del contacto que se está editando
            currentContact: {    // Estado para el contacto actual
                name: "",
                phone: "",
                email: "",
                address: ""
            }
        },
        actions: {
            // Acción para actualizar el contacto actual
            setCurrentContact: (contactData) => {
                setStore({ currentContact: contactData });
            },

            // Acción para mostrar el modal
            setShowModal: (showModal) => {
                setStore({ showModal }); // Actualiza el valor de showModal en el store
            },

            // Acción para establecer el ID del contacto que se está editando
            setEditingContactId: (contactId) => {
                setStore({ editingContactId: contactId }); // Actualiza el valor del ID en el store
            },

            // Función para cerrar el modal
            closeModal: (modalId) => {
                setStore({ showModal: false, editingContactId: null, currentContact: { name: "", phone: "", email: "", address: "" } }); // Resetear estado
                const modalElement = document.getElementById(modalId);
                const modalInstance = bootstrap.Modal.getInstance(modalElement);
                if (modalInstance) {
                    modalInstance.hide(); // Cierra el modal
                }
            },

            // Función para abrir el modal en modo creación
            openCreateModal: () => {
                setStore({ showModal: true, editingContactId: null, currentContact: { name: "", phone: "", email: "", address: "" } });
            },

            // Función para abrir el modal en modo edición
            openEditModal: (contact) => {
                setStore({ showModal: true, editingContactId: contact.id, currentContact: contact }); // Establecer el contacto en el store
            },

            // Función para fijar el valor de username
            setUsername: (username) => {
                setStore({ username });
            },

            // Función para iniciar sesión
            login: async (username, navigate) => {
                try {
                    const response = await fetch(`https://playground.4geeks.com/contact/agendas/${username}`);
                    if (response.ok) {
                        setStore({ isLogged: true });
                        getActions().loadContacts(username); // Cargar los contactos 
                        getActions().closeModal('loginModal'); // Cierra el modal
                        navigate('/demo'); // Redirigir a demo
                        return true;  // Usuario encontrado
                    } else if (response.status === 404) {
                        // Si el usuario no se encuentra, mostrar un mensaje de confirmación
                        const userWantsToRegister = window.confirm(`El usuario "${username}" no existe. ¿Desea registrarlo?`);
                        if (userWantsToRegister) {
                            getActions().createUser(username); // Cargar los contactos para el nuevo usuario
                            getActions().closeModal('loginModal'); // Cierra el modal
                            navigate('/demo'); // Redirigir a demo
                        }
                        return false;  // Usuario no encontrado
                    }
                } catch (error) {
                    console.error("Error en la solicitud de login:", error);
                }
            },

            // Función para crear un nuevo usuario
            createUser: async (username) => {
                try {
                    const response = await fetch(`https://playground.4geeks.com/contact/agendas/${username}`, {
                        method: 'POST',
                        headers: { "accept": "application/json" }
                    });
                    if (response.ok) {
                        setStore({ isLogged: true, username: username });
                        getActions().loadContacts(username);  // Cargar los contactos para el nuevo usuario
                        getActions().closeModal('loginModal'); // Cierra el modal
                        return true;  // Usuario creado exitosamente
                    }
                } catch (error) {
                    console.error("Error en la solicitud de creación de usuario:", error);
                }
            },

            // Función para cerrar sesión
            logout: (navigate) => {
                setStore({ isLogged: false, username: null, contacts: [] });
                navigate('/'); // Redirige a la página de inicio después de cerrar sesión
            },


            // Función para cargar los contactos de un usuario
            loadContacts: async (username) => {
                try {
                    const response = await fetch(`https://playground.4geeks.com/contact/agendas/${username}/contacts`);
                    if (response.ok) {
                        const data = await response.json();
                        setStore({ contacts: data.contacts });
                    } else {
                        console.error("Error al cargar los contactos");
                    }
                } catch (error) {
                    console.error("Error en la solicitud de contactos:", error);
                }
            },

            // Función para crear un nuevo contacto
            createContact: async (username, newContact) => {
                try {
                    const response = await fetch(`https://playground.4geeks.com/contact/agendas/${username}/contacts`, {
                        method: 'POST',
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            name: newContact.name,
                            phone: newContact.phone || "",
                            email: newContact.email || "",
                            address: newContact.address || ""
                        })
                    });
                    if (response.ok) {
                        getActions().loadContacts(username);  // Recargar la lista de contactos
                        console.log("Contacto creado exitosamente");
                    } else {
                        console.error("Error al crear contacto");
                    }
                } catch (error) {
                    console.error("Error en la solicitud de crear contacto:", error);
                }
            },

            // Función para editar un contacto existente
            updateContact: async (username, contactId, updatedContact) => {
                try {
                    const response = await fetch(`https://playground.4geeks.com/contact/agendas/${username}/contacts/${contactId}`, {
                        method: 'PUT',
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            name: updatedContact.name,
                            phone: updatedContact.phone || "",
                            email: updatedContact.email || "",
                            address: updatedContact.address || ""
                        })
                    });
                    if (response.ok) {
                        getActions().loadContacts(username);  // Recargar la lista de contactos
                        console.log("Contacto actualizado exitosamente");
                    } else {
                        console.error("Error al actualizar el contacto");
                    }
                } catch (error) {
                    console.error("Error en la solicitud de actualización:", error);
                }
            },

            // Función para eliminar un contacto
            deleteContact: async (username, contactId) => {
                try {
                    const response = await fetch(`https://playground.4geeks.com/contact/agendas/${username}/contacts/${contactId}`, {
                        method: 'DELETE'
                    });
                    if (response.ok) {
                        getActions().loadContacts(username);  // Recargar la lista de contactos
                    } else {
                        console.error("Error al eliminar el contacto");
                    }
                } catch (error) {
                    console.error("Error en la solicitud de eliminación:", error);
                }
            }
        }
    };
};

export default getState;