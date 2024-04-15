import CustomDataTable from '../../components/CustomDatatable'
import AxiosClient from '../../config/http-client/axios-client';
import { TextInput, Label, Button, Card, Tooltip } from 'flowbite-react'
import { useNavigate } from 'react-router-dom';
import React, { useMemo, useState, useEffect } from 'react'
import { BsFileEarmarkText } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";

const Patients = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);

    const handleSectionChange = (section) => {
        setSelectedSection(section);
    };

    const loadCurp = async (row) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1));
            const userData = localStorage.getItem('user');
            if (userData) {
                const user = JSON.parse(userData);
                console.log("CURP del usuario:", user.user.personBean.curp);
                await getCard(user.user.personBean.curp, row); // Esperar a que getCard se complete antes de continuar
            }
        } catch (error) {
            console.error('Error al encontrar la cedula:', error);
        }
    };

    const getCard = async (curpdata , data) => {
        try {
            console.log("CURP antes de hacer la solicitud:", curpdata);
            const response = await AxiosClient({
                url: `/doctor/findOneCard/${curpdata}`,
                method: 'GET',
            });
            if (!response.error) {
                pasardatos(response.data , data); // Actualizar el estado de card
              
            }
        } catch (error) {
            console.log(error);
        }
    };

    const pasardatos = (datocard,data) => {
        console.log(datocard);
          navigate('/formularioSeguimiento', { state: {datocard, data}});
    }
    
    const citas = (Noexp) => {
        navigate('/diagnosticos', { state: Noexp });
    }
    
    const estado = (estado) => {
        return estado ? 'Activo' : 'Inactivo'; // Simplificación del código
    }

    const columns = useMemo(() => [
        {
            name: '#',
            selector: (row, i) => i + 1,
            sortable: false,
        },
        {
            name: 'Nombre',
            cell: (row) => <>{`${row.userBean.personBean.name} ${row.userBean.personBean.middleName} ${row.userBean.personBean.lastName ?? ''} `}</>,
            sortable: false,
        },
        {
            name: 'Status',
            cell: (row) => <>{estado(row.userBean.status)}</>,
            sortable: false,
        },
        {
            name: 'Sexo',
            cell: (row) => <>{row.userBean.personBean.sex}</>,
            sortable: false,
        },
        {
            name: 'No. Expediente',
            cell: (row) => <>{row.medicalRecordBean ? row.medicalRecordBean.number : 'Sin asignar'}</>,
            sortable: false,
        },
        {
            name: '',
            cell: (row) => (
                <>
                    <button className='showSelection' style={{ background: '#ffff', width: '48px', outline: 'none', cursor: 'pointer' }} onClick={() => loadCurp(row)}>
                        <CiEdit style={{ cursor: 'pointer' }} size={24} color={'#000'} />
                    </button>
                    <button className='showSelection' style={{ background: '#ffff', width: '48px', outline: 'none', cursor: 'pointer' }} onClick={() => citas(row.medicalRecordBean.number)}>
                        <BsFileEarmarkText style={{ cursor: 'pointer' }} size={24} color={'#000'} />
                    </button>
                </>
            ),
            sortable: false,
        },
    ], []);

    const getUsers = async () => {
        try {
            const response = await AxiosClient({
                url: "/patient/findAll",
                method: 'GET',
            });
            console.log(response);
            if (!response.error) setUsers(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                await getUsers();
            } catch (error) {
                console.error('Error al cargar los datos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    

    return (
        <section className='w-full px-4 pt-4 flex flex-col gap-4'>
                <h1 className=' text-3xl  mt-3 mx-4'>Pacientes</h1>

            <div className='w-full flex justify-end p-5'>

            <div className='max-w-screen-md flex justify-between items-center'>
            <div className='max-w-64  mx-4'>
                    <Label htmlFor='' />
                    <TextInput type='text' id='filter' placeholder='Buscar...' />
                </div>
            </div>
            </div>

            <CustomDataTable
                columns={columns}
                data={users}
                isLoading={loading}
            />
        </section>
    );
}

export default Patients;
