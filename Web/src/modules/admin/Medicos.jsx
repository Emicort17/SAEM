import CustomDataTable from '../../components/CustomDatatable'
import AxiosClient from '../../config/http-client/axios-client';
import { Label, Button, Card, Tooltip, TextInput } from 'flowbite-react'
import { Link,useNavigate } from 'react-router-dom';
import { deletePatient } from '../../config/alerts/alert';
import { IoSearchOutline } from "react-icons/io5";


import React, {useMemo, useState, useEffect } from 'react'

import { LuPlus } from "react-icons/lu";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";

const Medicos = () => {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const navigate= useNavigate();
    const [filterData, setFilterData] = useState([])
    const [query, setQuery] = useState('')


    const [editingUser, setEditingUser] = useState(null);
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
        const {card} = item

        const fullName = `${name} ${middleName} ${lastName}`

        return  fullName.toLowerCase().includes(search.toLowerCase()) || card.includes(search)
    }

    const estado = (estado) => {
        if (estado === true) {
            return('Activo')

        } else {return('Inactivo')}
    };

    const asignation = (medical) => {
        if (medical === null) {
            return ('Sin asignar')

        } else {return(medical)}
    };


    const pasardatos=(row)=> {

        navigate('/editmedico',{state:row});

    } 

    const columns = useMemo(() => [
        {
            name: '#',
            selector: (row, i) => i+1,
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
            name: 'Cedula',
            cell: (row) => <>{asignation(row.card)}</>,
            sortable: false,
        },
        {
            name: '',
            cell: (row) => <> 
                <button  className='showSelection' style={{ background: '#ffff', width: '48px', outline: 'none', cursor: 'pointer' }} onClick={() =>  pasardatos(row) }>
                    <CiEdit style={{ cursor: 'pointer' }} size={24} color={'#000'} />
                </button>
         

                <button  className='showSelection' style={{ background: '#ffff', width: '48px', outline: 'none', cursor: 'pointer' }} onClick={() => deleteUser(row.card)} > <AiOutlineDelete style={{ cursor: 'pointer' }} size={24} color={'#000'} /></button>
            </>,
            sortable: false,
        },

    ]);

    const deleteUser = async (card) => {
        try {
            const result = await deletePatient(); // Mostrar la alerta
            if (result.isConfirmed) { // Si el usuario confirmó la acción
                try {
                    const response = AxiosClient({
                        url: `/doctor/delete/${card}`,
                        method: 'DELETE',
                    });
                    console.log(response);

                    if (!response.error) 
                    await getUsers()

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


    const getUsers = async () => {
        try {
            const response = await AxiosClient({
                url: "/doctor/findAll",
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
            <h1 className='text-2xl'>Médicos</h1>

            <div className='flex justify-between'>
                <div className='max-w-64'>
                    <TextInput  rightIcon={IoSearchOutline} value={query} onChange={(e) => handleSearch(e)} type='text' id='filter' placeholder='Buscar...'/>
                </div>
            </div>

            <CustomDataTable
                columns={columns}
                data={users}
                isLoading={loading}
            />


            <div className='flex justify-end'>

                <Link to={'/registermedico'}> <Button  className='showSelection' style={{ background: '#03104A', borderRadius: '100%', width: '48px', outline: 'none' }} pill> <LuPlus size={24} /></Button></Link>

            </div>
            <div style={{}} className=''>
            </div>



        </section>


    );
};

export default Medicos;
