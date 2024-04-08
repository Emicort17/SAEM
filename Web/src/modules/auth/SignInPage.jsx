
import { Link } from 'react-router-dom';
import { Navbar } from 'flowbite-react';

import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Button, TextInput, Label, Spinner } from 'flowbite-react';
import AxiosClient from '../../config/http-client/axios-client';
import { customAlert } from '../../config/alerts/alert';
import AuthContext from '../../config/context/auth-context';


import './style.css';

const SignInPage = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const forgetpass=()=> {

    navigate('/forgetpass',{ replace: false });

} 


  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: yup.object().shape({
      username: yup.string().required('Campo obligatorio'),
      password: yup.string().required('Campo obligatorio'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await AxiosClient({
          url: '/auth/signIn',
          method: 'POST',
          data: {
            emailOrUsername: values.username,
            password: values.password
          },

        });

        console.log(response);
        if (!response.error) {
          console.log("Supuesto token guardado");

          console.log(response.data);

          dispatch({ type: 'SIGNIN', payload: response.data });
          navigate('/', { replace: true });
        } else throw Error('Error');
      } catch (error) {
        customAlert(
          'Iniciar sesión',
          'Usuario y/o contraseña incorrectos',
          'info'
        );
      } finally {
        setSubmixtting(false);
      }
    },
  });

  return (
    <>
      <header>
        <Navbar style={{ backgroundColor: "#03104A" }} fluid className="navbar flex justify-center ">
          <Navbar.Brand as={Link} href="">

            <span className="title self-center whitespace-nowrap text-xl font-semibold dark:text-white ml-1">SAEM</span>
          </Navbar.Brand>

          <Navbar.Collapse>
          </Navbar.Collapse>
        </Navbar>
      </header>

      <div className={' w-screen h-screen flex justify-center align-middle mt-4'}>
        <section className=" dark:bg-gray-900 w-full  max-w-lg">
          <div className="  flex flex-col items-center px-4 mx-auto" style={{ marginTop: '2rem' }}>
            <div className="cont w-full bg-white rounded-lg shadow shadow-zinc-300 dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">

              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold text-center leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Inicio de sesión                </h1>
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={formik.handleSubmit}
                  noValidate
                >
                  <div>
                    <Label
                      htmlFor="username"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Usuario
                    </Label>
                    <TextInput
                      type="text"
                      name="username"
                      value={formik.values.username}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      helperText={
                        formik.errors.username && formik.touched.username ? (
                          <span className="text-red-600">
                            {formik.errors.username}
                          </span>
                        ) : null
                      }
                      id="username"
                      placeholder="Usuario o Correo"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Contraseña
                    </Label>
                    <TextInput
                      type="password"
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      helperText={
                        formik.errors.password && formik.touched.password ? (
                          <span className="text-red-600">
                            {formik.errors.password}
                          </span>
                        ) : null
                      }
                      id="password"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  <div className="flex justify-end">
                    
                  <button style={{color:'#57595D'}} onClick={forgetpass}>¿Olvidaste tu contraseña?</button>
                      
                  </div>
                  <Button
                    type="submit"
                    color="light"
                    className="w-full"
                    disabled={formik.isSubmitting || !formik.isValid}
                  >
                    {formik.isSubmitting ? (
                      <Spinner />
                    ) : (
                      <>
                    
                        Iniciar sesión 

                        <svg
                          className="w-6 h-6 text-gray-800 dark:text-white flex justify-end"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2"
                          />
                        </svg>
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default SignInPage;
