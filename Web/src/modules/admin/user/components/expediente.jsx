import { Button, Label, Modal, Select, TextInput, Datepicker } from 'flowbite-react'
import { confimAlert, customAlert } from '../../../../config/alerts/alert';

import { useFormik } from 'formik';
import React from 'react'
import *  as yup from "yup"
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';



const Expediente = () => {

    const location = useLocation();
    const datos = location.state || {};


    console.log(datos)






    const formik = useFormik({
        initialValues: {


            fechapadecimiento: "",
            resultado: "",
            fechatratamiento: "",
            enfermedad: '',
            medico: '',
            expediente: ''

        },
        validationSchema: yup.object().shape({

            fechapadecimiento: yup.string().required('Campo obligatorio'),
            
            resultado: yup.string().required('Campo obligatorio').min(3, 'Mínimo 3 caracteres').max(45, 'Máximo 45 caracteres').matches(/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑ_-]+$/, 'No se permiten caracteres especiales'),
            
            fechatratamiento: yup.string().required('Campo obligatorio'),
            
            enfermedad: yup.string().required('Campo obligatorio').min(3, 'Mínimo 3 caracteres').max(45, 'Máximo 45 caracteres').matches(/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑ_-]+$/, 'No se permiten caracteres especiales'),
            medico: yup.string().required('Campo obligatorio').matches(/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑ]+$/, 'No se permiten caracteres especiales'),
            expediente: yup.string().required('Campo obligatorio').matches(/^[a-zA-Z0-9\s]+$/, 'No se permiten caracteres especiales')


        }),
        onSubmit: async (values, { setSubmitting }) => {
            confimAlert(async () => {
                try {
                    const payload = {
                        "startDate": "2024-03-27",
                        "result": "Reactivo",
                        "disease": "VIH",
                        "medicalRecordBean": {
                            "number": "GCT0002"
                        },
                        "doctorBean": {
                            "card": "12344264123"
                        }


                    };
                    const response = await AxiosClient({
                        method: 'POST',
                        url: '/person/',
                        data: payload
                    });
                    if (!response.error) {
                        customAlert(
                            'Registro exitoso',
                            'El usuario se ha registrado correctamente',
                            'success');
                        getAllUsers();
                        closeModal();
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

                <form id='userForm' name='userForm' style={{ width: '50%', padding: '20px', border: '1px solid #ccc', color: '#03104A', borderRadius: '10px' }} noValidate onSubmit={formik.handleSubmit}>

                    <div className='flex flex-col gap-3' >

                        <h3 className='font-bold text-2xl text-center'>Diagnostico</h3>

                        <div className='flex flex-col gap-2 pb-2'>


                        </div>

                        <div className='w-full grid flex-col justify-center items-center'>

                            <h4 className='text-center mb-5'>¿Lleva algún seguimiento de estas enfermedades?</h4>
                            <div className='grid-col-7'>
                                <Label htmlFor='enfermedad' className='font-bold' value='Enfermedad' />
                                <TextInput style={{ backgroundColor: '#E6ECF1' }} type="text" placeholder="Enfermedad" id="enfermedad" name="enfermedad"
                                    value={formik.values.enfermedad}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    helperText={
                                        formik.touched.enfermedad &&
                                        formik.errors.enfermedad && (
                                            <span className='text-red-600'>{formik.errors.enfermedad}</span>
                                        )
                                    }
                                />
                            </div>

                            <div className='grid-col-7'>
                                <Label htmlFor='expediente' className='font-bold' value='Expediente' />
                                <TextInput style={{ backgroundColor: '#E6ECF1' }} type="text" placeholder="Expediente" id="expediente" name="expediente"
                                    value={formik.values.expediente}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    helperText={
                                        formik.touched.expediente &&
                                        formik.errors.expediente && (
                                            <span className='text-red-600'>{formik.errors.expediente}</span>
                                        )
                                    }
                                />
                            </div>
                            <div className='grid-col-7  mb-5'>
                                <Label htmlFor='medico' className='font-bold ' value='Médico' />
                                <Select style={{ backgroundColor: '#E6ECF1' }} id="medico" name="medico" value={formik.values.medico} onChange={formik.handleChange}>
                                    <option value=''>Seleccionar</option>
                                    <option value='Hombre'>Joel</option>
                                    <option value='Mujer'>Emi</option>
                                </Select>
                            </div>


                            <div className='w-full flex flex-row justify-center items-center '>


                                <div className='w-full flex-col gap-3 justify-center items-center'>
                                    <div className='mb-6'>
                                        <Label
                                            style={{ color: '#03104A', textAlign: 'center', }}
                                            htmlFor='fechapadecimiento'
                                            className='font-bold'
                                            value='Fecha de padecimiento'
                                        />
                                    </div>
                                    <div className=' mb-6'>
                                        <Label
                                            style={{ color: '#03104A' }}
                                            htmlFor='resultado'
                                            className='font-bold'
                                            value='Resultado'
                                        />
                                    </div>



                                </div>

                                <div className='w-full flex-col'>
                                    <div className='mb-2'>
                                        <TextInput
                                            style={{ backgroundColor: '#E6ECF1', width: '150px' }}
                                            type='date'
                                            placeholder=''
                                            id='fechapadecimiento'
                                            name='fechapadecimiento'
                                            value={formik.values.fechapadecimiento}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            helperText={
                                                formik.touched.fechapadecimiento &&
                                                formik.errors.fechapadecimiento && (
                                                    <span className='text-red-600 flex flex-col'>
                                                        {formik.errors.fechapadecimiento}
                                                    </span>
                                                )
                                            }
                                        />
                                    </div>

                                    <div className='mb-2'>
                                        <Select style={{ backgroundColor: '#E6ECF1', width: '150px   ' }} id="resultado" name="resultado" value={formik.values.resultado} onChange={formik.handleChange}>
                                            <option value=''>Seleccionar</option>
                                            <option value='Hombre'>Reactivo</option>
                                            <option value='Mujer'>No reactivo</option>
                                        </Select>
                                    </div>


                                </div>

                            </div>
                        </div>




                        <div className='flex justify-end space-x-4 mt-6'>


                            <Link to={'/pacientes'} > <Button color="failure" style={{ outline: 'none', boxShadow: 'none' }}>Cancelar</Button> </Link>

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


                    </div>
                </form>
            </div>
        </>
    )
}

export default Expediente