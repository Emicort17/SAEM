import CustomDataTable from '../../components/CustomDatatable'
import AxiosClient from '../../config/http-client/axios-client';
import { Label, Button, Card, Tooltip, TextInput } from 'flowbite-react'
import { Link,useNavigate } from 'react-router-dom';
import { IoSearchOutline } from "react-icons/io5";


import React, {useMemo, useState, useEffect } from 'react'

import { LuPlus } from "react-icons/lu";
import { CiEdit } from "react-icons/ci";

const Medicos = () => {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const navigate= useNavigate();
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
            name: 'Cédula profesional',
            cell: (row) => <>{asignation(row.card)}</>,
            sortable: false,
        },
        {
            name: '',
            cell: (row) => <> 
                <button  className='showSelection' style={{ background: '#ffff', width: '48px', outline: 'none', cursor: 'pointer' }} onClick={() =>  pasardatos(row) }>
                    <CiEdit style={{ cursor: 'pointer' }} size={24} color={'#000'} />
                </button>
                     </>,
            sortable: false,
        },

    ]);




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
   
    useEffect(() => {
        setLoading(true);
        getUsers();
    }, []);



    return (
        <section className='w-full px-4 pt-4 flex flex-col gap-4'>

              <div className='w-full flex justify-end px-3 pt-6'>
           <div className='w-full'>
           <h1 className=' text-3xl  mt-3 mx-4'>Médicos</h1>

           </div>

                <div className='max-w-screen-md flex flex-row justify-between  items-center'>
                    
                    <div className='max-w-64  mx-4'>
                        <TextInput rightIcon={IoSearchOutline} value={query} onChange={(e) => handleSearch(e)} type='text' id='filter' placeholder='Buscar...' />
                    </div>
               

                </div>
            </div>


            <CustomDataTable
                columns={columns}
                data={users}
                isLoading={loading}
            />


<div className='flex justify-end px-5'>

                <Link to={'/registermedico'}> <Button  className='showSelection' style={{ background: '#03104A', borderRadius: '100%', width: '48px', outline: 'none' }} pill> <LuPlus size={24} /></Button></Link>

            </div>
            <div style={{}} className=''>
            </div>



        </section>


    );
};

export default Medicos;
