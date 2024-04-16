import { Button, Label, Modal, Select, TextInput, Datepicker } from 'flowbite-react'
import { confimAlert, customAlert } from '../../../../config/alerts/alert';
import AxiosClient from '../../../../config/http-client/axios-client';

import { useFormik } from 'formik';
import React from 'react'
import *  as yup from "yup"
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



const EditMedical = () => {
    const navigate = useNavigate();


    const location = useLocation();
    const datos = location.state || {};

    console.log(datos);

    const formik = useFormik({
        initialValues: {
            cedula: datos.card || '',
            email: datos.userBean?.email || '',
            password: datos.userBean?.password || '',
            confirmPassword: datos.userBean?.password || '',
            name: datos.userBean?.personBean?.name || '',
            surname: datos.userBean?.personBean?.middleName || '',
            lastname: datos.userBean?.personBean?.lastName || '',
            curp: datos.userBean?.personBean?.curp || '',
            sexo: datos.userBean?.personBean?.sex || '',
            birthdate: datos.userBean?.personBean?.birthdate || '',
            birthplace: datos.userBean?.personBean?.birthplace || '',
            phoneNumber: datos.userBean?.personBean?.phoneNumber || '',
            state: datos.userBean?.personBean?.addressBean?.state || '',
            municipio: datos.userBean?.personBean?.addressBean?.town || '',
            cp: datos.userBean?.personBean?.addressBean?.zip || '',
            calle: datos.userBean?.personBean?.addressBean?.street1 || '',
            calle2: datos.userBean?.personBean?.addressBean?.street2 || '',
            calle3: datos.userBean?.personBean?.addressBean?.street3 || '',
            interiorNumber: datos.userBean?.personBean?.addressBean?.interiorNumber || '',
            exteriorNumber: datos.userBean?.personBean?.addressBean?.exteriorNumber || '',
        },
        validationSchema: yup.object().shape({
            email: yup.string().required('Campo obligatorio').email('Ingresa un correo electrónico válido').min(10, 'Mínimo 10 caracteres').max(60, 'Máximo 60 caracteres'),
            password: yup.string().required('Campo obligatorio').min(8, 'Minimo 8 caracteres'),
            confirmPassword: yup.string().required('Campo obligatorio').min(8, 'Minimo 8 caracteres').test("password-matches", "Las contraseñas no coinciden", function (value) { return value === this.parent.password }),
            
            name: yup.string().required('Campo obligatorio').min(3, 'Minimo 3 caracteres').max(45, 'Maximo 45 caracteres').matches(/^[a-zA-Z\sáéíóúÁÉÍÓÚñÑ]+$/, 'No se permiten caracteres especiales'),
            surname: yup.string().required('Campo obligatorio').min(3, 'Minimo 3 caracteres').max(45, 'Maximo 45 caracteres').matches(/^[a-zA-Z\sáéíóúÁÉÍÓÚñÑ]+$/, 'No se permiten caracteres especiales'),
            lastname: yup.string().min(3, 'Minimo 3 caracteres').max(45, 'Maximo 45 caracteres').matches(/^[a-zA-Z\sáéíóúÁÉÍÓÚñÑ]+$/, 'No se permiten caracteres especiales'),
            
            curp: yup.string().required('Campo obligatorio').min(18, 'Minimo 18 caracteres').max(18, 'Maximo 18 caracteres').matches(/^[a-zA-Z0-9]+$/, 'No se permiten caracteres especiales'),
            phoneNumber: yup.string().required('Campo obligatorio').matches(/^\d{10}$/, 'El número de teléfono debe tener 10 dígitos').matches(/^\d+$/, 'Solo se permiten dígitos'),
            birthdate: yup.string().required('Campo obligatorio'),
            
            state: yup.string().required('Campo obligatorio').min(3, 'Mínimo 3 caracteres').max(45, 'Máximo 45 caracteres').matches(/^[a-zA-Z\sáéíóúÁÉÍÓÚñÑ]+$/, 'No se permiten caracteres especiales'),
            municipio: yup.string().required('Campo obligatorio').min(3, 'Mínimo 3 caracteres').max(45, 'Máximo 45 caracteres').matches(/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑ]+$/, 'No se permiten caracteres especiales'),
            
            birthplace: yup.string().required('Campo obligatorio').min(3, 'Mínimo 3 caracteres').max(45, 'Máximo 45 caracteres').matches(/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑ]+$/, 'No se permiten caracteres especiales'),
            
            interiorNumber: yup.string().required('Campo obligatorio').min(2, 'Mínimo 2 caracteres').max(5, 'Máximo 5 caracteres').matches(/^[a-zA-Z0-9]+$/, 'Solo se permiten letras y números'),
            exteriorNumber: yup.string().required('Campo obligatorio').min(2, 'Mínimo 2 caracteres').max(5, 'Máximo 5 caracteres').matches(/^\d+$/, 'Solo se permiten dígitos'),
            
            cp: yup.string().required('Campo obligatorio').min(5, 'Mínimo 5 caracteres').max(5, 'Máximo 5 caracteres').matches(/^\d+$/, 'Solo se permiten dígitos'),
            sexo: yup.string().required('Campo obligatorio'),
            calle: yup.string().required('Campo obligatorio').min(3, 'Mínimo 3 caracteres').max(45, 'Máximo 45 caracteres').matches(/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑ]+$/, 'No se permiten caracteres especiales'),
            cedula: yup.string().required('Campo obligatorio').min(7, 'Mínimo 7 caracteres').max(7, 'Máximo 7 caracteres').matches(/^\d+$/, 'Solo se permiten números'),

        }),

        onSubmit: async () => {
            confimAlert(async () => {
                try {
                    const payload = {
                        card: formik.values.cedula,
                        userBean: {
                            email: formik.values.email,
                            password: formik.values.password,
                            status: true,
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
                    const response = await AxiosClient({
                        url: '/doctor/update',
                        method: 'PUT',
                        data: payload
                    });
                    if (!response.error) {
                        customAlert(
                            'Registro exitoso',
                            'El usuario se ha registrado correctamente',
                            'success');
                    }
                    navigate('/medicos');

                } catch (error) {
                    customAlert(
                        'Ocurrio un error',
                        'Error al registrar usuario',
                        'error')
                    console.log(error);
                } finally {

                }
            });
        }
    })

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%', padding: '50px', color: '#03104A' }}>
                {/* Primer recuadro */}
                <form id='doctorForm' name='doctorForm' style={{ width: '80%', padding: '20px', border: '1px solid #ccc', color: '#03104A', borderRadius: '10px', marginRight: '20px' }} noValidate onSubmit={formik.handleSubmit} className='p-5'>

                    <div className='w-full flex flex-row  justify-between px-5 py-5'>


                        <div className='flex flex-col gap-3 w-1/2' >

                            <h3 className='font-bold text-2xl text-center'>Medicos</h3>

                            <div className='grid-col-4'>
                                <Label style={{ color: '#03104A' }} htmlFor='name' className='font-bold' value='Nombre' />
                                <TextInput style={{ backgroundColor: '#E6ECF1' }} type="text" placeholder="Nombre" id="name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    helperText={formik.touched.name && formik.errors.name && (<span className="text-red-600">{formik.errors.name}</span>)} />
                            </div>

                            <div className='grid-col-4 pb-2'>
                                <Label style={{ color: '#03104A' }} htmlFor='surname' className='font-bold' value='Apellido paterno' />
                                <TextInput style={{ backgroundColor: '#E6ECF1' }} type="text" placeholder="Apellido paterno" id="surname"
                                    value={formik.values.surname}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    helperText={
                                        formik.touched.surname &&
                                        formik.errors.surname && (
                                            <span className='text-red-600'>{formik.errors.surname}</span>
                                        )
                                    }
                                />
                            </div>
                            <div className='grid-col-4 pb-2'>
                                <Label style={{ color: '#03104A' }} htmlFor='lastname' className='font-bold' value='Apellido materno' />
                                <TextInput style={{ backgroundColor: '#E6ECF1' }} type="text" placeholder="Apellido materno " id="lastname"
                                    value={formik.values.lastname}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    helperText={
                                        formik.touched.lastname &&
                                        formik.errors.lastname && (
                                            <span className='text-red-600'>{formik.errors.lastname}</span>
                                        )
                                    } />
                            </div>

                            <div className='grid-col-4 pb-2'>
                                <Label style={{ color: '#03104A' }} htmlFor='curp' className='font-bold' value='CURP' />
                                <TextInput style={{ backgroundColor: '#E6ECF1' }} type='text' placeholder="CURP" id="curp" name="curp"
                                    value={formik.values.curp.toUpperCase()}
                                    onChange={(e) => formik.setFieldValue('curp', e.target.value.toUpperCase())} // Convertir a mayúsculas al escribir
                                    onBlur={formik.handleBlur}
                                    helperText={
                                        formik.touched.curp &&
                                        formik.errors.curp && (
                                            <span className='text-red-600'>{formik.errors.curp}</span>
                                        )
                                    }
                                />
                            </div>

                            <div className='grid-col-6 pb-2' >
                                <Label style={{ color: '#03104A' }} htmlFor='cedula' className='font-bold' value='Cédula profesional' />
                                <TextInput style={{ backgroundColor: '#E6ECF1' }} type='text' placeholder="Cédula profesional" id="cedula"
                                    value={formik.values.cedula}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    helperText={
                                        formik.touched.cedula &&
                                        formik.errors.cedula && (
                                            <span className='text-red-600'>{formik.errors.cedula}</span>
                                        )
                                    }
                                />
                            </div>

                            <div className='grid-col-6 pb-2'>
                                <Label style={{ color: '#03104A' }} htmlFor='phoneNumber' className='font-bold' value='Número de Teléfono' />
                                <TextInput style={{ backgroundColor: '#E6ECF1' }}
                                    type='number'
                                    title="phoneNumber"
                                    id='phoneNumber'
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
                                <Label style={{ color: '#03104A' }} htmlFor='birthdate' className='font-bold' value='Fecha de nacimiento' />
                                <TextInput style={{ backgroundColor: '#E6ECF1' }}
                                    type='date'
                                    title="Fecha de nacimiento"
                                    id='birthdate'
                                    value={formik.values.birthdate}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    helperText={
                                        formik.touched.birthdate &&
                                        formik.errors.birthdate && (
                                            <span className='text-red-600'>{formik.errors.curp}</span>
                                        )
                                    } />
                            </div>


                            <div className='grid-col-7'>
                                <Label htmlFor='sex' className='font-bold' value='Sexo' />
                                <Select style={{ backgroundColor: '#E6ECF1' }} id="sex" name="sexo" value={formik.values.sexo} onChange={formik.handleChange}>
                                    <option value='' disabled>Seleccionar</option>
                                    <option value='Hombre'>Hombre</option>
                                    <option value='Mujer'>Mujer</option>
                                </Select>
                            </div>
                            <div className='grid-col-6 pb-2'>
                                <Label style={{ color: '#03104A' }} htmlFor='birthplace' className='font-bold' value='Lugar de nacimiento' />
                                <TextInput style={{ backgroundColor: '#E6ECF1' }}
                                    type='text'
                                    title="birthplace"
                                    id='birthplace'
                                    name='birthplace'
                                    value={formik.values.birthplace}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    helperText={
                                        formik.touched.birthplace &&
                                        formik.errors.birthplace && (
                                            <span className='text-red-600'>{formik.errors.birthplace}</span>
                                        )
                                    } />
                            </div>
                        </div>


                        <div className='flex flex-col gap-3 w-1/2 space-x-8' >
                            <h3 className='font-bold text-2xl text-center'>Dirección</h3>

                            <div className='grid-col-6 pb-2'>
                                <Label style={{ color: '#03104A' }} htmlFor='state' className='font-bold' value='Estado' />
                                <TextInput style={{ backgroundColor: '#E6ECF1' }}
                                    type='text'
                                    title="state"
                                    id='state'
                                    value={formik.values.state}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    helperText={
                                        formik.touched.state &&
                                        formik.errors.state && (
                                            <span className='text-red-600'>{formik.errors.state}</span>
                                        )
                                    } />
                            </div>


                            <div className='grid-col-6 pb-2'>
                                <Label style={{ color: '#03104A' }} htmlFor='municipio' className='font-bold' value='Municipio' />
                                <TextInput style={{ backgroundColor: '#E6ECF1' }}
                                    type='text'
                                    title="municipio"
                                    id='municipio'
                                    value={formik.values.municipio}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    helperText={
                                        formik.touched.municipio &&
                                        formik.errors.municipio && (
                                            <span className='text-red-600'>{formik.errors.municipio}</span>
                                        )
                                    } />
                            </div>

                            <div className='grid-col-6 pb-2'>
                                <Label style={{ color: '#03104A' }} htmlFor='cp' className='font-bold' value='CP' />
                                <TextInput style={{ backgroundColor: '#E6ECF1' }}
                                    type='number'
                                    title="cp"
                                    id='cp'
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
                                    type='text'
                                    title="calle"
                                    id='calle'
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
                            <div className='flex flex-row justify-between space-x-5'>
                                <div className='grid-col-6 pb-2'>
                                    <Label style={{ color: '#03104A' }} htmlFor='interiorNumber' className='font-bold' value='Número Interior' />
                                    <TextInput style={{ backgroundColor: '#E6ECF1' }}
                                        type='interiorNumber'
                                        title="interiorNumber"
                                        id='interiorNumber'
                                        name='interiorNumber'
                                        value={formik.values.interiorNumber}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        helperText={
                                            formik.touched.interiorNumber &&
                                            formik.errors.interiorNumber && (
                                                <span className='text-red-600'>{formik.errors.interiorNumber}</span>
                                            )
                                        } />
                                </div>
                                <div className='grid-col-6 pb-2'>
                                    <Label style={{ color: '#03104A' }} htmlFor='exteriorNumber' className='font-bold' value='Número exterior' />
                                    <TextInput style={{ backgroundColor: '#E6ECF1' }}
                                        type='exteriorNumber'
                                        title="exteriorNumber"
                                        id='exteriorNumber'
                                        name='exteriorNumber'
                                        value={formik.values.exteriorNumber}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        helperText={
                                            formik.touched.exteriorNumber &&
                                            formik.errors.exteriorNumber && (
                                                <span className='text-red-600'>{formik.errors.exteriorNumber}</span>
                                            )
                                        } />
                                </div>
                            </div>
                            <div className='grid-col-6 pb-2'>
                                <Label style={{ color: '#03104A' }} htmlFor='calle2' className='font-bold' value='Calle 2' />
                                <TextInput style={{ backgroundColor: '#E6ECF1' }}
                                    type='text'
                                    title="calle2"
                                    id='calle2'
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
                                    type='text'
                                    title="calle3"
                                    id='calle3'
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

                    <hr />

                    <div className='flex justify-center space-x-4 mt-6'>
                        <Link to={'/medicos'} > <Button color="failure" style={{ outline: 'none', boxShadow: 'none' }}>Cancelar</Button> </Link>
                        <Button
                            style={{ backgroundColor: '#03257A', color: '#fff' }}
                            className=''
                            type='submit'
                            form='doctorForm'
                            color='succes'>
                            Guardar
                        </Button>
                    </div>

                </form>
            </div>
        </>
    )
}

export default EditMedical