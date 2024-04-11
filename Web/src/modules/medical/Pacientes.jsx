import CustomDataTable from '../../components/CustomDatatable'
import AxiosClient from '../../config/http-client/axios-client';
import { TextInput, Label, Button, Card, Tooltip } from 'flowbite-react'
import { Link, useNavigate } from 'react-router-dom';
import { deletePatient } from '../../config/alerts/alert';
import React, { useMemo, useState, useEffect } from 'react';
import { IoSearchOutline } from "react-icons/io5";

const Patients = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [filterData, setFilterData] = useState([])
    const [query, setQuery] = useState('')

    const handleSearch = (event) =>{
        const getSearch = event.target.value

        if(getSearch.length > 0){
            const searchData = filterData.filter((item) => search(item, getSearch))

            setUsers(searchData)

            console.log(searchData)
        }else{
            setUsers(filterData)
        }
        setQuery(getSearch)
    }

    const search = (item, search) =>{
        const {name, middleName, lastName} = item.userBean.personBean
        const {number} = item.medicalRecordBean

        const fullName = `${name} ${middleName} ${lastName}`

        return  fullName.toLowerCase().includes(search.toLowerCase()) || number.includes(search)
    }

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
            name: 'No. Expediente',
            cell: (row) => <>{row.medicalRecordBean ? row.medicalRecordBean.number : 'Sin asignar'}</>,
            sortable: false,
        },
        {
            name: '',
            cell: (row) => <>
            <Link to={'/informe'} ><button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Ver más...</button></Link>
            </>,
            sortable: false,
        },


    ]);


    const getUsers = async () => {
        try {
            const response = await AxiosClient({
                url: "/patient/findAll",
                method: 'GET',

            });
            console.log(response);
            if (!response.error){
                setUsers(response.data);
                setFilterData(response.data)
            }
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
                    <TextInput  rightIcon={IoSearchOutline} value={query} onChange={(e) => handleSearch(e)} type='text' id='filter' placeholder='Buscar...'/>
                </div>
            </div>



            <CustomDataTable
                columns={columns}
                data={users}
                isLoading={loading}
            />



        </section>


    )
}

export default Patients;