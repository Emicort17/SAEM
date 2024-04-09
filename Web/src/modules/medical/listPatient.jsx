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


const listPatient = () => {

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

    ]);

ç
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


    
    return (
        <section className='w-full px-4 pt-4 flex flex-col gap-4'>

            <h1 className='text-2xl'>Pacientes</h1>

            <div className='max-w-screen-md flex justify-between  items-center'>
                <div className='max-w-64'>
                    <Label htmlFor='' />
                    <TextInput type='text' id='filter' placeholder='Buscar...' />
                </div>
            </div>


            <CustomDataTable
                columns={columns}
                data={users}
                isLoading={loading}
            />


            <div style={{}} className=''>
            </div>



        </section>
    )
}

export default listPatient;