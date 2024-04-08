import React, { useState } from 'react';
import { FileInput, Label, Button } from 'flowbite-react';
import { customAlert, confimAlert } from '../config/alerts/alert';
import AxiosMultipartClient from '../config/http-client/axios-multipart';

const Dropzone = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = () => {
    if (selectedFile) {
      confimAlert(async () => {
        try {
          const file = new FormData();
          file.append('file', selectedFile);

          const response = await AxiosMultipartClient.post('/patient/import', file);

          if (!response.error) {
            customAlert(
              'Registros exitosos',
              'Los datos se guardaron correctamente',
              'success'
            );
          }

          
        } catch (error) {
          console.log(error);
          customAlert(
            'Ocurrió un error',
            'Error al cargar los datos',
            'error'
          );
          console.log(error);
        }
      });
    } else {
      customAlert(
        'Sin Archivo',
        'Seleccione un Archivo',
        'error'
      );
    }
  };

  return (
    <>
      <div className="flex w-full items-center justify-center ">
        <Label
          htmlFor="dropzone-file"
          style={{ border: '2px dotted #000', borderColor: '#BDBFC4' }}
          className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-dashed border-2 border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600 text-center"
        >
          <div className="flex flex-col items-center justify-center p-6">
            <svg
              className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            {selectedFile ? (
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                Archivo seleccionado: <span className="font-semibold">{selectedFile.name}</span>
              </p>
            ) : (
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Haga clic para cargar o arrastre y suelte</span>
              </p>
            )}
            <p className="text-xs text-gray-500 dark:text-gray-400">xlsx (MAX. 20MB)</p>
          </div>
          <FileInput id="dropzone-file" className="hidden" onChange={handleFileChange} />
        </Label>
      </div>
      <div className='grid mt-6 '> <Button onClick={handleSubmit}>Enviar</Button> </div>
    </>
  );
};

export default Dropzone;
