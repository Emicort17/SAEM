import { Footer } from 'flowbite-react';
import { BsBoxArrowUpRight } from "react-icons/bs";
import Dropzone from '../../components/dropzone';
import { HiInformationCircle } from 'react-icons/hi';
import { Alert } from 'flowbite-react';

import { Button, Modal } from 'flowbite-react';
import { useState } from 'react';
import '../../modules/admin/user/components/Subirdatos.css'; // Importa el archivo CSS donde definiremos estilos adicionales

const Subirdatos = () => {
    const [openModal, setOpenModal] = useState(false);

    const handleMouseMove = (e) => {
        const loupe = document.querySelector('.loupe');
        const image = document.querySelector('.image');

        const { left, top, width, height } = image.getBoundingClientRect();
        let mouseX = e.clientX - left;
        let mouseY = e.clientY - top;

        // Ajusta la posición de la lupa si el cursor está cerca del borde de la imagen
        mouseX = Math.max(1, Math.min(width, mouseX));
        mouseY = Math.max(1, Math.min(height, mouseY));

        loupe.style.left = mouseX + 'px';
        loupe.style.top = mouseY + 'px';
        loupe.style.backgroundPosition = `-${mouseX * 4}px -${mouseY * 4}px`; // Ajusta el valor de zoom según tus necesidades
    };

    return (
        <>
            <div className='flex flex-col w-full items-center justify-center'>

                <div style={{ width: '100%', flexDirection: 'row' }} className='p-5 flex-row'>
                    <Alert color="info" icon={HiInformationCircle} className='p-5 flex flex-row'>
                        <span className="font-medium flex flex-row">Info alert! Los archivos a subir deben de contener el siguiente formato. <BsBoxArrowUpRight onClick={() => setOpenModal(true)} style={{ marginLeft: '5px', width: '14PX', marginTop: '2PX' }}> </BsBoxArrowUpRight> </span>
                    </Alert>

                    <Modal show={openModal} onClose={() => setOpenModal(false)} size={'4xl'}>
                        <Modal.Header>Formato</Modal.Header>
                        <Modal.Body>
                            <div className="flex w-full items-center justify-center space-y-2">
                                <div className="image-container" onMouseMove={handleMouseMove}>
                                    <img src='/src/assets/Images/formato.jpg' alt="Formato" className="image" />
                                    <div className="loupe"></div>
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>

                        </Modal.Footer>
                    </Modal>
                </div>
                <div style={{ width: '90%' }} className="sm p-5">
                    <Dropzone>
                    </Dropzone>
                </div>

            </div>
        </>
    );
};

export default Subirdatos;
