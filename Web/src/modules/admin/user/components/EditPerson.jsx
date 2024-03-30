import { Button, Label, Modal, Select, TextInput, Datepicker } from 'flowbite-react'
import { confimAlert, customAlert } from '../../../../config/alerts/alert';

import { useFormik } from 'formik';
import React from 'react'
import *  as yup from "yup"
import { Link } from 'react-router-dom';
import Switch from '@mui/material/Switch';



const EditPerson = ({ getUser }) => {



    console.log(getUser)    

    
    const [checked, setChecked] = React.useState(false);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };
        
    const formik = useFormik({
        initialValues: {
            
            email: "",
            password: "",
            confirmPassword: "",
            roles: '',
            name: "",
            surname: "",
            lastname: "",
            curp: "",
            birthdate: "",
            phoneNumber: "",
            state: "",
            municipio: "",
            cp: "",
            sexo: "",
            colonia:'',
            calle: "",
            fechapadecimiento: "",
            resultado: "",
            fechatratamiento: "",

        },
        validationSchema: yup.object().shape({
            email: yup.string().required('Campo obligatorio').email('Ingresa un correo electrónico válido').min(3, 'Mínimo 3 caracteres').max(45, 'Máximo 45 caracteres'),
            password: yup.string().required('Campo obligatorio').min(8, 'Minimo 8 caracteres').max(45, 'Maximo 45 caracteres'),
            confirmPassword: yup.string().required('Campo obligatorio').min(8, 'Minimo 8 caracteres').max(45, 'Maximo 45 caracteres').test("password-matches", "Las contraseñas no coinciden", function (value) { return value === this.parent.password }),
            name: yup.string().required('Campo obligatorio').min(3, 'Minimo 3 caracteres').max(45, 'Maximo 45 caracteres'),
            surname: yup.string().required('Campo obligatorio').min(3, 'Minimo 3 caracteres').max(45, 'Maximo 45 caracteres'),
            lastname: yup.string().min(3, 'Minimo 3 caracteres').max(45, 'Maximo 45 caracteres'),
            curp: yup.string().required('Campo obligatorio').min(3, 'Minimo 18 caracteres').max(18, 'Maximo 18 caracteres'),
            phoneNumber: yup.string().required('Campo obligatorio').matches(/^\d{10}$/, 'El número de teléfono debe tener 10 dígitos'),
            birthdate: yup.string().required('Campo obligatorio'),
            state: yup.string().required('Campo obligatorio').min(3, 'Mínimo 3 caracteres').max(45, 'Máximo 45 caracteres'),
            municipio: yup.string().required('Campo obligatorio').min(3, 'Mínimo 3 caracteres').max(45, 'Máximo 45 caracteres'),
            cp: yup.string().required('Campo obligatorio').min(5, 'Mínimo 5 caracteres').max(5, 'Máximo 5 caracteres'),
            sexo: yup.string().required('Campo obligatorio'),
            colonia: yup.string().required('Campo obligatorio').min(3, 'Mínimo 3 caracteres').max(45, 'Máximo 45 caracteres'),
            calle: yup.string().required('Campo obligatorio').min(3, 'Mínimo 3 caracteres').max(45, 'Máximo 45 caracteres'),
            fechapadecimiento: yup.string().required('Campo obligatorio'),
            resultado: yup.string().required('Campo obligatorio').min(3, 'Mínimo 3 caracteres').max(45, 'Máximo 45 caracteres'),
            fechatratamiento: yup.string().required('Campo obligatorio'),
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

                        <h3 className='font-bold text-2xl text-center'>Paciente</h3>

                        <div className='flex flex-col gap-2 pb-2'>
                        <div className='flex flex-row'>
                                <div className='w-full'>
                                    <Label style={{ color: '#03104A' }} htmlFor='name' className='font-bold' value='Nombre' />
                                    <TextInput style={{ backgroundColor: '#E6ECF1' }} type="text" placeholder="Nombre" id="name" name="name"
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        helperText={
                                            formik.touched.name &&
                                            formik.errors.name && (
                                                <span className="text-red-600">{formik.errors.confirmPassword}</span>
                                            )
                                        } />
                                </div>

                                <div style={{marginRight:'10px'}}  className='w-full flex justify-end items-center'>
                                <Label style={{ color: '#03104A',marginRight:'5x'}} htmlFor='name' className='font-bold' value='Externo' />

                                    <Switch
                                        checked={checked}
                                        onChange={handleChange}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                </div>
                            </div>
                            <div className='grid-col-4 pb-2'>
                                <Label style={{ color: '#03104A' }} htmlFor='surname' className='font-bold' value='Apellido paterno' />
                                <TextInput style={{ backgroundColor: '#E6ECF1' }} type="text" placeholder="Apellido paterno" id="surname" name="surname"
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
                                <TextInput style={{ backgroundColor: '#E6ECF1' }} type="text" placeholder="Apellido materno " id="lastname" name="lastname"
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
                                <TextInput style={{ backgroundColor: '#E6ECF1' }} type='curp' placeholder="CURP" id="curp" name="curp"
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
                                <Label style={{ color: '#03104A' }} htmlFor='birthdate' className='font-bold' value='Fecha de nacimiento' />
                                <TextInput style={{ backgroundColor: '#E6ECF1' }}
                                    type='date'
                                    title="Fecha de nacimiento"
                                    id='birthdate'
                                    name='birthdate'
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
                                <Label htmlFor='roles' className='font-bold' value='Sexo' />
                                <Select style={{ backgroundColor: '#E6ECF1' }} id="role" name="roles" >
                                    <option selected value=''></option>
                                    <option value='Hombre'>Hombre</option>
                                    <option value='Mujer'>Mujer</option>

                                </Select>
                            </div>

                            <div className='grid-col-6 pb-2'>
                                <Label style={{ color: '#03104A' }} htmlFor='state' className='font-bold' value='Estado' />
                                <TextInput style={{ backgroundColor: '#E6ECF1' }}
                                    type='text'
                                    title="state"
                                    id='state'
                                    name='state'
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
                                    name='municipio'
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
                                <Label style={{ color: '#03104A' }} htmlFor='colonia' className='font-bold' value='Colonia' />
                                <TextInput style={{ backgroundColor: '#E6ECF1' }}
                                    type='colonia'
                                    title="colonia"
                                    id='colonia'
                                    name='colonia'
                                    value={formik.values.colonia}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    helperText={
                                        formik.touched.colonia &&
                                        formik.errors.colonia && (
                                            <span className='text-red-600'>{formik.errors.colonia}</span>
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






                            <div className=' pb-2'>

                                <Label style={{ color: '#03104A' }} htmlFor='email' className='font-bold' value='Correo' />
                                <TextInput style={{ backgroundColor: '#E6ECF1' }} type="text" placeholder="Correo" id="email" name="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    helperText={
                                        formik.touched.email &&
                                        formik.errors.email && (
                                            <span className="text-red-600">{formik.errors.email}</span>
                                        )
                                    } />


                                <div className=' pb-2' hidden>
                                    <Label style={{ color: '#03104A' }} htmlFor='roles' className='font-bold' value='roles' />
                                    <Select id="role" name="roles" >
                                        <option selected value='Paciente'>Paciente</option>
                                    </Select>
                                </div>

                            </div>


                            <div className=''>
                                <div className='grid-col-6 pb-2'>
                                    <Label style={{ color: '#03104A' }} htmlFor='password' className='font-bold' value='Contraseña' />
                                    <TextInput style={{ backgroundColor: '#E6ECF1' }} type='password' placeholder="************" id="password" name="password"
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
                                    <TextInput style={{ backgroundColor: '#E6ECF1' }} type='password' placeholder="************" id="confirmPassword" name="confirmPassword"
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

                        <div className='w-full grid flex-col justify-center items-center'>

                            <h4 className='text-center mb-5'>¿Lleva algún seguimiento de estas enfermedades?</h4>

                            <div className='w-full flex flex-row justify-center items-center '>

                                <div className='w-full flex-col gap-3 justify-center items-center'>
                                    <div className='mb-6'>
                                        <Label
                                            style={{ color: '#03104A', textAlign:'center',}}
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

                                    <div className=''>
                                        <Label
                                            style={{ color: '#03104A' }}
                                            htmlFor='fechatratamiento'
                                            className='font-bold'
                                            value='Fecha inicial de tratamiento'
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
                                        <TextInput
                                            style={{ backgroundColor: '#E6ECF1', width: '150px' }}
                                            type='text'
                                            placeholder=''
                                            id='resultado'
                                            name='resultado'
                                            value={formik.values.resultado}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            helperText={
                                                formik.touched.resultado &&
                                                formik.errors.resultado && (
                                                    <span className='text-red-600 flex flex-col'>
                                                        {formik.errors.resultado}
                                                    </span>
                                                )
                                            }
                                        />
                                    </div>

                                    <div className='mb-2'>
                                        <TextInput
                                            style={{ backgroundColor: '#E6ECF1', width: '150px' }}
                                            type='date'
                                            placeholder=''
                                            id='fechatratamiento'
                                            name='fechatratamiento'
                                            value={formik.values.fechatratamiento}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            helperText={
                                                formik.touched.fechatratamiento &&
                                                formik.errors.fechatratamiento && (
                                                    <span className='text-red-600 flex flex-col'>
                                                        {formik.errors.fechatratamiento}
                                                    </span>
                                                )
                                            }
                                        />
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

export default EditPerson