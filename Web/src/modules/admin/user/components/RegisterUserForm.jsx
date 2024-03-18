import { Button, Label, Modal, Select, TextInput, Datepicker } from 'flowbite-react'
import { useFormik } from 'formik';
import React from 'react'
import *  as yup from "yup"

const RegisterUserForm = ({ isCreating, setIsCreating }) => {
    const closeModal = () => {
        setIsCreating(false);
    }

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
            confirmPassword: "",
            roles: [],
            name: "",
            surname: "",
            lastname: "",
            curp: "",
            birth_date: "",
            avatar: ""
        },
        validationSchema: yup.object().shape({
            username: yup.string().required("Campo obligatorio").min(3, "Minimo 3 caracteres").max(45, "Maximo 45 caracteres"),
            password: yup.string().required("Campo obligatorio").min(8, "Minimo 8 caracteres").max(45, "Maximo 45 caracteres"),
            confirmPassword: yup.string().required("Campo obligatorio").min(8, "Minimo 8 caracteres").max(45, "Maximo 45 caracteres").test("password-matches", "Las contraseñas no coinciden", function (value) { return value === this.parent.password }),
            name: yup.string().required("Campo obligatorio").min(3, "Minimo 3 caracteres").max(45, "Maximo 45 caracteres"),
            surname: yup.string().required("Campo obligatorio").min(3, "Minimo 3 caracteres").max(45, "Maximo 45 caracteres"),
            lastname: yup.string().min(3, "Minimo 3 caracteres").max(45, "Maximo 45 caracteres"),
            curp: yup.string().required("Campo obligatorio").min(3, "Minimo 18 caracteres").max(18, "Maximo 18 caracteres"),
            birth_date: yup.string().required("Campo obligatorio")
        }),
        onSubmit: async (values, { setSubmitting }) => {
            console.log(values);
        }
    })

    return (
        <Modal show={isCreating} size={'4xl'}>
            <Modal.Header title={"Registrar usuario"} />
            <Modal.Body>
                <form noValidate onSubmit={formik.handleSubmit}>
                    <div className='flex flex-col gap-2'>
                        <h3 className='font-bold text-2xl'>Datos de usuario</h3>
                        <div className='grid grid-flow-col gap-2 mt-4'>
                            <div className='grid-col-5'>
                                <Label htmlFor='username' className='font-bold' value='Usuario' />
                                <TextInput type="text" placeholder="erielit" id="username" name="username" 
                                value={formik.values.username} 
                                onChange={formik.handleChange} 
                                onBlur={formik.handleBlur} 
                                helperText={
                                    formik.touched.username && 
                                    formik.errors.username && (
                                    <span classname="text-red-600">{formik.errors.username}</span>
                                    )
                                    } />
                            </div>
                            <div className='grid-col-7'>
                                <Label htmlFor='roles' className='font-bold' value='Roles' />
                                <Select placeholder="Seleccionar rol..." id="role" name="roles" />
                            </div>

                        </div>
                        <div className='grid grid-flow-col gap-2 mb-4'>
                            <div className='grid-col-6'>
                                <Label htmlFor='password' className='font-bold' value='Contraseña' />
                                <TextInput type='password' placeholder="************" id="password" name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                            </div>
                            <div className='grid-col-6'>
                                <Label htmlFor='confirmPassword' className='font-bold' value='Confirmar contraseña' />
                                <TextInput type='password' placeholder="************" id="confirmPassword" name="confirmPassword" value={formik.values.confirmPassword} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                            </div>
                        </div>
                        <div className='grid grid-flow-col gap-2 mb-4'>
                            <div className='grid-col-5'>
                                <Label htmlFor='avatar' className='font-bold' value='Avatar' />
                                <TextInput type='file' id="avatar" name="avatar" />
                            </div>
                        </div>
                        <h3 className='font-bold text-2xl'>Datos personales</h3>
                        <div className='grid grid-flow-col gap-2 mt-4'>
                            <div className='grid-col-4'>
                                <Label htmlFor='name' className='font-bold' value='Nombre' />
                                <TextInput type="text" placeholder="Leonardo" id="name" name="name" />
                            </div>
                            <div className='grid-col-4'>
                                <Label htmlFor='surname' className='font-bold' value='Apellido materno' />
                                <TextInput type="text" placeholder="Dorantes" id="surname" name="surname" />
                            </div>
                            <div className='grid-col-4'>
                                <Label htmlFor='lastname' className='font-bold' value='Apellido paterno' />
                                <TextInput type="text" placeholder="Castañeda" id="lastname" name="lastname" />
                            </div>
                        </div>
                        <div className='grid grid-flow-col gap-2'>
                            <div className='grid-col-6'>
                                <Label htmlFor='curp' className='font-bold' value='CURP' />
                                <TextInput type='curp' placeholder="DOCL041212HMSRSNA1" id="curp" name="curp" />
                            </div>
                            <div className='grid-col-6'>
                                <Label htmlFor='birth_date' className='font-bold' value='Fecha de nacimiento' />
                                <Datepicker title="Fecha de nacimiento" id='birth_date' name='birth_date' />
                            </div>
                        </div>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer className='flex justify-end gap-2'>
                <Button onClick={closeModal}>CANCELAR</Button>
                <Button>GUARDAR</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default RegisterUserForm