
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
import { Alert } from 'flowbite-react';
import { HiInformationCircle } from 'react-icons/hi';

import './style.css';

const Forgetpass = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: yup.object().shape({
      email: yup.string().required('Campo obligatorio').email('Ingresa un correo electrónico válido').min(3, 'Mínimo 10 caracteres').max(45, 'Máximo 45 caracteres'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await AxiosClient({
          url: '/auth/recover/send-mail',
          method: 'POST',
          data: {
            toEmail: values.email,
          },

        });

        console.log(response);
        if (!response.error) {
          customAlert(
            'Hecho',
            'La contraseña fue enviada al correo',
            'info'
          );

        } else throw Error('Error');
      } catch (error) {
        customAlert(
          'Error',
          'El correo ingresado no pertenece a una cuenta',
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
        <Navbar style={{ backgroundColor: "#03104A" }} fluid className="navbar flex justify-center">
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
                  Recuperar Contraseña               </h1>

                <Alert color="info" icon={HiInformationCircle} className='p-5 flex flex-row' >
                  <span className="font-medium flex flex-row">La contraseña será enviada al correo enlazado a la cuenta </span>
                </Alert>
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={formik.handleSubmit}
                  noValidate
                >
                  <div>
                    <Label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Correo
                    </Label>
                    <TextInput
                      type="text"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      helperText={
                        formik.errors.email && formik.touched.email ? (
                          <span className="text-red-600">
                            {formik.errors.email}
                          </span>
                        ) : null
                      }
                      id="email"
                      placeholder="erielit"
                    />
                  </div>

                  <div className="flex justify-end">
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
                          <svg
                            className="w-6 h-6 text-gray-800 dark:text-white"
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
                          Enviar
                        </>
                      )}
                    </Button>
                  </div>
                </form>

              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Forgetpass;
