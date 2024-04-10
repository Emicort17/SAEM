import { StyleSheet, Text, View, TextInput, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { useAuth } from '../config/context/AuthContext';
import { useEffect, useState } from 'react';
import AxiosClient from '../config/http/AxiosClient';

const Configuracion = () => {
    const { userData, onLoginSuccess } = useAuth('');
    const [datos, setPersonResponse] = useState();
    const [telefono, setTelefono] = useState('');
    const [estado, setEstado] = useState('');
    const [municipio, setMunicipio] = useState('');
    const [cp, setCP] = useState('');
    const [calle2, setCalle2] = useState('');
    const [calle, setCalle] = useState('');

    useEffect(() => {
        const getPerson = async () => {
            const curp = userData.user.personBean.curp;
            try {
                const response = await AxiosClient.get(`patient/findOne/${curp}`);
                if (response.data) {
                    setPersonResponse(response.data);
                    // Actualiza los estados con los datos recibidos
                    setTelefono(response.data.userBean.personBean.phoneNumber);
                    setEstado(response.data.userBean.personBean.addressBean.state);
                    setMunicipio(response.data.userBean.personBean.addressBean.town);
                    setCP(response.data.userBean.personBean.addressBean.zip);
                    setCalle2(response.data.userBean.personBean.addressBean.street2);
                    setCalle(response.data.userBean.personBean.addressBean.street1);
                }
            } catch (error) {
                console.error('Error al encontrar el paciente:', error);
            }
        };
        getPerson();
    }, [userData.user.personBean.curp]); 

    const actualizarDatos = async () => {
        const datosActualizados = {
            ...datos,
            userBean: {
                ...datos.userBean,
                personBean: {
                    ...datos.userBean.personBean,
                    phoneNumber: telefono,
                    addressBean: {
                        ...datos.userBean.personBean.addressBean,
                        state: estado,
                        town: municipio,
                        zip: cp,
                        street1: calle,
                    }
                }
            }
        };

        try {
            const response = await AxiosClient.post('localhost:8080/api/saem/patient/update', datosActualizados);
            if (response.data) {
                Alert.alert("Éxito", "Datos actualizados correctamente");
            }
        } catch (error) {
            Alert.alert("Error", "No se pudieron actualizar los datos");
        }
    };

    return (
        <ScrollView>
            <View style={styles.allScreen}>
                <View style={styles.container}>
                    <Text style={styles.title}>Perfil</Text>
                    <View style={styles.contImputs}>
                        <Text style={styles.comp}>Telefono</Text>
                        <TextInput style={styles.input} value={telefono} onChangeText={setTelefono}/>

                        <Text style={styles.comp}>Estado</Text>
                        <TextInput style={styles.input} value={estado} onChangeText={setTelefono}/>

                        <Text style={styles.comp}>Municipio</Text>
                        <TextInput style={styles.input} value={municipio} onChangeText={setTelefono}/>

                        <Text style={styles.comp}>Código Postal</Text>
                        <TextInput style={styles.input} value={cp} onChangeText={setTelefono}/>

                        <Text style={styles.comp}>Calle 1</Text>
                        <TextInput style={styles.input} value={calle} onChangeText={setTelefono}/>

                        <Text style={styles.comp}>Calle 2</Text>
                        <TextInput style={styles.input} value={calle2} onChangeText={setTelefono}/>

                       
                    </View>
                </View>
                <TouchableOpacity style={styles.btnActualizar} onPress={actualizarDatos}>
                    <Text style={styles.titlebtn}>Actualizar</Text>
                </TouchableOpacity>
            </View>        
        </ScrollView>

         
    );
}

const styles = StyleSheet.create({

    title: {
        width: '100%',
        fontSize: 25,
        textAlign: 'center',
        marginBottom:10,
        fontWeight: 'bold',
        color: '#092088'


    },
    allScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffff',
    },
    container: {
        top:10,
        padding:20,
        marginBottom:50,
        alignItems: 'center',
        backgroundColor: 'white',
        width: 350,
        borderRadius: 20,
        borderWidth:1,
    },
    img: {
        position: 'absolute',
        top: 0,
        marginTop: 90,
        width: 180,
        height: 180,
    },
    contImputs: {

        justifyContent: 'center',
        width: 300,
    },

    comp: {
        fontSize: 15,
        color: '#092088',
        fontWeight: 'bold'

    },

    input: {
        padding: 12,
        width: 300,
        borderRadius: 5,
        marginBottom: 10,
        marginTop: 10,
        height: 50,
        fontSize: 20,
        borderWidth: 1,
        borderColor: '#7C7C7C', // Color del borde

    },

    btnlogin: {
        marginTop: 20,
        width: 250,
        margin: 5,
        borderRadius: 5,
        backgroundColor: '#092088'
    },
    titlebtn: {
        marginHorizontal: 5,
        fontSize: 18
    },
    forgetpass: {
        marginTop: 20,
        width: 250,
        margin: 5,
        borderRadius: 5,
    }, status: {
        color: '#000000'
    }





})


export default Configuracion;

