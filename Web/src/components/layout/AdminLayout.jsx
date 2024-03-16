import { FiMenu } from "react-icons/fi";

import { Outlet, Link } from 'react-router-dom';
import { Navbar, Sidebar } from 'flowbite-react';
import { FaUserDoctor } from "react-icons/fa6";
import { Avatar, Dropdown } from 'flowbite-react';
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";


import { PiUserListLight } from "react-icons/pi";
import { GoUpload } from "react-icons/go";
import './style.css';

const AdminLayout = () => {
  return (
    <>
      <header>
        <Navbar fluid className="navbar">
          <Navbar.Brand as={Link} href="https://flowbite-react.com">
            <FiMenu className="iconmenuNav" name="menu" size={34} color="white" />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white ml-1">SAEM</span>
          </Navbar.Brand>

          <Navbar.Collapse>

            <div className="flex md:order-2">
              <Dropdown
                arrowIcon={false}
                inline
                label={
                  <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
                }
                className="menuconfg"
              >
                <div className="contimg">

                  <img className="imgmenuconfig" alt="User settings" src="src\assets\Images\Login.png" />

                </div>

                <div className="saludo">

                  <p className="">¡Hola, Celeb!</p>

                </div>

                <div className="centrar">
                  <button className="menuconfgitem"><IoSettingsOutline size={25} className="iconoseparacion" /><p>Gestionar tu cuenta</p></button>
                  <button className="menuconfgitem"><IoIosLogOut size={30} className="iconoseparacion" /><p>Cerrar sesión</p></button>


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

      <main className="flex">
        <aside>
          <Sidebar className="menu">
            <Sidebar.Items >
              <Sidebar.ItemGroup >
                <li>
                  <Link
                    to={'medicos'}
                    className="flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    <FaUserDoctor className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                    <span className="px-3 flex-1 whitespace-nowrap">
                      Medicos
                    </span>
                  </Link>

                </li>
                <li>
                  <Link
                    to={'pacientes'}
                    className="flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    <PiUserListLight className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                    <span className="px-3 flex-1 whitespace-nowrap">
                      Pacientes
                    </span>
                  </Link>

                </li>


         

              <Link
                to={'Subirdatos'}
                className="flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                <GoUpload className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                <span className="px-3 flex-1 whitespace-nowrap">
                  Subir datos
                </span>
              </Link>
            

                <li>
                  <Link
                    to={'users'}
                    className="flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    <PiUserListLight className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                    <span className="px-3 flex-1 whitespace-nowrap">
                      Usuarios
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
