import React, { useEffect, useMemo, useState } from 'react';
import { Label, TextInput, Button, Card } from 'flowbite-react';
import CustomDatatable from '../../../components/CustomDatatable';
import AxiosClient from '../../../config/http-client/axios-client';

const UserPage = () => {
  const [loading, setLoading] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [users, setUsers] = useState([]);
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
      cell: (row) => (
        <>{`${row.person.name} ${row.person.surname} ${
          row.person.lastname ?? ''
        }`}</>
      ),
      selector: (row) =>
        `${row.person.name} ${row.person.surname} ${row.person.lastname ?? ''}`,
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
  ]);
  const getUsers = async () => {
    try {
      const response = await AxiosClient({
        url: '/user/',
        method: 'GET',
      });
      console.log(response);
      if (!response.error) setUsers(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    getUsers();
  }, []); // Solo se ejecuta una vez al terminar de renderizar

  return (
    <section className="w-full px-4 pt-4 flex flex-col gap-4">
      <h1 className="text-2xl">Usuarios</h1>
      <div className="flex justify-between">
        <div className="max-w-64">
          <Label htmlFor="filter" />
          <TextInput type="text" id="filter" placeholder="Buscar..." />
        </div>
        <Button pill>AGREGAR</Button>
      </div>
      <Card>
        <CustomDatatable 
            columns={columns} 
            data={users} 
            isLoading={loading} 
        />
      </Card>
    </section>
  );
};

export default UserPage;
