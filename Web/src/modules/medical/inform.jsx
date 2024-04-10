
import React, { useState, useEffect } from 'react';
import AxiosClient from '../../../config/http-client/axios-client';

const Inform = () => {
    const [treatments, setTreatments] = useState([]);

    useEffect(() => {
        const fetchTreatments = async () => {
            try {
                const response = await axios.get('treatment/findAll');
                setTreatments(response.data);
            } catch (error) {
                console.error('Error fetching treatments:', error);
            }
        };

        fetchTreatments();
    }, []);

    return (
        <div className="flex flex-col w-full justify-center items-center">
            <div className="w-96 h-auto border border-slate-500 flex flex-col">
                <h2 className="text-3xl font-bold text-blue-900 mb-4">Informe</h2>
                {treatments.map((treatment, index) => (
                    <div key={index}>
                        <p className="text-lg font-bold text-blue-900">Fecha de tratamiento: {treatment.treatDate}</p>
                        <p className="text-lg font-bold text-blue-900">Indicaciones: {treatment.indications}</p>
                        <p className="text-lg font-bold text-blue-900">Diagnóstico ID: {treatment.diagnosticBean.id}</p>
                        <p className="text-lg font-bold text-blue-900">Medicamentos:</p>
                        <ul>
                            {treatment.medicineBeanSet.map((medicine, index) => (
                                <li key={index}>
                                    <p>{medicine.name} - {medicine.manufacturer}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Inform;
