import { useContext } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

// Importaciones de componentes y pÃ¡ginas
import SignInPage from '../modules/auth/SignInPage';
import Forgetpass from '../modules/auth/Forgetpass';

import AuthContext from '../config/context/auth-context';
import AdminLayout from '../components/layout/AdminLayout';
import Error404 from '../components/layout/Error404';
import Medicos from '../modules/admin/Medicos';
import UserPage from '../modules/admin/user/UserPage';
import Subirdatos from '../modules/admin/cargardatos';
import RegisterPerson from '../modules/admin/user/components/RegisterPersonForm';
import EditPerson from '../modules/admin/user/components/EditPerson';

import RegisterMedical from '../modules/admin/user/components/RegisterMedical';
import EditMedical from '../modules/admin/user/components/EditMedical';
import Citas from '../modules/admin/user/components/Citas';

import GetionarCuenta from '../modules/admin/user/gesrionarCuenta';

import Patients from '../modules/medical/Pacientes';
import InformePrincipal from '../modules/medical/Informe';
import FormularioSeguimiento from '../modules/medical/FormularioSeguimiento';

const AppRouter = () => {
  const { user } = useContext(AuthContext);

  const routesFromRole = (authorities) => {
    switch (authorities) {
      case 'ADMIN_ROLE':
        return (
          <>
            <Route path="/" element={<AdminLayout user={user} />}>
              <Route path="medicos" element={<><Medicos /></>} />
              <Route path="Subirdatos" element={<><Subirdatos /></>} />
              <Route path="pacientes" element={<UserPage />} />
              <Route path="registerperson" element={<RegisterPerson />} />
              <Route path="editperson" element={<EditPerson />} />
              <Route path="registermedico" element={<RegisterMedical />} />
              <Route path="editmedico" element={<EditMedical />} />
              <Route path="gestionarCuenta" element={<GetionarCuenta />} />
              <Route path="citas" element={<Citas />} />
            </Route>
          </>
        );
      case 'DOCTOR_ROLE':
        return (
          <>
            <Route path="/" element={<AdminLayout user={user} />} >
              <Route path="pacientes" element={<><Patients /></>} />
              <Route path="informe" element={<><InformePrincipal /></>} />
              <Route path="formularioSeguimiento" element={<><FormularioSeguimiento /></>} />
            </Route>
          </>
        );
    }
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {user.signed ? (
          <>
            {routesFromRole(user?.authorities[0]?.authority)}
          </>
        ) : (
          <>
            <Route path="/" element={<SignInPage />} />
            <Route path="/forgetpass" element={<Forgetpass />} />
          </>
        )}
        <Route path="/*" element={<Error404 />} />
      </>
    )
  );

  return <RouterProvider router={router} />;
};

export default AppRouter;