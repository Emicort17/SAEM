
import React, { useState, useContext, useEffect } from 'react';
import { FiMenu } from "react-icons/fi";
import { Outlet, Link } from 'react-router-dom';
import { Navbar, Sidebar } from 'flowbite-react';
import { FaUserDoctor } from "react-icons/fa6";
import { Avatar, Dropdown } from 'flowbite-react';
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { PiUserListLight } from "react-icons/pi";
import { GoUpload } from "react-icons/go";
import { LogOutAlert } from '../../config/alerts/alert';

import AuthContext from '../../config/context/auth-context';

import '../../assets/adminlayout.css';



const AdminLayout = () => {
  const [selectedSection, setSelectedSection] = useState('');
  const [userName, setUserName] = useState('');

  const handleSectionChange = (section) => {
    setSelectedSection(section);
  };

  const { dispatch } = useContext(AuthContext);

  const Logout = async () => {
    try {
      const result = await LogOutAlert(); // Mostrar la alerta
      if (result.isConfirmed) { // Si el usuario confirmó la acción
        localStorage.removeItem('user'); // Eliminar el usuario del almacenamiento local
        dispatch({ type: 'SIGNOUT' }); // Realizar la acción de cerrar sesión
        <Link to={'/'}></Link>; // Redirigir al usuario a la página de inicio
      }
    } catch (error) {
      console.error(error);
    }
  };



  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUserName = async () => {
      try {
        // Simulando la carga de datos de sesión
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const userData = localStorage.getItem('user');
        if (userData) {
          const user = JSON.parse(userData);
          if (user && user.user) {
            if (user.user.user != null) {
              setUserName(user.user.user);
            } else {
              setUserName(user.user.personBean.name);
            }
          }
        }
        setIsLoading(false); // Marcar la carga como completada
      } catch (error) {
        console.error('Error loading user name:', error);
      }
    };

    loadUserName();
  }, []);

  console.log('User name:', userName); // Debug statement

  return (
    <>

      <header>
        <Navbar style={{ backgroundColor: "#03104A", color: "#ffffff" }} fluid className="">
          <Navbar.Brand as={Link} href="https://flowbite-react.com">
            <FiMenu className="iconmenuNav" name="menu" size={34} color="white" />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white ml-1">SAEM</span>
          </Navbar.Brand>

          <Navbar.Collapse >

            <div className="flex md:order-2 "   >
              <Dropdown

                arrowIcon={false}
                inline
                label={
                  <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
                }

                className="bg-neutral-800 rounded-xl  menuconfg" >

                <div className="contimg">

                  <img className="imgmenuconfig" alt="User settings" src="src/assets/Images/Login.png" />

                </div>

                <div className="saludo">

                  {userName ? (
                    <p>¡Hola, {userName}!</p>
                  ) : (
                    <p>Cargando...</p>
                  )}

                </div>

                <div className="centrar">
                  <Link to={'/gestionarCuenta'}><button className="menuconfgitem"><IoSettingsOutline size={25} className="iconoseparacion" /><p>Gestionar tu cuenta</p></button> </Link>
                  <Link> <button className="menuconfgitem" onClick={Logout}><IoIosLogOut size={30} className="iconoseparacion" /><p>Cerrar sesión</p></button> </Link>

                </div>


              </Dropdown>
              <Navbar.Toggle />
            </div>

          </Navbar.Collapse>

        </Navbar>
      </header>
      {
        /*
          Person, Role, User
          Operations -> CRUD
          GET /api/user/ -> findAll
          GET /api/user/:id -> findById
          POST /api/user/ -> create
          PUT /api/user/ -> update
          PATCH /api/user/ -> changeStatus
        */
      }

      <main className="flex ">

        <aside >
          <Sidebar style={{ height: "100vh" }} className="grid gap-y-7">
            <Sidebar.Items  >
              <Sidebar.ItemGroup className='flex flex-col space-y-4'>
                <li >
                  <Link
                    style={{ backgroundColor: "#1C3344", color: "#ffff" }}
                    to={'medicos'}
                    onClick={() => handleSectionChange('medicos')}
                    className={` cursor-pointer flex items-center justify-center rounded-lg p-2 text-base font-normal opacity-10 ${selectedSection === 'medicos'
                      ? 'text-zinc-950 bg-white font-bold'
                      : 'text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700'
                      }`}
                  >
                    <FaUserDoctor className="h-6 w-6 flex-shrink-0 text-white transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                    <span className="px-3 flex-1 whitespace-nowrap">
                      Medicos
                    </span>
                  </Link>

                </li>
                <li >



                  <Link style={{ backgroundColor: "#1C3344", color: "#ffff" }}
                    to={'pacientes'}
                    onClick={() => handleSectionChange('pacientes')}
                    className={`flex items-center justify-center rounded-lg p-2 text-base font-normal ${selectedSection === 'pacientes'
                      ? 'text-zinc-950 bg-white font-bold'
                      : 'text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700'
                      }`}                  >
                    <PiUserListLight className="h-6 w-6 flex-shrink-0 text-white transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                    <span className="px-3 flex-1 whitespace-nowrap">
                      Pacientes
                    </span>
                  </Link>



                </li>
                <li >
                  <Link style={{ backgroundColor: "#1C3344", color: "#ffff" }}
                    to={'Subirdatos'}
                    onClick={() => handleSectionChange('Subirdatos')}
                    className={`flex items-center justify-center rounded-lg p-2 text-base font-normal ${selectedSection === 'Subirdatos'
                      ? 'text-zinc-950 bg-white font-bold'
                      : 'text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700'
                      }`}              >
                    <GoUpload className="h-6 w-6 flex-shrink-0 text-white transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                    <span className="px-3 flex-1 whitespace-nowrap">
                      Subir datos
                    </span>
                  </Link>

                </li>

              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </Sidebar>

        </aside>
        <section className="w-full">
          <Outlet />
        </section>





      </main>
    </>
  );
};

export default AdminLayout;
