import { TextInput, Label, Button, Card } from 'flowbite-react'
import React, { useMemo, useState, useEffect } from 'react'
import CustomDataTable from '../../../components/CustomDatatable'
import AxiosClient from '../../../config/http-client/axios-client';
import { IoIosAdd } from "react-icons/io";
import RegisterUserForm from './components/RegisterUserForm';

const UserPage = () => {

    const [loading, setLoading] = useState(false);
    const [filterText, setFilterText] = useState('');
    const [users, setUsers] = useState([]);
    const [isCreating, setIsCreating] = useState(false);

    const columns = useMemo(() => [
        {
            name: '#',
            cell: (row, i) => <>{i + 1}</>,
            selector: (row, i) => i,
            sortable: true,
        },
        {
            name: 'Usuario',
            cell: (row) => <>{row.username}</>,
            selector: (row) => row.username,
            sortable: true,
        },
        {
            name: 'Nombre completo',
            cell: (row) => <>{`${row.person.name} ${row.person.surname} ${row.person.lastname ?? ''} `}</>,
            selector: (row) => `${row.person.name} ${row.person.surname} ${row.person.lastname ?? ''} `,
            //Selector es la guia del sortable, sortable se usa para ordenar
            sortable: true,
        },
        {
            name: 'Acciones',
            cell: (row) => (
                <>
                    <Button>Editar</Button>
                    <Button>Cambiar estado</Button>
                </>
            ),
        },
    ])
    //useMemo guarda como un cache para no renderizar varias veces

    const getUsers = async () => {
        try {
            const response = await AxiosClient({ url: "/user/", method: 'GET' });
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
            <h1 className='text-2xl'>Usuarios</h1>
            <div className='flex justify-between'>
                <div className='max-w-64'>
                    <Label htmlFor='' />
                    <TextInput type='text' id='filter' placeholder='Buscar...' />
                </div>
                <Button outline color='success' onClick={()=> setIsCreating(true)} pill><IoIosAdd size={24}/></Button>
                <RegisterUserForm isCreating={isCreating} setIsCreating={setIsCreating}/>
            </div>
            <Card>
                <CustomDataTable
                    columns={columns}
                    data={users}
                    isLoading={loading}
                />
            </Card>
        </section>
    )
}

export default UserPage