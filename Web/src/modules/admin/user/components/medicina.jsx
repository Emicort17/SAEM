import { Button, Label, Modal, Select, TextInput, Datepicker } from 'flowbite-react'
import { confimAlert, customAlert } from '../../../../config/alerts/alert';

import { useFormik } from 'formik';
import React from 'react'
import *  as yup from "yup"
import { Link } from 'react-router-dom';
import Switch from '@mui/material/Switch';
import AxiosClient from '../../../../config/http-client/axios-client';
import { useLocation, useNavigate } from 'react-router-dom';



const Medicina = () => {

    const location = useLocation();
    const datos = location.state || {};
    const navigate = useNavigate();


    const formik = useFormik({
        initialValues: {

            name: '',
            presentation: '',
            manufacturer: '',


        },
        validationSchema: yup.object().shape({
            name: yup.string().required('Campo obligatorio').min(3, 'Minimo 3 caracteres').max(45, 'Maximo 45 caracteres').matches(/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑ_-]+$/, 'No se permiten caracteres especiales'),
            presentation: yup.string().required('Campo obligatorio').min(3, 'Minimo 3 caracteres').max(45, 'Maximo 45 caracteres').matches(/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚ_-]+$/, 'No se permiten caracteres especiales'),
            manufacturer: yup.string().required('Campo obligatorio').min(3, 'Minimo 3 caracteres').max(45, 'Maximo 45 caracteres').matches(/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑ_-]+$/, 'No se permiten caracteres especiales'),

        }),
        onSubmit: async () => {
            confimAlert(async () => {
                try {
                    const payload = {
                        name: formik.values.name,
                        presentation: formik.values.presentation,
                        manufacturer: formik.values.manufacturer,


                    };
                    const response = await AxiosClient({
                        url: '/medicine/save',
                        method: 'POST',
                        data: payload,

                    });
                    if (!response.error) {
                        customAlert(
                            'Datos guardados',
                            'Los datos se guardaron correctamente',
                            'success');
                    }

                    navigate('/medicina');


                } catch (error) {
                    customAlert(
                        'Ocurrio un error',
                        'Error al guardar los datos',
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

                <form id='medicineForm' name='medicineForm' style={{ width: '50%', padding: '20px', border: '1px solid #ccc', color: '#03104A', borderRadius: '10px' }} noValidate onSubmit={formik.handleSubmit}>

                    <div className='flex flex-col gap-3' >

                        <h3 className='font-bold text-2xl text-center'>Medicina</h3>

                        <div className='flex flex-col gap-2 pb-2'>

                            <div className='grid-col-4 pb-2'>
                                <Label style={{ color: '#03104A' }} htmlFor='name' className='font-bold' value='Medicina' />
                                <TextInput style={{ backgroundColor: '#E6ECF1' }} type="text" placeholder="Nombre" id="name" name="name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    helperText={
                                        formik.touched.name &&
                                        formik.errors.name && (
                                            <span className='text-red-600'>{formik.errors.name}</span>
                                        )
                                        
                                    }
                                />
                            </div>
                            <div className='grid-col-4 pb-2'>
                                <Label style={{ color: '#03104A' }} htmlFor='presentation' className='font-bold' value='Presentación' />
                                <TextInput style={{ backgroundColor: '#E6ECF1' }} type="text" placeholder="Presentación " id="presentation" name="presentation"
                                    value={formik.values.presentation}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    helperText={
                                        formik.touched.presentation &&
                                        formik.errors.presentation && (
                                            <span className='text-red-600'>{formik.errors.presentation}</span>
                                        )
                                    } />
                            </div>
                            <div className='grid-col-4 pb-2'>
                                <Label style={{ color: '#03104A' }} htmlFor='manufacturer' className='font-bold' value='Fabricante' />
                                <TextInput style={{ backgroundColor: '#E6ECF1' }} type="text" placeholder="Fabricante " id="manufacturer" name="manufacturer"
                                    value={formik.values.manufacturer}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    helperText={
                                        formik.touched.manufacturer &&
                                        formik.errors.manufacturer && (
                                            <span className='text-red-600'>{formik.errors.manufacturer}</span>
                                        )
                                    } />
                            </div>
                        </div>





                        <div className='flex justify-end space-x-4 mt-6'>

                            <Link to={'/medicina'} > <Button color="failure" style={{ outline: 'none', boxShadow: 'none' }}>Cancelar</Button> </Link>

                            <Button
                                style={{ backgroundColor: '#03257A', color: '#fff' }}
                                className=''
                                type='submit'
                                form='medicineForm'
                                disabled={formik.isSubmitting || !formik.isValid}
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

export default Medicina