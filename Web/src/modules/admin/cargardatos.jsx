import { Footer } from 'flowbite-react';
import { BsBoxArrowUpRight } from "react-icons/bs";
import Dropzone from '../../components/dropzone';
import { HiInformationCircle } from 'react-icons/hi';
import { Alert } from 'flowbite-react';

import { Button, Modal } from 'flowbite-react';
import { useState } from 'react';

const Subirdatos = () => {
    const [openModal, setOpenModal] = useState(false);


    return (
        <>
            <div className=' flex flex-col w-full items-center justify-center '>

                <div style={{ width: '100%', flexDirection: 'row' }} className='p-5 flex-row'>
                    <Alert color="info" icon={HiInformationCircle} className='p-5 flex flex-row' >
                        <span className="font-medium flex flex-row">Info alert! Los arachivos a subir deben de contener el siguiente formato. <BsBoxArrowUpRight onClick={() => setOpenModal(true)} style={{ marginLeft: '5px', width: '14PX', marginTop: '2PX' }}> </BsBoxArrowUpRight> </span>
                    </Alert>

                    <Modal show={openModal} onClose={() => setOpenModal(false)}>
                        <Modal.Header>Formato</Modal.Header>
                        <Modal.Body >
                     
                            <div className="flex w-full items-center justify-center space-y-6 ">
                               <img src='src\assets\Images\Logo.png'></img>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                      
                        </Modal.Footer>
                    </Modal>
                </div>
                <div style={{ width: '85%' }} className="sm p-5">
                    <Dropzone>
                    </Dropzone>
                </div>

            </div>

        </>


    );
};

export default Subirdatos;
