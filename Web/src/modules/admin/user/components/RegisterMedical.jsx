import { Button, Label, Select, TextInput, } from 'flowbite-react'
import { confimAlert, customAlert } from '../../../../config/alerts/alert';
import AxiosClient from '../../../../config/http-client/axios-client';

import { useFormik } from 'formik';
import *  as yup from "yup"
import { Link } from 'react-router-dom';
import * as React from 'react';



const RegisterMedical = () => {

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            confirmPassword: "",
            name: "",
            cedula: "",
            surname: "",
            lastname: "",
            curp: "",
            birthdate: "",
            phoneNumber: "",
            state: "",
            municipio: "",
            cp: "",
            sexo: "",
            calle: "",
            calle2: "",
            calle3: "",
            birthplace: "",
            interiorNumber: "",
            exteriorNumber: "",


        },

        validationSchema: yup.object().shape({

            email: yup.string().required('Campo obligatorio').email('Ingresa un correo electrónico válido').min(10, 'Mínimo 10 caracteres').max(45, 'Máximo 45 caracteres'),
            password: yup.string().required('Campo obligatorio').min(8, 'Mínimo 8 caracteres').max(45, 'Máximo 45 caracteres').matches(/^[a-zA-Z0-9\s]+$/, 'No se permiten caracteres especiales'),
            confirmPassword: yup.string().required('Campo obligatorio').min(8, 'Mínimo 8 caracteres').max(45, 'Máximo 45 caracteres').matches(/^[a-zA-Z0-9\s]+$/, 'No se permiten caracteres especiales').test("password-matches", "Las contraseñas no coinciden", function (value) { return value === this.parent.password }),
            name: yup.string().required('Campo obligatorio').min(3, 'Mínimo 3 caracteres').max(45, 'Máximo 45 caracteres').matches(/^[a-zA-Z0-9\s]+$/, 'No se permiten caracteres especiales'),
            surname: yup.string().required('Campo obligatorio').min(3, 'Mínimo 3 caracteres').max(45, 'Máximo 45 caracteres').matches(/^[a-zA-Z0-9\s]+$/, 'No se permiten caracteres especiales'),
            lastname: yup.string().min(3, 'Mínimo 3 caracteres').max(45, 'Máximo 45 caracteres').matches(/^[a-zA-Z0-9\s]+$/, 'No se permiten caracteres especiales'),
            curp: yup.string().required('Campo obligatorio').min(18, 'Mínimo 18 caracteres').max(18, 'Máximo 18 caracteres').matches(/^[a-zA-Z0-9\s]+$/, 'No se permiten caracteres especiales'),
            phoneNumber: yup.string().required('Campo obligatorio').matches(/^\d{10}$/, 'El número de teléfono debe tener 10 dígitos'),
            birthdate: yup.string().required('Campo obligatorio'),
            state: yup.string().required('Campo obligatorio').min(3, 'Mínimo 3 caracteres').max(45, 'Máximo 45 caracteres').matches(/^[a-zA-Z0-9\s]+$/, 'No se permiten caracteres especiales'),
            municipio: yup.string().required('Campo obligatorio').min(3, 'Mínimo 3 caracteres').max(45, 'Máximo 45 caracteres').matches(/^[a-zA-Z0-9\s]+$/, 'No se permiten caracteres especiales'),
            birthplace: yup.string().required('Campo obligatorio').min(3, 'Mínimo 3 caracteres').max(45, 'Máximo 45 caracteres').matches(/^[a-zA-Z0-9\s]+$/, 'No se permiten caracteres especiales'),
            interiorNumber: yup.string().required('Campo obligatorio').min(2, 'Mínimo 2 caracteres').max(5, 'Máximo 5 caracteres').matches(/^[a-zA-Z0-9\s]+$/, 'No se permiten caracteres especiales'),
            exteriorNumber: yup.string().required('Campo obligatorio').min(2, 'Mínimo 2 caracteres').max(5, 'Máximo 5 caracteres').matches(/^[a-zA-Z0-9\s]+$/, 'No se permiten caracteres especiales'),
            cp: yup.string().required('Campo obligatorio').min(5, 'Mínimo 5 caracteres').max(5, 'Máximo 5 caracteres').matches(/^[a-zA-Z0-9\s]+$/, 'No se permiten caracteres especiales'),
            sexo: yup.string().required('Campo obligatorio').matches(/^[a-zA-Z0-9\s]+$/, 'No se permiten caracteres especiales'),
            calle: yup.string().required('Campo obligatorio').min(3, 'Mínimo 3 caracteres').max(45, 'Máximo 45 caracteres').matches(/^[a-zA-Z0-9\s]+$/, 'No se permiten caracteres especiales'),
            cedula: yup.string().required('Campo obligatorio').min(7, 'Mínimo 7 caracteres').max(7, 'Máximo 7 caracteres').matches(/^[a-zA-Z0-9\s]+$/, 'No se permiten caracteres especiales')

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
                        url: '/doctor/save',
                        method: 'POST',
                        data: payload,

                    });
                    if (!response.error) {
                        customAlert(
                            'Registro exitoso',
                            'El usuario se ha registrado correctamente',
                            'success');
                    }
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

            <div style={{ display: 'flex', justifyContent: 'center', width: '100%', padding: '50px', color: '#03104A', }}>

                <form id='doctorForm' name='doctorForm' style={{ width: '50%', padding: '20px', border: '1px solid #ccc', color: '#03104A', borderRadius: '10px' }} noValidate onSubmit={formik.handleSubmit}>

                    <div className='flex flex-col gap-3' >

                        <h3 className='font-bold text-2xl text-center'>Medicos</h3>

                        <div className='flex flex-col gap-2 pb-2'>
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
                        </div>

                        <div className=' gap-2 pb-2'>

                            <div className='grid-col-6 pb-2' >
                                <Label style={{ color: '#03104A' }} htmlFor='curp' className='font-bold' value='CURP' />
                                <TextInput style={{ backgroundColor: '#E6ECF1' }} type='text' placeholder="CURP" id="curp"
                                    value={formik.values.curp}
                                    onChange={formik.handleChange}
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
                                <Label style={{ color: '#03104A' }} htmlFor='cedula' className='font-bold' value='Cedula' />
                                <TextInput style={{ backgroundColor: '#E6ECF1' }} type='text' placeholder="Cedula" id="cedula"
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
                            <div className='flex flex-row justify-between'>
                                <div className='grid-col-6 pb-2'>
                                    <Label style={{ color: '#03104A' }} htmlFor='interiorNumber' className='font-bold' value='Numero Interior' />
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
                                    <Label style={{ color: '#03104A' }} htmlFor='exteriorNumber' className='font-bold' value='Numero exterior' />
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

                            <div className=' pb-2'>

                                <Label style={{ color: '#03104A' }} htmlFor='email' className='font-bold' value='Correo' />
                                <TextInput style={{ backgroundColor: '#E6ECF1' }} type="text" placeholder="Correo" id="email"
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
                                    <Label style={{ color: '#03104A' }} htmlFor='password' className='font-bold' value='Contraseña' />
                                    <TextInput style={{ backgroundColor: '#E6ECF1' }} type='password' placeholder="************" id="password"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        helperText={
                                            formik.touched.password &&
                                            formik.errors.password && (
                                                <span className="text-red-600">{formik.errors.password}</span>
                                            )
                                        } />
                                </div>

                                <div className='pb-2'>
                                    <Label style={{ color: '#03104A' }} htmlFor='confirmPassword' className='font-bold' value='Confirmar contraseña' />
                                    <TextInput style={{ backgroundColor: '#E6ECF1' }} type='password' placeholder="************" id="confirmPassword"
                                        value={formik.values.confirmPassword}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        helperText={
                                            formik.touched.confirmPassword &&
                                            formik.errors.confirmPassword && (
                                                <span className="text-red-600">{formik.errors.confirmPassword}</span>
                                            )
                                        } />
                                </div>

                            </div>

                        </div>

                        <div className='flex justify-end space-x-4 mt-6'>
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
                    </div>
                </form>
            </div>
        </>
    )
}

export default RegisterMedical