import { Link } from "react-router-dom";
import { Button, Label} from 'flowbite-react'

const InformePrincipal = () => {


    const getUser = async () => {
        try {
            const response = await AxiosClient({
                url: "/patient/findOne",
                method: 'GET',

            });
            console.log(response);
            if (!response.error) setUsers(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    
    return (
        
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', height: '100%', paddingTop: '80px', color: '#03104A',}} className="flex flex-wrap">
            <section className='w-full px-4 pt-4 flex flex-col gap-4' style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>

                <div style={{width: '700px', border: '1px solid #ccc', borderRadius:'15px', marginTop:'-60px'}} >

                    <div style={{ textAlign: 'center', padding: '10px' }}>
                        <h5 className="text-2xl font-bold tracking-tight" style={{ fontSize: '32px', color: '#03104A' }}>
                            Informe
                        </h5>
                    </div>

                    <div style={{ display: "flex", justifyContent: 'flex-start', flexDirection: 'column', width: '100%', padding: '50px', paddingTop:'30px', color: '#03104A', }}>
                        <div style={{ margin: '10px' }}>
                            <label className="font-bold" style={{ marginRight: '10px' }}>Nombre</label>
                            <label>{}</label>
                        </div>

                        <div style={{ margin: '10px' }}>
                            <label  className="font-bold" style={{ marginRight: '10px' }}>Medico Tratante</label>
                            <label>hola</label>
                        </div>
                        <div style={{ margin: '10px' }}>
                            <label  className="font-bold" style={{ marginRight: '10px' }}>Telefono</label>
                            <label>hola</label>
                        </div>
                        <div style={{ margin: '10px' }}>
                            <label className="font-bold" style={{ marginRight: '10px' }}>Pais</label>
                            <label>hola</label>
                        </div>
                        <div style={{ margin: '10px' }} >
                            <label  className="font-bold" style={{ marginRight: '10px' }}>Municipio</label>
                            <label>hola</label>
                        </div>
                        <div style={{ margin: '10px' }}>
                            <label  className="font-bold" style={{ marginRight: '10px' }}>Estado</label>
                            <label>hola</label>
                        </div>
                        <div style={{ margin: '10px' }}>
                            <label  className="font-bold" style={{ marginRight: '10px' }}>Esrtado de nacimiento</label>
                            <label>hola</label>
                        </div>
                        <div style={{ margin: '10px' }}>
                            <label  className="font-bold" style={{ marginRight: '10px' }}>Sexo</label>
                            <label>hola</label>
                        </div>
                        <div style={{ margin: '10px' }}>
                            <label  className="font-bold" style={{ marginRight: '10px' }}>CURP</label>
                            <label>hola</label>
                        </div>
                        <div style={{ margin: '10px' }}>
                            <label  className="font-bold" style={{ marginRight: '10px' }}>Enfermedad cronica</label>
                            <label>hola</label>
                        </div>
                        <div style={{ margin: '10px' }}>
                            <label  className="font-bold" style={{ marginRight: '10px' }}>Fecha de padecimiento</label>
                            <label>hola</label>
                        </div>
                        <div style={{ margin: '10px' }}>
                            <label  className="font-bold" style={{ marginRight: '10px' }}>Resultado</label>
                            <label>hola</label>
                        </div>
                        <div style={{ margin: '10px' }}>
                            <label  className="font-bold" style={{ marginRight: '10px' }}>Fecha de inicio de tratamiento</label>
                            <label>hola</label>
                        </div>
                        <div className='flex justify-end space-x-4 mt-6'>
                            <Link to={'/formularioSeguimiento'} > <Button  color="blue" style={{ outline: 'none', boxShadow: 'none' }}>Seguimiento</Button> </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div >
        
    )
}

export default InformePrincipal;