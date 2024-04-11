import AxiosClient from '../../config/http-client/axios-client';
import { Button, Card, Modal } from 'flowbite-react';
import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";

const MedicalDate = () => {
    const location = useLocation();
    const datos = location.state || {};
    const [loading, setLoading] = useState(false);
    const [diagnostics, setDiagnostics] = useState([]);
    const [selectedDiagnostic, setSelectedDiagnostic] = useState(null);

    const getDiagnostics = async () => {
        try {
            const response = await AxiosClient({
                url: `/diagnostic/findbyNumber/${datos}`,
                method: 'GET',
            });
            if (!response.error) {
                const sortedDiagnostics = response.data.sort((a, b) => a.id - b.id);
                setDiagnostics(sortedDiagnostics);
            } else {
                setDiagnostics([]);
            }
        } catch (error) {
            console.log(error);
            setDiagnostics([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setLoading(true);
        getDiagnostics();
    }, []);

    const openModalWithDiagnostic = (diagnostic) => {
        setSelectedDiagnostic(diagnostic);
    };

    const closeModal = () => {
        setSelectedDiagnostic(null);
    };

    return (
        <>
            <section className='w-full px-4 pt-5 flex flex-col gap-4'>
                <h1 className='text-2xl mb-6'>Diagnósticos</h1>

                {diagnostics.length === 0 ? (
                    <div className="flex justify-center items-center text-center">
                        <Alert color="info" icon={HiInformationCircle} className='w-full '>
                            <span className="font-medium te">No hay diagnósticos disponibles</span>
                        </Alert>
                    </div>
                ) : (
                    <div className='flex flex-wrap justify-center gap-4 cursor-pointer'>
                        {diagnostics.map((diagnostic, index) => (
                            <Card key={index} className="w-xl p-2">
                                <h5 className="mb-2 text-3xl font-bold " style={{ color: '#03104A' }}>Diagnóstico {diagnostic.id}</h5>
                                <p className="tracking-wide text-gray-500 md:text-lg dark:text-gray-400">
                                    Fecha de inicio: &nbsp;{diagnostic.startDate}<br />
                                    Resultado: &nbsp;{diagnostic.result}<br />
                                    Enfermedad: &nbsp;{diagnostic.disease}
                                </p>
                                <div className="items-center justify-center space-y-4 sm:flex sm:space-x-4 sm:space-y-0">
                                    <Button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 h-11 mt-2 mb-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' color="dark" onClick={() => openModalWithDiagnostic(diagnostic)}>Más </Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}

                {selectedDiagnostic && (
                    <Modal show={true} onClose={closeModal} size="xl">
                        <Modal.Header><p className="text-2xl font-semibold" style={{ color: '#03104A' }}>Detalles del diagnóstico</p></Modal.Header>
                        <Modal.Body style={{ overflowY: 'auto' }}>

                           <p className="tracking-normal text-gray-500 md:text-lg dark:text-gray-400">Fecha de inicio: &nbsp;{selectedDiagnostic.startDate}</p>
                            <p className="tracking-normal text-gray-500 md:text-lg dark:text-gray-400">Resultado: &nbsp;{selectedDiagnostic.result}</p>
                            <p className="tracking-normal text-gray-500 md:text-lg dark:text-gray-400">Enfermedad: &nbsp;{selectedDiagnostic.disease}</p>

                            <h1 className="tracking-normal text-gray-500 md:text-lg dark:text-gray-400"> <strong>Tratamiento: </strong> </h1>

                            {selectedDiagnostic.treatmentBean && selectedDiagnostic.treatmentBean.map((treatment, index) => (
                                <div key={index} className='ml-2'>
                                    <p className="tracking-normal text-gray-500 md:text-lg dark:text-gray-400">Fecha de tratamiento:&nbsp; {treatment.treatDate}</p>
                                    <p className="tracking-normal text-gray-500 md:text-lg dark:text-gray-400">Indicaciones:&nbsp; {treatment.indications}</p>
                                    {/* Puedes agregar más información sobre los tratamientos aquí según tus necesidades */}
                                </div>
                            ))}
                            <h1 className="tracking-normal text-gray-500 md:text-lg dark:text-gray-400"> <strong>Resultados del laboratorio: </strong> </h1>
                            {selectedDiagnostic.resultBeans && selectedDiagnostic.resultBeans.map((resultBean, index) => (
                                <div key={index}  className='ml-2'>
                                    <p className="tracking-normal text-gray-500 md:text-lg dark:text-gray-400">Fecha de resultado:&nbsp; {resultBean.resultDate}</p>
                                    <p className="tracking-normal text-gray-500 md:text-lg dark:text-gray-400">Retroviral:&nbsp; {resultBean.labDataBean.viralLoad}</p>
                                    <p className="tracking-normal text-gray-500 md:text-lg dark:text-gray-400">ALT:&nbsp; {resultBean.labDataBean.alt}</p>
                                    <p className="tracking-normal text-gray-500 md:text-lg dark:text-gray-400">Antigenos:&nbsp; {resultBean.labDataBean.antigen}</p>
                                    <p className="tracking-normal text-gray-500 md:text-lg dark:text-gray-400">AST:&nbsp; {resultBean.labDataBean.ast}</p>
                                    <p className="tracking-normal text-gray-500 md:text-lg dark:text-gray-400">Creatinina:&nbsp; {resultBean.labDataBean.creatinine}</p>
                                    <p className="tracking-normal text-gray-500 md:text-lg dark:text-gray-400">Plaquetas:&nbsp; {resultBean.labDataBean.platelets}</p>
                                    <hr className='mt-4 mb-5' style={{ backgroundColor: '#03104A' }}></hr>
                                </div>
                            ))}
                        </Modal.Body>
                    </Modal>
                )}
            </section>
        </>
    )
}

export default MedicalDate;

