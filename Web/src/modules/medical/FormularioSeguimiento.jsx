import { Button, Label, Modal, Select, TextInput, Datepicker } from 'flowbite-react'
import { confimAlert, customAlert } from '../../config/alerts/alert';

import { useFormik } from 'formik';
import *  as yup from "yup"
import { Link } from 'react-router-dom';
import * as React from 'react';
//import Switch from '@mui/material/Switch';



const FormularioSeguimiento = ({ isCreating, setIsCreating, getAllUsers }) => {


    const [checked, setChecked] = React.useState(false);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    const formik = useFormik({
        initialValues: {
            enfermedad: "",
            fecha: "",
            resultado: "",
            fechatomaconfirmatoria: '',
            fecharesultados: "",
            cargaviral: "",
            ast: "",
            plaquetas: "",
            antirretroviral: "",
            tomaconfirmatoria: "",
            fecharesultado: "",
            creatinina: "",
            alt: "",
            antigenosuperfoicievhb: "",
            fechainiciotratamiento: "",
            resultadocargaviral: "",


        },
        validationSchema: yup.object().shape({
            enfermedad: yup.string().required('Campo obligatorio').min(3, 'Mínimo 3 caracteres').max(45, 'Máximo 45 caracteres'),
            fecha: yup.string().required('Campo obligatorio'),
            resultado: yup.string().required('Campo obligatorio').min(8, 'Mínimo 8 caracteres').max(45, 'Máximo 45 caracteres'),
            fechatomaconfirmatoria: yup.string().required('Campo obligatorio'),
            fecharesultados: yup.string().required('Campo obligatorio'),
            cargaviral: yup.string().required('Campo obligatorio'),
            ast: yup.string().required('Campo obligatorio'),
            plaquetas: yup.string().required('Campo obligatorio'),
            antirretroviral: yup.string().required('Campo obligatorio'),
            tomaconfirmatoria: yup.string().required('Campo obligatorio'),
            fecharesultado: yup.string().required('Campo obligatorio'),
            creatinina: yup.string().required('Campo obligatorio'),
            alt: yup.string().required('Campo obligatorio'),
            antigenosuperfoicievhb: yup.string().required('Campo obligatorio'),
            fechainiciotratamiento: yup.string().required('Campo obligatorio'),
            resultadocargaviral: yup.string().required('Campo obligatorio')


        }),
        onSubmit: async (values, { setSubmitting }) => {
            confimAlert(async () => {
                try {
                    const payload = {
                        ...values,

                        birthDate: values.birthdate,

                        personBean: {
                            name: values.name,
                            middleName: values.middleName,
                            lastName: values.lastname,
                            birthdate: values.birthdate,
                            birthplace: values.birthplace,
                            curp: values.curp,
                            phoneNumber: values.phoneNumber,
                            sex: values.sex,
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

                        <h3 className='font-bold text-2xl text-center'>Seguimiento</h3>

                        <div className='flex flex-col gap-2 pb-1'>

                            <div className='flex flex-row'>
                                <div className='w-full md:w-1/2 mr-3'>
                                    <Label style={{ color: '#03104A' }} htmlFor='enfermedad' className='font-bold' value='Enfermedad' />
                                    <TextInput style={{ backgroundColor: '#E6ECF1' }} type="text" placeholder="" id="enfermedad" name="enfermedad"
                                        value={formik.values.enfermedad}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        helperText={
                                            formik.touched.enfermedad &&
                                            formik.errors.enfermedad && (
                                                <span className="text-red-600">{formik.errors.enfermedad}</span>
                                            )
                                        } />
                                </div>

                                <div className='w-full md:w-1/2 ml-3'>
                                    <Label style={{ color: '#03104A' }} htmlFor='fecha' className='font-bold' value='Fecha' />
                                    <div className='mb-2'>
                                        <TextInput
                                            style={{ backgroundColor: '#E6ECF1' }}
                                            type='date'
                                            placeholder=''
                                            id='fecha'
                                            name='fecha'
                                            value={formik.values.fecha}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            helperText={
                                                formik.touched.fecha &&
                                                formik.errors.fecha && (
                                                    <span className='text-red-600 flex flex-col'>
                                                        {formik.errors.fecha}
                                                    </span>
                                                )
                                            }
                                        />
                                    </div>
                                </div>

                            </div>


                            <div className='grid-col-4 pb-2'>
                                <Label style={{ color: '#03104A' }} htmlFor='resultado' className='font-bold' value='Resultado' />
                                <TextInput style={{ backgroundColor: '#E6ECF1' }} type="text" placeholder="" id="resultado" name="resultado"
                                    value={formik.values.resultado}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    helperText={
                                        formik.touched.resultado &&
                                        formik.errors.resultado && (
                                            <span className='text-red-600'>{formik.errors.resultado}</span>
                                        )
                                    }
                                />
                            </div>

                            <div className="flex flex-row">
                                <div className='w-full md:w-1/2 mr-2'>
                                    <div className=''>
                                        <Label style={{ color: '#03104A' }} htmlFor='fechatomaconfirmatoria' className='font-bold' value='Fecha de toma confirmatoria' />
                                        <div className='mb-2'>
                                            <TextInput
                                                style={{ backgroundColor: '#E6ECF1' }}
                                                type='date'
                                                placeholder=''
                                                id='fechatomaconfirmatoria'
                                                name='fechatomaconfirmatoria'
                                                value={formik.values.fechatomaconfirmatoria}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                helperText={
                                                    formik.touched.fechatomaconfirmatoria &&
                                                    formik.errors.fechatomaconfirmatoria && (
                                                        <span className='text-red-600 flex flex-col'>
                                                            {formik.errors.fechatomaconfirmatoria}
                                                        </span>
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className='w-full md:w-1/2 ml-2'>
                                    <div className=''>
                                        <Label style={{ color: '#03104A' }} htmlFor='fecharesultados' className='font-bold' value='Fecha de resultados' />
                                        <div className='mb-2'>
                                            <TextInput
                                                style={{ backgroundColor: '#E6ECF1', }}
                                                type='date'
                                                placeholder=''
                                                id='fecharesultados'
                                                name='fecharesultados'
                                                value={formik.values.fecharesultados}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                helperText={
                                                    formik.touched.fecharesultados &&
                                                    formik.errors.fecharesultados && (
                                                        <span className='text-red-600 flex flex-col'>
                                                            {formik.errors.fecharesultados}
                                                        </span>
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>

                        <div className=' mt-0 gap-2 pb-2'>

                            <div className='flex flex-row pb-2'>

                                <div className='grid-col-6 pb-2 mr-2  w-full md:w-1/4'>
                                    <Label style={{ color: '#03104A' }} htmlFor='cargaviral' className='font-bold' value='Carga viral' />
                                    <TextInput style={{ backgroundColor: '#E6ECF1' }} type='text' placeholder="" id="cargaviral" name="cargaviral"
                                        value={formik.values.cargaviral}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        helperText={
                                            formik.touched.cargaviral &&
                                            formik.errors.cargaviral && (
                                                <span className='text-red-600'>{formik.errors.cargaviral}</span>
                                            )
                                        }
                                    />
                                </div>
                                <div className='grid-col-6 pb-2 mr-2 ml-2  w-full md:w-1/4'>
                                    <Label style={{ color: '#03104A' }} htmlFor='ast' className='font-bold' value='AST' />
                                    <TextInput style={{ backgroundColor: '#E6ECF1' }}
                                        type='text'
                                        title="ast"
                                        id='ast'
                                        name='ast'
                                        value={formik.values.ast}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        helperText={
                                            formik.touched.ast &&
                                            formik.errors.ast && (
                                                <span className='text-red-600'>{formik.errors.ast}</span>
                                            )
                                        } />
                                </div>


                                <div className=' grid-col-6 pb-2 ml-2 mr-2  w-full md:w-1/4'>
                                    <Label style={{ color: '#03104A' }} htmlFor='plaquetas' className='font-bold' value='Plaquetas' />
                                    <TextInput style={{ backgroundColor: '#E6ECF1' }}
                                        type='text'
                                        title=""
                                        id='plaquetas'
                                        name='plaquetas'
                                        value={formik.values.plaquetas}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        helperText={
                                            formik.touched.plaquetas &&
                                            formik.errors.plaquetas && (
                                                <span className='text-red-600'>{formik.errors.plaquetas}</span>
                                            )
                                        } />
                                </div>
                            


                            <div className='grid-col-6 pb-2 ml-2  w-full md:w-1/4'>
                                <Label style={{ color: '#03104A' }} htmlFor='antirretroviral' className='font-bold' value='Antirretroviral' />
                                <TextInput style={{ backgroundColor: '#E6ECF1' }}
                                    type='text'
                                    title="antirretroviral"
                                    id='antirretroviral'
                                    name='antirretroviral'
                                    value={formik.values.antirretroviral}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    helperText={
                                        formik.touched.antirretroviral &&
                                        formik.errors.antirretroviral && (
                                            <span className='text-red-600'>{formik.errors.antirretroviral}</span>
                                        )
                                    } />
                            </div>
                            </div>

                            <div className='grid-col-6 pb-2'>
                                <Label style={{ color: '#03104A' }} htmlFor='tomaconfirmatoria' className='font-bold' value='2 Toma Confirmatoria' />
                                <TextInput style={{ backgroundColor: '#E6ECF1' }}
                                    type='text'
                                    title="tomaconfirmatoria"
                                    id='tomaconfirmatoria'
                                    name='tomaconfirmatoria'
                                    value={formik.values.tomaconfirmatoria}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    helperText={
                                        formik.touched.tomaconfirmatoria &&
                                        formik.errors.tomaconfirmatoria && (
                                            <span className='text-red-600'>{formik.errors.tomaconfirmatoria}</span>
                                        )
                                    } />
                            </div>

                            <div className='grid-col-6 pb-2'>
                                <Label style={{ color: '#03104A', marginRight: '5x' }} htmlFor='fecharesultado' className='font-bold' value='Fecha de resultado' />
                                <div className='mb-2'>
                                    <TextInput
                                        style={{ backgroundColor: '#E6ECF1', width: '100%' }}
                                        type='date'
                                        placeholder=''
                                        id='fecharesultado'
                                        name='fecharesultado'
                                        value={formik.values.fecharesultado}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        helperText={
                                            formik.touched.fecharesultado &&
                                            formik.errors.fecharesultado && (
                                                <span className='text-red-600 flex flex-col'>
                                                    {formik.errors.fecharesultado}
                                                </span>
                                            )
                                        }
                                    />
                                </div>
                            </div>
                            

                            <div className='flex flex-row'>

                            <div className='grid-col-6 pb-2 w-full md:w-1/3 mr-2'>
                                <Label style={{ color: '#03104A' }} htmlFor='creatinina' className='font-bold' value='Creatinina' />
                                <TextInput style={{ backgroundColor: '#E6ECF1' }}
                                    type='text'
                                    title="creatinina"
                                    id='creatinina'
                                    name='creatinina'
                                    value={formik.values.creatinina}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    helperText={
                                        formik.touched.creatinina &&
                                        formik.errors.creatinina && (
                                            <span className='text-red-600'>{formik.errors.creatinina}</span>
                                        )
                                    } />
                            </div>
                            <div className='grid-col-6 pb-2 w-full md:w-1/3 ml-2 mr-2'>
                                <Label style={{ color: '#03104A' }} htmlFor='alt' className='font-bold' value='ALT' />
                                <TextInput style={{ backgroundColor: '#E6ECF1' }}
                                    type='text'
                                    title="alt"
                                    id='alt'
                                    name='alt'
                                    value={formik.values.alt}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    helperText={
                                        formik.touched.alt &&
                                        formik.errors.alt && (
                                            <span className='text-red-600'>{formik.errors.alt}</span>
                                        )
                                    } />
                            </div>

                            <div className='grid-col-6 pb-2 w-full md:w-1/3 ml-2 mr-2'>
                                <Label style={{ color: '#03104A' }} htmlFor='antigenosuperfoicievhb' className='font-bold' value='Antigeno de superficie VHB' />
                                <TextInput style={{ backgroundColor: '#E6ECF1' }}
                                    type='text'
                                    title=""
                                    id='antigenosuperfoicievhb'
                                    name='antigenosuperfoicievhb'
                                    value={formik.values.antigenosuperfoicievhb}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    helperText={
                                        formik.touched.antigenosuperfoicievhb &&
                                        formik.errors.antigenosuperfoicievhb && (
                                            <span className='text-red-600'>{formik.errors.antigenosuperfoicievhb}</span>
                                        )
                                    } />
                            </div>
                            </div>

                            <div className='grid-col-6 pb-2 '>
                                <Label style={{ color: '#03104A', marginRight: '5x' }} htmlFor='fechainiciotratamiento' className='font-bold' value='Fecha de inicio de tratamiento' />
                                <div className='mb-2'>
                                    <TextInput
                                        style={{ backgroundColor: '#E6ECF1', width: '100%' }}
                                        type='date'
                                        placeholder=''
                                        id='fecharesultado'
                                        name='fecharesultado'
                                        value={formik.values.fecharesultado}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        helperText={
                                            formik.touched.fecharesultado &&
                                            formik.errors.fecharesultado && (
                                                <span className='text-red-600 flex flex-col'>
                                                    {formik.errors.fecharesultado}
                                                </span>
                                            )
                                        }
                                    />
                                </div>
                            </div>




                            <div className=' pb-2'>

                                <Label style={{ color: '#03104A' }} htmlFor='resultadocargaviral' className='font-bold' value='Resultado 2 carga viral' />
                                <TextInput style={{ backgroundColor: '#E6ECF1' }} type="text" placeholder="" id="resultadocargaviral" name="resultadocargaviral"
                                    value={formik.values.resultadocargaviral}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    helperText={
                                        formik.touched.resultadocargaviral &&
                                        formik.errors.resultadocargaviral && (
                                            <span className="text-red-600">{formik.errors.resultadocargaviral}</span>
                                        )
                                    } />


                            </div>



                        </div>






                        <div className='flex flex-wrap justify-end space-x-4 mt-2'>


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

export default FormularioSeguimiento