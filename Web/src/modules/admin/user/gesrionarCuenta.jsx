
import { Button, Label, Select, TextInput } from 'flowbite-react'
import { confimAlert, customAlert } from '../../../config/alerts/alert';
import { useLocation, useNavigate } from 'react-router-dom';
import AxiosClient from '../../../config/http-client/axios-client';
import React from 'react'

import { useFormik } from 'formik';
import *  as yup from "yup"
import { Link } from 'react-router-dom';
import estadosMunicipios from "../../../assets/estados-municipios.json"

const GetionarCuenta = () => {
    const location = useLocation();
    const datos = location.state || {};
    const [checked, setChecked] = React.useState(datos.external);
    const [selectedState, setSelectedState] = React.useState('');
    const [municipios, setMunicipios] = React.useState([]);

    const navigate = useNavigate();

    console.log(datos);

  
    const formik = useFormik({
        initialValues: {
            cedula: datos.data.card,
            
            email: datos.data.userBean.email.slice(0, -1),


            password: datos.data.userBean.password,
            confirmPassword: datos.data.userBean.password,
            status: datos.data.userBean.status,

            name: datos.data.userBean.personBean.name,
            surname: datos.data.userBean.personBean.middleName,
            lastname: datos.data.userBean.personBean.lastName,
            curp: datos.data.userBean.personBean.curp,
            sexo: datos.data.userBean.personBean.sex,
            birthdate: datos.data.userBean.personBean.birthdate,
            birthplace: datos.data.userBean.personBean.birthplace,
            phoneNumber: datos.data.userBean.personBean.phoneNumber,

            state: datos.data.userBean.personBean.addressBean.state,
            municipio: datos.data.userBean.personBean.addressBean.town,
            cp: datos.data.userBean.personBean.addressBean.zip,
            calle: datos.data.userBean.personBean.addressBean.street1,
            calle2: datos.data.userBean.personBean.addressBean.street2,
            calle3: datos.data.userBean.personBean.addressBean.street3,
            interiorNumber: datos.data.userBean.personBean.addressBean.interiorNumber,
            exteriorNumber: datos.data.userBean.personBean.addressBean.exteriorNumber,


         

        },

        

        validationSchema: yup.object().shape({
            newpass: yup.string().required('Campo obligatorio').min(8, 'Mínimo 8 caracteres').max(45, 'Máximo 45 caracteres'),
            passactually: yup.string().required('Campo obligatorio').max(45, 'Máximo 45 caracteres'),

        }),


        validationSchema: yup.object().shape({
            email: yup.string().required('Campo obligatorio').email('Ingresa un correo electrónico válido').min(3, 'Mínimo 3 caracteres').max(45, 'Máximo 45 caracteres').matches(/^[a-zA-Z0-9\s@.]+$/, 'No se permiten caracteres especiales'),
            password: yup.string().required('Campo obligatorio').min(8, 'Minimo 8 caracteres'),
            confirmPassword: yup.string().required('Campo obligatorio').min(8, 'Minimo 8 caracteres').test("password-matches", "Las contraseñas no coinciden", function (value) { return value === this.parent.password }),

            phoneNumber: yup.string().required('Campo obligatorio').matches(/^\d{10}$/, 'El número de teléfono debe tener 10 dígitos').matches(/^\d+$/, 'Solo se permiten dígitos'),

            state: yup.string().required('Campo obligatorio').min(3, 'Mínimo 3 caracteres').max(45, 'Máximo 45 caracteres').matches(/^[a-zA-Z\sáéíóúÁÉÍÓÚñÑ]+$/, 'No se permiten caracteres especiales'),
            municipio: yup.string().required('Campo obligatorio').min(3, 'Mínimo 3 caracteres').max(45, 'Máximo 45 caracteres').matches(/^[a-zA-Z\sáéíóúÁÉÍÓÚñÑ]+$/, 'No se permiten caracteres especiales'),

            cp: yup.string().required('Campo obligatorio').min(5, 'Mínimo 5 caracteres').max(5, 'Máximo 5 caracteres').matches(/^\d+$/, 'Solo se permiten dígitos'),
            calle: yup.string().required('Campo obligatorio').min(3, 'Mínimo 3 caracteres').max(45, 'Máximo 45 caracteres').matches(/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑ]+$/, 'No se permiten caracteres especiales'),

        }),
        onSubmit: async () => {
            confimAlert(async () => {

               
                try {
                    const payload = {
                        card: formik.values.cedula,
                        userBean: {
                            email: (formik.values.email+'d'),
                            password: formik.values.password,
                            status: formik.values.status,
                            personBean: {
                                name: formik.values.name,
                                middleName: formik.values.surname,
                                lastName: formik.values.lastname,
                                birthdate: formik.values.birthdate,
                                birthplace: formik.values.birthplace,
                                curp: formik.values.curp,
                                phoneNumber: formik.values.phoneNumber,
                                sex: formik.values.sexo,
                                addressBean: {
                                    state: formik.values.state,
                                    town: formik.values.municipio,
                                    zip: formik.values.cp,
                                    interiorNumber: formik.values.interiorNumber,
                                    exteriorNumber: formik.values.exteriorNumber,
                                    street1: formik.values.calle,
                                    street2: formik.values.calle2,
                                    street3: formik.values.calle3
                                }
                            }
                        }


                    };
                    console.log(payload);
                    const response = await AxiosClient({
                        url: '/doctor/update',
                        method: 'PUT',
                        data: payload,

                    });
                    if (!response.error) {
                        customAlert(
                            'Actualización exitosa',
                            'El usuario se ha actualizado correctamente',
                            'success');
                    }

                    navigate('/pacientes');


                } catch (error) {
                    customAlert(
                        'Ocurrio un error',
                        'Error al actualizar usuario',
                        'error')
                    console.log(error);
                } finally {

                }
            });
        }
    })



    const handleStateChange = (state) => {
        formik.setFieldValue('state', state);
        setMunicipios(estadosMunicipios[state]);
    };

    React.useEffect(() => {
        if (formik.values.state && estadosMunicipios[formik.values.state]) {
            setMunicipios(estadosMunicipios[formik.values.state]);
        }
    }, [formik.values.state]);


    const formik2 = useFormik({
        initialValues: {
            cedula: datos.data.card,
            newpass: '',
            passactually: '',
        },
        validationSchema: yup.object().shape({
            newpass: yup.string().required('Campo obligatorio').min(8, 'Mínimo 8 caracteres').max(45, 'Máximo 45 caracteres'),
            passactually: yup.string().required('Campo obligatorio').max(45, 'Máximo 45 caracteres'),
        }),
        onSubmit: async () => {
            confimAlert(async () => {

                try {
                    const payload = {
                        card: formik2.values.cedula,
                        oldPassword: formik2.values.passactually,
                        newPassword: formik2.values.newpass


                    };
                    console.log(payload);
                    const response = await AxiosClient({
                        url: '/doctor/changePassword',
                        method: 'POST',
                        data: payload,

                    });
                    if (!response.error) {
                        customAlert(
                            'Actualización exitosa',
                            'La contraseña se ha actualizado correctamente',
                            'success');
                    }

                    navigate('/pacientes');


                } catch (error) {
                    customAlert(
                        'Ocurrio un error',
                        'Error al actualizar la contraseña',
                        'error')
                    console.log(error);
                } finally {

                }
            });
        },
    });
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%', padding: '50px', color: '#03104A', }}>

                <form id='userForm' name='userForm' style={{ width: '50%', padding: '20px', border: '1px solid #ccc', color: '#03104A', borderRadius: '10px' }} noValidate onSubmit={formik.handleSubmit}>

                    <div className='flex flex-col gap-3' >

                        <h3 className='font-bold text-2xl text-center mb-3'>Cuenta</h3> <div className=' pb-2'>

                        <div className="flex flex-wrap justify-center items-center gap-2">
                            <div>
                                <div className="mb-2 block">
                                    <Label />
                                </div>

                            </div>

                        </div>

                        <Label style={{ color: '#03104A' }} htmlFor='email' className='font-bold' value='Correo' />
                        <TextInput style={{ backgroundColor: '#E6ECF1' }} type="text" disabled placeholder="Correo" id="email" name="email"
                                   value={formik.values.email}
                                   onChange={formik.handleChange}
                                   onBlur={formik.handleBlur}
                                   helperText={
                                       formik.touched.email &&
                                       formik.errors.email && (
                                           <span className="text-red-600">{formik.errors.email}</span>
                                       )
                                   } />




                    </div>


                        <div className=''>


                            <div className='grid-col-6 pb-2'>
                                <Label style={{ color: '#03104A' }} htmlFor='phoneNumber' className='font-bold' value='Número de Teléfono' />
                                <TextInput style={{ backgroundColor: '#E6ECF1' }}
                                           type='number'
                                           title="phoneNumber"
                                           id='phoneNumber'
                                           name='phoneNumber'
                                           value={formik.values.phoneNumber}
                                           onChange={formik.handleChange}
                                           onBlur={formik.handleBlur}
                                           helperText={
                                               formik.touched.phoneNumber &&
                                               formik.errors.phoneNumber && (
                                                   <span className='text-red-600'>{formik.errors.phoneNumber}</span>
                                               )
                                           } />
                            </div>


                            <div className='grid-col-6 pb-2'>
                                <Label htmlFor='state' className='font-bold' value='Estado'/>
                                <Select
                                    id="state"
                                    name="state"
                                    value={formik.values.state}
                                    style={{ backgroundColor: '#E6ECF1', color: '#03104A' }}
                                    onChange={(e) => {
                                        formik.handleChange(e);
                                        handleStateChange(e.target.value);
                                    }}
                                >
                                    <option value="" disabled>
                                        Seleccionar
                                    </option>
                                    {Object.keys(estadosMunicipios).map((estado) => (
                                        <option key={estado} value={estado}>
                                            {estado}
                                        </option>
                                    ))}
                                </Select>
                            </div>


                            <div className='grid-col-6 pb-2'>
                                <Label style={{ color: '#03104A' }} htmlFor='municipio' className='font-bold' value='Municipio' />
                                <Select
                                    id="municipio"
                                    name="municipio"
                                    value={formik.values.municipio}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    style={{ backgroundColor: '#E6ECF1', color: '#03104A' }}
                                >
                                    <option value='' disabled>
                                        Seleccionar
                                    </option>
                                    {municipios.map((municipio) => (
                                        <option key={municipio} value={municipio}>
                                            {municipio}
                                        </option>
                                    ))}
                                </Select>
                            </div>

                            <div className='grid-col-6 pb-2'>
                                <Label style={{ color: '#03104A' }} htmlFor='cp' className='font-bold' value='CP' />
                                <TextInput style={{ backgroundColor: '#E6ECF1' }}
                                           type='number'
                                           title="cp"
                                           id='cp'
                                           name='cp'
                                           value={formik.values.cp}
                                           onChange={formik.handleChange}
                                           onBlur={formik.handleBlur}
                                           helperText={
                                               formik.touched.cp &&
                                               formik.errors.cp && (
                                                   <span className='text-red-600'>{formik.errors.cp}</span>
                                               )
                                           } />
                            </div>

                            <div className='grid-col-6 pb-2'>
                                <Label style={{ color: '#03104A' }} htmlFor='calle' className='font-bold' value='Calle' />
                                <TextInput style={{ backgroundColor: '#E6ECF1' }}
                                           type='calle'
                                           title="calle"
                                           id='calle'
                                           name='calle'
                                           value={formik.values.calle}
                                           onChange={formik.handleChange}
                                           onBlur={formik.handleBlur}
                                           helperText={
                                               formik.touched.calle &&
                                               formik.errors.calle && (
                                                   <span className='text-red-600'>{formik.errors.calle}</span>
                                               )
                                           } />
                            </div>
                            <div className='grid-col-6 pb-2'>
                                <Label style={{ color: '#03104A' }} htmlFor='calle2' className='font-bold' value='Calle 2' />
                                <TextInput style={{ backgroundColor: '#E6ECF1' }}
                                           type='calle2'
                                           title="calle2"
                                           id='calle2'
                                           name='calle2'
                                           value={formik.values.calle2}
                                           onChange={formik.handleChange}
                                           onBlur={formik.handleBlur}
                                           helperText={
                                               formik.touched.calle2 &&
                                               formik.errors.calle2 && (
                                                   <span className='text-red-600'>{formik.errors.calle2}</span>
                                               )
                                           } />
                            </div>

                            <div className='grid-col-6 pb-2'>
                                <Label style={{ color: '#03104A' }} htmlFor='calle3' className='font-bold' value='Calle 3' />
                                <TextInput style={{ backgroundColor: '#E6ECF1' }}
                                           type='calle3'
                                           title="calle3"
                                           id='calle3'
                                           name='calle3'
                                           value={formik.values.calle3}
                                           onChange={formik.handleChange}
                                           onBlur={formik.handleBlur}
                                           helperText={
                                               formik.touched.calle3 &&
                                               formik.errors.calle3 && (
                                                   <span className='text-red-600'>{formik.errors.calle3}</span>
                                               )
                                           } />
                            </div>



                        </div>

                    </div>

                    <div className='flex justify-end space-x-4 mt-6'>


                        <Link to={'/'} > <Button color="failure" style={{ outline: 'none', boxShadow: 'none' }}>Cancelar</Button> </Link>

                        <Button
                            style={{ backgroundColor: '#03257A', color: '#fff' }}
                            className=''
                            type='submit'
                            form='userForm'
                            disabled={formik.isSubmitting || !formik.isValid}
                            color='succes'>
                            Guardar
                        </Button>


                    </div>
                </form>
            </div>


            <div style={{ display: 'flex', justifyContent: 'center', width: '100%', padding: '50px', color: '#03104A', }}>

                <form id='updatepass' name='updatepass' style={{ width: '50%', padding: '20px', border: '1px solid #ccc', color: '#03104A', borderRadius: '10px' }} noValidate onSubmit={formik2.handleSubmit}>


                    <h3 className='font-bold text-2xl text-center mb-3'>Cambiar contraseña</h3> <div className=' pb-2'>




                    <div className=''>
                 

                        <div className='pb-2'>
                            <Label style={{ color: '#03104A' }} htmlFor='passactually' className='font-bold' value=' Anterior contraseña' />
                            <TextInput style={{ backgroundColor: '#E6ECF1' }} hidden type='password' placeholder="************" id="passactually" name="passactually"
                                       value={formik2.values.passactually}
                                       onChange={formik2.handleChange}
                                       onBlur={formik2.handleBlur}
                                       helperText={
                                           formik2.touched.passactually &&
                                           formik2.errors.passactually && (
                                               <span className="text-red-600">{formik2.errors.passactually}</span>
                                           )
                                       } />
                        </div>

                        <div className='grid-col-6 pb-2'>
                            <Label style={{ color: '#03104A' }} htmlFor='newpass' className='font-bold' value='Contraseña nueva' />
                            <TextInput style={{ backgroundColor: '#E6ECF1' }} hidden type='password' placeholder="************" id="newpass" name="newpass"
                                       value={formik2.values.newpass}
                                       onChange={formik2.handleChange}
                                       onBlur={formik2.handleBlur}
                                       helperText={
                                           formik2.touched.newpass &&
                                           formik2.errors.newpass && (
                                               <span className="text-red-600">{formik2.errors.newpass}</span>
                                           )
                                       } />
                        </div>



                    </div>

                </div>

                    <div className='flex justify-end space-x-4 mt-6'>


                        <Link to={'/'} > <Button color="failure" style={{ outline: 'none', boxShadow: 'none' }}>Cancelar</Button> </Link>

                        <Button
                            style={{ backgroundColor: '#03257A', color: '#fff' }}
                            className=''
                            type='submit'
                            form='updatepass'
                            disabled={formik2.isSubmitting || !formik2.isValid}
                            color='succes'>
                            Guardar
                        </Button>


                    </div>
                </form>
            </div>
        </>
    );
}
export default GetionarCuenta;