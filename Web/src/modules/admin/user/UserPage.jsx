import CustomDataTable from '../../../components/CustomDatatable'
import AxiosClient from '../../../config/http-client/axios-client';
import { TextInput, Label, Button, Card, Tooltip } from 'flowbite-react'
import { Link, useNavigate } from 'react-router-dom';
import { deletePatient } from '../../../config/alerts/alert';
import React, { useMemo, useState, useEffect } from 'react'
import { BsFileEarmarkText } from "react-icons/bs";
import { LuPlus } from "react-icons/lu";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { LiaFileDownloadSolid } from "react-icons/lia";


const UserPage = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
  

    const pasardatos = (row) => {
        navigate('/editperson', { state: row });
    }
    const citas = (Noexp) => {

        navigate('/citas', { state: Noexp });
    }
    const estado = (estado) => {
        if (estado === true) {
            return ('Activo')
        } else { return ('Inactivo') }
    }

    const columns = useMemo(() => [
        {
            name: '#',
            selector: (row, i) => i+1,
            sortable: false,
        },
        {
            name: 'Nombre',
            cell: (row) => <>{`${row.userBean.personBean.name} ${row.userBean.personBean.middleName} ${row.userBean.personBean.lastname ?? ''} `}</>,

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
            name: 'No Expediente',
            cell: (row) => <>{row.medicalRecordBean ? row.medicalRecordBean.number : 'Sin asignar'}</>,
            sortable: false,
        },
        {
            name: '',
            cell: (row) => <><button style={{ background: '#ffff', width: '48px', outline: 'none', cursor: 'pointer' }} onClick={() => pasardatos(row)}>
                <CiEdit style={{ cursor: 'pointer' }} size={24} color={'#000'} />
            </button>
                <button style={{ background: '#ffff', width: '48px', outline: 'none', cursor: 'pointer' }} onClick={() => deleteUser(row.userBean.personBean.curp)} > <AiOutlineDelete style={{ cursor: 'pointer' }} size={24} color={'#000'} /></button>
                <button style={{ background: '#ffff', width: '48px', outline: 'none', cursor: 'pointer' }} onClick={() => citas(row.medicalRecordBean.number)} > <BsFileEarmarkText style={{ cursor: 'pointer' }} size={24} color={'#000'} /></button>


            </>,
            sortable: false,
        },


    ]);



    const download = async () => {
        try {
            const response = await AxiosClient({
                url: `/patient/exportation`,
                method: 'GET',
                responseType: 'arraybuffer', // Cambiar a arraybuffer para recibir la respuesta como un array de bytes
            });

            // Verificar si la respuesta es exitosa
            console.log(response);
            if (response) {
                // Crear una instancia de JSZip y cargar los datos del archivo ZIP
                const file = new Blob([response], { type: "application/vnd.ms-excel" })
                // Crear un objeto URL a partir del Blob
                const url = window.URL.createObjectURL(file);
                // Crear un enlace temporal para iniciar la descarga del archivo XLSX
                const link = document.createElement('a');
                link.href = url;
                link.download = "Pacientes.xlsx"; // Nombre del archivo XLSX
                document.body.appendChild(link);
                link.click();
                // Liberar recursos del objeto URL
                window.URL.revokeObjectURL(url);
            } else {
                // Manejar la respuesta en caso de que no sea exitosa
                console.error('Error al descargar el archivo');
            }
        } catch (error) {
            console.error('Error en la petición de descarga:', error);
        }
    };

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
    //useEffect se puede usar para que se ejecute una vez que toda nuestra pantalla se haya renderizado
    //Si no le mandamos nada al arreglo, solo se ejecutara una vez que todo se haya renderizado
    useEffect(() => {
        setLoading(true);

        getUsers();
    }, []); //Solo se ejecuta una vez al terminar de renderizar


    const deleteUser = async (curp) => {
        try {
            const result = await deletePatient(); 
            if (result.isConfirmed) {
                try {
                    const response = AxiosClient({
                        url: `/patient/delete/${curp}`,
                        method: 'DELETE',
                    });
                    console.log(response);
                    if (!response.error) getUsers();
                
                
                } catch (error) {
                    console.log(error);
                } finally {
                    setLoading(false);
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <section className='w-full px-4 pt-4 flex flex-col gap-4'>

            <h1 className='text-2xl'>Pacientes</h1>

            <div className='max-w-screen-md flex justify-between  items-center'>
                <div className='max-w-64'>
                    <Label htmlFor='' />
                    <TextInput type='text' id='filter' placeholder='Buscar...' />
                </div>
                <div>
                    <Button style={{ cursor: 'pointer' }} onClick={() => download()} color="success">
                        <LiaFileDownloadSolid style={{ cursor: 'pointer' }} size={25} />
                    </Button>
                </div>

            </div>



            <CustomDataTable
                columns={columns}
                data={users}
                isLoading={loading}
            />


            <div className='flex justify-end'>


                <Link to={'/registerperson'} > <Button style={{ background: '#03104A', borderRadius: '100%', width: '48px', outline: 'none' }} pill> <LuPlus size={24} /></Button> </Link>

            </div>
            <div style={{}} className=''>
            </div>



        </section>


    )
}

export default UserPage