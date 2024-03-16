import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

/*
    Todos los titulos error, success, confirm
    Todos los mensajes error, success, confirm 
*/

const SweetAlert = withReactContent(Swal);

export const customAlert = (title, text, icon) => {
  return SweetAlert.fire({
    title,
    text,
    icon,
    confirmButtonColor: '#3085d6',
    confirmButtonText: 'Aceptar',
  });
};
