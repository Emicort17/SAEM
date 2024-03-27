import { Alert } from "flowbite-react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

/*
    Todos los titulos error, success, confirmar
    Todos los mensaje error, success, confirmar
*/ 

const SweetAlert  = withReactContent(Swal);


export const customAlert = (title, text, icon) => {
    return SweetAlert.fire({
        title,
        text,
        icon, 
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Aceptar"
    });
};

export const confimAlert= (preConfirm)=> SweetAlert.fire({
    title:'Estas seguro de realizar accion?',
    text:'Le solicitamos esperar a que termine la acciom',
    icon:'info',
    confirmButtonColor:"#0e7490",
    confirmButtonText:'Aceptar',
    cancelButtonText:'Cancelar',
    reverseButtons:true,
    backdrop:true,
    showCancelButton:true,
    showLoaderOnConfirm:true,
    allowOutsideClick:()=> !SweetAlert.isLoading(),
    preConfirm,
})

export const LogOutAlert= (preConfirm)=> SweetAlert.fire({
    title:'Cerrar Session?',
    text:'¿Seguro que desea cerrar session?',
    icon:'info',
    confirmButtonColor:"#0e7490",
    confirmButtonText:'Aceptar',
    cancelButtonText:'Cancelar',
    reverseButtons:true,
    backdrop:true,
    showCancelButton:true,
    showLoaderOnConfirm:true,
    allowOutsideClick:()=> !SweetAlert.isLoading(),
    preConfirm,
})
