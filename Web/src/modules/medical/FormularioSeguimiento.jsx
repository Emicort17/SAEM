import { Button, Label, Modal, Select, TextInput, Textarea, Datepicker } from 'flowbite-react'
import { confimAlert, customAlert } from '../../config/alerts/alert';

import { useFormik } from 'formik';
import *  as yup from "yup"
import { Link } from 'react-router-dom';
import React, { useMemo, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import AxiosClient from '../../config/http-client/axios-client';
import { TiDelete } from "react-icons/ti";



const FormularioSeguimiento = () => {
    const location = useLocation();
    const datos = location.state || {};

    const [medicamento, setMedicamento] = useState([]);


    const [selectedMedicamentos, setSelectedMedicamentos] = useState([]);

    const handleChangeMedicine = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
        // Verificar si el medicamento ya está en la lista selectedMedicamentos
        const filteredOptions = selectedOptions.filter(option => !selectedMedicamentos.includes(option));
        setSelectedMedicamentos([...selectedMedicamentos, ...filteredOptions]); // Agregar solo los medicamentos no presentes en la lista
        formik.handleChange(event);
    };
    const handleRemoveMedicine = (medicineToRemove) => {
        const updatedMedicamentos = selectedMedicamentos.filter(medicine => medicine !== medicineToRemove);
        setSelectedMedicamentos(updatedMedicamentos);
    };


    const selectedMedicineIds = selectedMedicamentos;

    const medicineBeanSet = selectedMedicineIds.map(id => {
        const med = medicamento.find(m => m.id.toString() === id); // Asegúrate de que los tipos coincidan
        if (!med) {
            console.error(`Medicamento con ID ${id} no encontrado.`);
            return null; // O maneja este caso como consideres apropiado
        } else {
            return {

                name: med.name,
                manufacturer: med.manufacturer,

            };
        }

    }).filter(Boolean); // Filtra los elementos nulos que se agregaron debido a IDs no encontrados


    const hoy = new Date();

    const formik = useFormik({
        initialValues: {
            enfermedad: "",
            fecha: hoy.toISOString().substr(0, 10),
            card: datos.datocard,
            number: datos.data.medicalRecordBean.number,
            resultado: "",
            medicina: "",
            cargaviral: "",
            ast: "",
            plaquetas: "",
            fecharesultado: "",
            creatinina: "",
            alt: "",
            antigen: "",
            indicaciones: "",


        },
        validationSchema: yup.object().shape({
            enfermedad: yup.string().required('Campo obligatorio').min(3, 'Mínimo 3 caracteres').max(45, 'Máximo 45 caracteres').matches(/^[a-zA-Z0-9\s]+$/, 'No se permiten caracteres especiales'),
            fecha: yup.string().required('Campo obligatorio'),
            resultado: yup.string().required('Campo obligatorio'),
            cargaviral: yup.string().required('Campo obligatorio').matches(/^[a-zA-Z0-9\s]+$/, 'No se permiten caracteres especiales'),
            ast: yup.string().required('Campo obligatorio').matches(/^[a-zA-Z0-9\s]+$/, 'No se permiten caracteres especiales'),
            plaquetas: yup.string().required('Campo obligatorio').matches(/^[a-zA-Z0-9\s]+$/, 'No se permiten caracteres especiales'),
            fecharesultado: yup.string().required('Campo obligatorio'),
            creatinina: yup.string().required('Campo obligatorio').matches(/^[a-zA-Z0-9\s]+$/, 'No se permiten caracteres especiales'),
            alt: yup.string().required('Campo obligatorio').matches(/^[a-zA-Z0-9\s]+$/, 'No se permiten caracteres especiales'),
            antigen: yup.string().required('Campo obligatorio'),
            indicaciones: yup.string().required('Campo obligatorio').min(3, 'Mínimo 3 caracteres').max(255, 'Máximo 255 caracteres').matches(/^[a-zA-Z0-9\s]+$/, 'No se permiten caracteres especiales'),
            medicina: yup.string().required('Campo obligatorio').min(3, 'Mínimo 3 caracteres').min(1, 'Seleccionar al menos un medicamento es obligatorio'),

        }),
        onSubmit: async () => {
            confimAlert(async () => {
                try {

                    console.log(medicineBeanSet + 'hola');

                    const diagnostico = {

                        startDate: formik.values.fecha,
                        result: formik.values.resultado,
                        disease: formik.values.enfermedad,
                        medicalRecordBean: {
                            number: formik.values.number,
                        },
                        doctorBean: {
                            card: formik.values.card
                        },
                    };
                    const response = await AxiosClient({
                        method: 'POST',
                        url: '/diagnostic/save',
                        data: diagnostico
                    });

                    console.log(JSON.stringify(response));
                    if (!response.error) {
                        try {

                            console.log('se guardo el diagnostico')

                            const treatment = {
                                treatDate: formik.values.fecha,
                                indications: formik.values.indicaciones,
                                diagnosticBean: {
                                    id: response.data.id,
                                },
                                medicineBeanSet: medicineBeanSet

                            };

                            const responseTratment = await AxiosClient({
                                method: 'POST',
                                url: '/treatment/save',
                                data: treatment
                            });

                            if (!responseTratment.error) {
                                try {
                                    console.log('se guardo el tratamiento')

                                    const results = {
                                        resultDate: formik.values.fecha,
                                        diagnosticBean: {
                                            id: response.data.id,
                                        },
                                        labDataBean: {
                                            alt: formik.values.alt,
                                            antigen: formik.values.antigen,
                                            ast: formik.values.ast,
                                            creatinine: formik.values.creatinina,
                                            platelets: formik.values.plaquetas,
                                            viralLoad: formik.values.cargaviral
                                        }

                                    };
                                    const responseResults = await AxiosClient({
                                        method: 'POST',
                                        url: '/result/save',
                                        data: results
                                    });

                                    if (!responseResults.error) {

                                        customAlert(
                                            'Registro exitoso',
                                            'El usuario se ha registrado correctamente',
                                            'success');

                                    } else {
                                        customAlert(
                                            'Ocurrio un error',
                                            'Error al registrar los resultados del laboratorio',
                                            'error')
                                    }


                                } catch (error) {
                                    console.log(error);
                                }


                            } else {
                                customAlert(
                                    'Ocurrio un error',
                                    'Error al registrar el tratamiento',
                                    'error')
                            }
                        } catch (error) {
                            console.log(error);
                        }


                    } else {
                        customAlert(
                            'Ocurrio un error',
                            'Error al registrar diagnostico',
                            'error')
                    }
                } catch (error) {
                    customAlert(
                        'Ocurrio un error',
                        'Error al registrar usuario',
                        'error')
                    console.log(error);
                }
            });
        }
    })


    const getMedicamento = async () => {
        try {
            const response = await AxiosClient({
                url: "/medicine/findAll",
                method: 'GET',
            });
            console.log(response);
            if (!response.error) setMedicamento(response.data);
        } catch (error) {
            console.log(error);
        }

    };


    useEffect(() => {
        getMedicamento()
    }, []);


    return (
        <>

            <div style={{ display: 'flex', justifyContent: 'center', width: '100%', padding: '50px', color: '#03104A', }}>

                <form id='userForm' name='userForm' style={{ width: '50%', padding: '20px', border: '1px solid #ccc', color: '#03104A', borderRadius: '10px' }} noValidate onSubmit={formik.handleSubmit}>

                    <div className='flex flex-col gap-3' >

                        <h3 className='font-bold text-2xl text-center'>Diagnostico</h3>

                        <div className='flex flex-col gap-2 pb-1'>

                            <div className='flex flex-row'>
                                <div className='w-full md:w-1/2 ml-2'>
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

                                <div className='w-full md:w-1/2 ml-3 '>
                                    <Label style={{ color: '#03104A' }} htmlFor='fecha' className='font-bold ' value='Fecha' disabled />
                                    <div className='mb-2'>
                                        <TextInput
                                            style={{ backgroundColor: '#E6ECF1' }}
                                            disabled
                                            type='date'
                                            placeholder=''
                                            id='fecha'
                                            name='fecha'
                                            value={formik.values.fecha}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className='disabled'
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




                            <div className="flex flex-row">

                                <div className='w-full md:w-1/2 ml-2'>
                                    <Label style={{ color: '#03104A' }} htmlFor='resultado' className='font-bold' value='Resultado' />
                                    <div className='grid-col-7'>
                                        <Select
                                            style={{ backgroundColor: '#E6ECF1' }}
                                            id="resultado"
                                            name="resultado"
                                            value={formik.values.resultado}
                                            onChange={e => {
                                                formik.handleChange(e);
                                                formik.setFieldTouched('resultado', true, false); // Marca el campo como tocado
                                            }}
                                        >
                                            <option value='' disabled>Seleccionar</option>
                                            <option value='Reactivo'>Reactivo</option>
                                            <option value='No reactivo'>No reactivo</option>
                                        </Select>

                                        {formik.touched.resultado && formik.errors.resultado && (
                                            <div className='text-red-600 flex flex-col'>
                                                {formik.errors.resultado}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className='w-full md:w-1/2 ml-2'>
                                    <div className=''>
                                        <Label style={{ color: '#03104A' }} htmlFor='fecharesultado' className='font-bold' value='Fecha de resultados' />
                                        <div className='mb-2'>
                                            <TextInput
                                                style={{ backgroundColor: '#E6ECF1', }}
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
                                </div>



                            </div>


                        </div>

                        <div className=' mt-0 gap-2 pb-2'>

                            <div className='flex flex-row pb-2'>

                                <div className='grid-col-6 pb-2 mr-2  w-full md:w-1/4'>
                                    <Label style={{ color: '#03104A' }} htmlFor='cargaviral' className='font-bold' value='Carga viral' />
                                    <TextInput style={{ backgroundColor: '#E6ECF1' }} type='number' placeholder="" id="cargaviral" name="cargaviral"
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
                                        type='number'
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
                                        type='number'
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



                            </div>






                            <div className='flex flex-row'>

                                <div className='grid-col-6 pb-2 w-full md:w-1/3 mr-2'>
                                    <Label style={{ color: '#03104A' }} htmlFor='creatinina' className='font-bold' value='Creatinina' />
                                    <TextInput style={{ backgroundColor: '#E6ECF1' }}
                                        type='number'
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
                                        type='number'
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
                                    <Label style={{ color: '#03104A' }} htmlFor='antigen' className='font-bold' value='Antigeno' />
                                    <div className='grid-col-7'>
                                        <Select style={{ backgroundColor: '#E6ECF1' }} id="antigen" name="antigen" value={formik.values.antigen} onChange={e => {
                                            formik.handleChange(e);
                                            formik.setFieldTouched('resultado', true, false); // Marca el campo como tocado
                                        }} >
                                            <option value='' disabled >Seleccionar</option>
                                            <option value='Positivo'>Positivo</option>
                                            <option value='Negativo'>Negativo</option>
                                        </Select>
                                        {formik.touched.resultado && formik.errors.resultado && (
                                            <div className='text-red-600 flex flex-col'>
                                                {formik.errors.resultado}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>


                            <div className='flex flex-row'>

                                <div className='grid-col-6 pb-2 w-full md:w-1/3 ml-2 mr-2'>
                                    <Label htmlFor='medicina' className='font-bold' value='Medicamento' />
                                    <Select
                                        style={{ backgroundColor: '#E6ECF1' }}
                                        id="medicina"
                                        name="medicina"
                                        value={formik.values.medicina}
                                        onChange={(event) => {
                                            // Llama primero a tu manejador personalizado
                                            handleChangeMedicine(event);
                                            // Luego asegúrate de que Formik también maneje el cambio
                                            formik.handleChange(event);
                                            // Opcionalmente, marca el campo como tocado si necesitas validación en tiempo real
                                            formik.setFieldTouched('medicina', true, false);
                                        }}
                                    >
                                        <option value=''>Seleccionar</option>
                                        {medicamento.map((med) => (
                                            <option key={med.id} value={med.id}>
                                                {med.name} - {med.presentation} - {med.manufacturer}
                                            </option>
                                        ))}
                                    </Select>
                                    {/* Muestra el mensaje de error para medicina aquí, si es necesario */}
                                    {formik.touched.medicina && formik.errors.medicina && (
                                        <div className='text-red-600'>
                                            {formik.errors.medicina}
                                        </div>
                                    )}
                                </div>

                                {/* Mostrar medicamentos seleccionados */}
                                <div className='grid-col-6 pb-2 w-full md:w-1/3 ml-2 mr-2'>
                                    <h4>Medicamentos seleccionados:</h4>
                                    <ul className='w-full flex flex-col justify-center'>
                                        {selectedMedicamentos.map((selectedId) => {
                                            // Encuentra el medicamento correspondiente por ID
                                            const med = medicamento.find(m => m.id.toString() === selectedId);
                                            return (
                                                <li className='mt-1 ml-3' key={selectedId}>
                                                    {med ? `${med.name} - ${med.presentation}` : 'Medicamento no encontrado'}
                                                    <button style={{ marginRight: '10px' }} onClick={() => handleRemoveMedicine(selectedId)}> <TiDelete /></button>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>


                            </div>

                            <div className=' pb-2'>

                                <Label style={{ color: '#03104A' }} htmlFor='indicaciones' className='font-bold' value='Indicaciones' />
                                <Textarea style={{ backgroundColor: '#E6ECF1' }} type="text" placeholder="" id="indicaciones" name="indicaciones"
                                    value={formik.values.indicaciones}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}

                                    helperText={
                                        formik.touched.indicaciones &&
                                        formik.errors.indicaciones && (
                                            <span className="text-red-600">{formik.errors.indicaciones}</span>
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