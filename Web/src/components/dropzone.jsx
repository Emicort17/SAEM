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

  const handleSubmit = async () => {
    if (selectedFile) {
      confimAlert(async () => {
        try {
          const formData = new FormData();
          formData.append('file', selectedFile);
  
          // Envía la solicitud al servidor
          const response = await AxiosMultipartClient.post('/patient/import', formData);
  
          // Evalúa la respuesta basándote en la propiedad 'error' de la respuesta del servidor
          if (!response.error) {
            customAlert(
              'Registros exitosos',
              response.message, // Utiliza el mensaje de la respuesta del servidor
              'success'
            );
          } else {
            customAlert(
              'Error en la carga',
              response.message || 'Ocurrió un error desconocido al cargar los datos.',
              'error'
            );
          }
        } catch (error) {
          console.error("Error completo:", error);
          if (error.response) {
            // El servidor respondió con un estado fuera del rango 2xx
            console.error("Datos de la respuesta del error:", error.response.data);
            console.error("Estado de la respuesta del error:", error.response.status);
            console.error("Encabezados de la respuesta del error:", error.response.headers);
            // Utiliza la respuesta del servidor si está disponible
            customAlert(
              'Ocurrió un error',
              error.response.data.message || 'Error al cargar los datos',
              'error'
            );
          } else if (error.request) {
            console.error("La solicitud fue hecha pero no se recibió respuesta", error.request);
            customAlert(
              'Ocurrió un error',
              'No se recibió respuesta del servidor',
              'error'
            );
          } else {
            console.error("Error", error.message);
            customAlert(
              'Ocurrió un error',
              error.message,
              'error'
            );
          }
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

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setSelectedFile(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <div className="flex w-full items-center justify-center">
        <Label
          htmlFor="dropzone-file"
          style={{ border: '2px dotted #000', borderColor: '#BDBFC4' }}
          className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-dashed border-2 border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600 text-center"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
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
      <div className='grid mt-6 '> <Button style={{backgroundColor:'#03257A'}} onClick={handleSubmit}>Enviar</Button> </div>
    </>
  );
};

export default Dropzone;
