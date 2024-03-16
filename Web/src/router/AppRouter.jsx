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
import AuthContext from '../config/context/auth-context';
import AdminLayout from '../components/layout/AdminLayout';
import Medicos from '../modules/admin/Medicos';
import Pacientes from '../modules/admin/Pacientes';
import UserPage from '../modules/admin/user/UserPage';
import Subirdatos from '../modules/admin/cargardatos';


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
              <Route path="pacientes" element={<><Pacientes/></>} />
              <Route path="users" element={<UserPage />} />


            </Route>
          </>
        ) : (
          <Route path="/" element={<SignInPage />} />
        )}
        <Route path="/*" element={<> 404 not found</>} />
      </>
    )
  );
  //RouterProvider -> Context
  return <RouterProvider router={router} />;
};
export default AppRouter;
