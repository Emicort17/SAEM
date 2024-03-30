/*navegar entre componentes 
por medio de URL*/
import  { useContext } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import DashboardPage from '../modules/admin/DashboardPage';
import SignInPage from '../modules/auth/SignInPage';
import Forgetpass from '../modules/auth/Forgetpass';

import AuthContext from '../config/context/auth-context';
import AdminLayout from '../components/layout/AdminLayout';
import Medicos from '../modules/admin/Medicos';
import UserPage from '../modules/admin/user/UserPage';
import Subirdatos from '../modules/admin/cargardatos';
import RegisterPerson from '../modules/admin/user/components/RegisterPersonForm';
import EditPerson from '../modules/admin/user/components/EditPerson';

import RegisterMedical from '../modules/admin/user/components/RegisterMedical';

import EditMedical from '../modules/admin/user/components/EditMedical';
import GetionarCuenta from '../modules/admin/user/gesrionarCuenta';

const AppRouter = () => {
  const { user } = useContext(AuthContext);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {user.signed ? (
          <>
            <Route path="/" element={<AdminLayout />}>
              {   
                // routesFromRole(user?.roles[0]?.name)
              }
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="medicos" element={<><Medicos/></>} />
              <Route path="Subirdatos" element={<><Subirdatos/></>} />
              <Route path="pacientes" element={<UserPage />} />
              <Route path="registerperson" element={ <RegisterPerson />} />
              <Route path="editperson" element={ <EditPerson />} />
              <Route path="registermedico" element={ <RegisterMedical />} />
              <Route path="editmedico" element={ <EditMedical />} />
              <Route path="gestionarCuenta" element={ <GetionarCuenta />} />
              <Route path="forgetpass" element={ <Forgetpass />} />


            </Route>
          </>
        ) : (
          <Route path="/" element={<SignInPage />} />
          
        )}
        <Route path="/*" element={<> 404 not found sdss</>} />
      </>
    )
  );
  //RouterProvider -> Context
  return <RouterProvider router={router} />;
};
export default AppRouter;
