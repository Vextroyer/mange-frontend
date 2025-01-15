'use client';
import React, { useState, useEffect } from 'react';
import { FaBell, FaTimes, FaTrash } from 'react-icons/fa';
import axios from 'axios';

const Home = () => {
    interface notif {
        id: number;
        text: string;
    }
    const [notifications, setNotifications] = useState([]);
    const [selectedNotification, setSelectedNotification] = useState(null);
    const [receiveNotifications, setReceiveNotifications] = useState(true);

    useEffect(() => {
        if (receiveNotifications) {
            // Simulación de petición al backend para obtener notificaciones
            axios.get('/api/notifications')
                .then(response => setNotifications(response.data))
                .catch(error => { });
            // console.error('Error al obtener notificaciones:', error));
        }
    }, [receiveNotifications]);

    const handleNotificationClick = (notification: notif) => {
        setSelectedNotification(notification);
    };

    const handleDeleteNotification = (id: number) => {
        setNotifications(notifications.filter(notification => notification.id !== id));
    };

    return (
        <div className="flex h-screen flex-col lg:flex-row">
            {/* Barra lateral */}
            <div className="group relative lg:w-16 lg:hover:w-64 bg-gray-800 text-white transition-all duration-300">
                <div className="p-4 border-b border-gray-700">
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={receiveNotifications}
                            onChange={() => setReceiveNotifications(!receiveNotifications)}
                            className="toggle-checkbox"
                        />
                        <span className="hidden group-hover:inline">Recibir Notificaciones</span>
                    </label>
                </div>
                <div className="p-4 overflow-y-auto ">
                    <h3 className="hidden group-hover:block text-lg font-semibold mb-2">Notificaciones</h3>
                    <ul>
                        {notifications.map((notification: notif) => (
                            <li
                                key={notification.id}
                                className="mb-2 flex items-center justify-between cursor-pointer hover:bg-gray-700 p-2 rounded"
                            >
                                <span onClick={() => handleNotificationClick(notification)}>🔔 {notification.text}</span>
                                <button onClick={() => handleDeleteNotification(notification.id)}>
                                    <FaTrash className="text-red-500 hover:text-red-700" />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Contenido principal */}
            <div className="flex-1 flex flex-col">
                {/* Parte superior */}
                <div className="flex items-center justify-center h-5/6 bg-gray-300">
                    <div className="text-center p-12">
                        <h1 className="text-4xl font-bold mb-4">¡Bienvenido!</h1>
                        <p className="text-lg text-gray-700">Aquí puedes gestionar las consultas, sucursales, usuarios y cerrar sesión.</p>
                    </div>
                </div>

                {/* Parte inferior */}
                <div className="flex justify-around items-center h-1/2 bg-white">
                    {[{ name: 'consult', detail: "Consults" },
                    { name: 'users', detail: "Users info" },
                    { name: 'branches', detail: "Manage Branches" },
                    { name: 'exit', detail: "log out" }].map((item, index) => (
                        <button key={index} className="w-24 h-24 bg-transparent text-transparent hover:text-black transform transition-all duration-200 hover:scale-125">
                            <img
                                src={`/images/${item.name}.png`}
                                alt={item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                                className="w-full h-full object-contain"
                            />
                            {item.detail}
                        </button>

                    ))}
                </div>
            </div>

            {/* Modal de Notificación */}
            {selectedNotification && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                        <button
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                            onClick={() => setSelectedNotification(null)}
                        >
                            <FaTimes />
                        </button>
                        <h2 className="text-xl font-semibold mb-4">Notificación</h2>
                        <p>{selectedNotification.text}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
