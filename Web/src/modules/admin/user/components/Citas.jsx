import AxiosClient from '../../../../config/http-client/axios-client';
import { Button, Card, Modal } from 'flowbite-react';
import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";

const Citas = () => {
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
                            <Card key={index} className="max-w-sm" onClick={() => openModalWithDiagnostic(diagnostic)}>
                                <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Diagnóstico {diagnostic.id}</h5>
                                <p className="mb-5 text-base text-gray-500 dark:text-gray-400 sm:text-lg">
                                    Fecha de inicio: {diagnostic.startDate}<br />
                                    Resultado: {diagnostic.result}<br />
                                    Enfermedad: {diagnostic.disease}
                                </p>
                                <div className="items-center justify-center space-y-4 sm:flex sm:space-x-4 sm:space-y-0">
                                    <Button className='w-full h-7 text-xl' color="dark" onClick={() => pasardatos(diagnostic)}>Mas </Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}

                {selectedDiagnostic && (
                    <Modal show={true} onClose={closeModal} size="xl">
                        <Modal.Header className=' text-center'> <b>Detalles del diagnóstico</b></Modal.Header>

                        <Modal.Body style={{ overflowY: 'auto' }}>
                            <div className='flex justify-between'>Fecha de inicio: <b > {selectedDiagnostic.startDate}</b> </div>
                            <p>Resultado:{selectedDiagnostic.result}</p>
                            <p>Enfermedad: {selectedDiagnostic.disease}</p>
                            <h1> <strong>Tratamiento: </strong> </h1>

                            {selectedDiagnostic.treatmentBeans && selectedDiagnostic.treatmentBeans.map((treatment, index) => (
                                <div key={index}>
                                    <div className='flex justify-between'> Fecha de tratamiento: <b className='flex justify-end'>   {treatment.treatDate}</b> </div>
                                    <p>Indicaciones: {treatment.indications}</p>
                                    {/* Puedes agregar más información sobre los tratamientos aquí según tus necesidades */}
                                </div>
                            ))}
                            <h1> <strong>Resultados del laboratorio: </strong> </h1>
                            {selectedDiagnostic.resultBeans && selectedDiagnostic.resultBeans.map((resultBean, index) => (
                                <div key={index}>
                                    <div className='flex justify-between'> Fecha de resultado: <b className='flex justify-end'> {resultBean.resultDate}</b></div>
                                    <p>Retroviral:{resultBean.labDataBean.viralLoad}</p>
                                    <p>ALT:{resultBean.labDataBean.alt}</p>
                                    <p>Antigenos:{resultBean.labDataBean.antigen}</p>
                                    <p>AST:{resultBean.labDataBean.ast}</p>
                                    <p>Creatinina:{resultBean.labDataBean.creatinine}</p>
                                    <p>Plaquetas:{resultBean.labDataBean.platelets}</p>
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

export default Citas;

