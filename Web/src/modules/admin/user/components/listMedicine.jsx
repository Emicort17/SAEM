import AxiosClient from '../../../../config/http-client/axios-client';
import { Button, Card, Modal } from 'flowbite-react';
import React, { useState, useEffect } from 'react';
import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";
import { CiEdit } from "react-icons/ci";
import { useLocation, useNavigate } from 'react-router-dom';
import { FaPlus } from "react-icons/fa6";

const ListMedicina = () => { // Cambio de listMedicine a ListMedicina
    const location = useLocation();
    const datos = location.state || {};
    const [loading, setLoading] = useState(false);
    const [medicines, setMedicines] = useState([]);
    const navigate = useNavigate();

    const getMedicine = async () => {
        try {
            const response = await AxiosClient({
                url: '/medicine/findAll',
                method: 'GET',
            });
            if (!response.error) {
                setMedicines(response.data); // Cambio aquí para asignar response.data
            } else {
                setMedicines([]);
            }
        } catch (error) {
            console.log(error);
            setMedicines([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setLoading(true);
        getMedicine();
    }, []);


    const gomedicine = () => {
        navigate('/medicine');
}

    const pasardatos = (data) => {
             navigate('/editmedicina', { state: data });
    }

    return (
        <>
            <section className='w-full px-4 pt-5 flex flex-col gap-4'>
                <h1 className='text-2xl mb-6'>Medicinas</h1>

                {medicines.length === 0 ? (

                    <div className="flex flex-col w-full ">
                        <Alert color="info" icon={HiInformationCircle} className='w-full '>
                            <span className="font-medium te">No hay Medicinas disponibles</span>


                        </Alert>
                        <div className='w-full flex justify-center items-center'>
                        <div className='w-1/3  flex flex-row justify-center items-center mt-5 p-3 ' style={{borderRadius:'100px', backgroundColor:'#0F2AA3', color:'#fff' }} onClick={() => { gomedicine() }} > <button> <FaPlus/>  </button>  </div> 

                        </div>

                    </div>



                ) : (
                    <>
                           <div className='flex flex-wrap justify-center gap-4 '>
                        {medicines.map((medicine, index) => ( // Cambio aquí: medicine en lugar de medicines
                            <Card key={index} className="max-w-sm border border-gray-200 rounded-md shadow-md overflow-hidden hover:shadow-lg transition duration-300 ease-in-out" >
                                <div className="p-4">
                                    <h5 className="mb-2 text-xl font-semibold  text-blue-900   dark:text-white text-center"> {medicine.name}</h5> {/* Cambio aquí: medicine.id en lugar de medicines.data.id */}
                                    <p className="mb-2 text-base text-gray-600 dark:text-gray-400">
                                        <span className="font-semibold">Nombre:</span> {medicine.name}<br /> {/* Cambio aquí: medicine.name en lugar de medicines.data.name */}
                                        <span className="font-semibold">Presentacion:</span> {medicine.presentation}<br /> {/* Cambio aquí: medicine.presentation en lugar de medicines.data.presentation */}
                                        <span className="font-semibold">Fabricante:</span> {medicine.manufacturer} {/* Cambio aquí: medicine.manufacturer en lugar de medicines.data.manufacturer */}
                                    </p>
                                    <button className='w-full flex items-center justify-center mt-5 cursor-pointer' style={{ backgroundColor: '#061F8E', color: '#fff', borderRadius: '10px' }} onClick={() => { pasardatos(medicine) }}  > <CiEdit size={30} /> </button>
                                </div>
                            </Card>
                        ))}


                    </div>
                    <div className='w-full flex justify-center items-center'>
                    <div className='max-w-sm  flex  justify-center items-center mt-5 p-3 ' style={{borderRadius:'100px', backgroundColor:'#0F2AA3', color:'#fff' }} onClick={() => { gomedicine() }} > <button> <FaPlus/>  </button>  </div> 

                    </div>



                    </>
             

                    
                )}
            </section>
        </>
    )
}

export default ListMedicina;
