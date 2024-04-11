import { StyleSheet, Text, View, TextInput, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { useAuth } from '../config/context/AuthContext';
import { useEffect, useState } from 'react';
import AxiosClient from '../config/http/AxiosClient';

const Configuracion = () => {
    const { userData } = useAuth('');
    const [datos, setPersonResponse] = useState();
    const [telefono, setTelefono] = useState('');
    const [estado, setEstado] = useState('');
    const [municipio, setMunicipio] = useState('');
    const [cp, setCP] = useState('');
    const [calle2, setCalle2] = useState('');
    const [calle, setCalle] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [curp, setCurp] = useState('');
    const [external, setExternal] = useState(false);

    useEffect(() => {
        const getPerson = async () => {
            const curp = userData.user.personBean.curp;
            try {
                const response = await AxiosClient.get(`patient/findOne/${curp}`);
                if (response.data) {
                    setPersonResponse(response.data);
                    setTelefono(response.data.userBean.personBean.phoneNumber);
                    setEstado(response.data.userBean.personBean.addressBean.state);
                    setMunicipio(response.data.userBean.personBean.addressBean.town);
                    setCP(response.data.userBean.personBean.addressBean.zip);
                    setCalle2(response.data.userBean.personBean.addressBean.street2);
                    setCalle(response.data.userBean.personBean.addressBean.street1);
                    setCurp(userData.user.personBean.curp)
                    setExternal(response.data.external)
                }
            } catch (error) {
                console.error('Error al encontrar el paciente:', error);
            }
        };
        getPerson();
        console.log("Settings curp "+userData.user.personBean.curp);
        console.log(userData.user.id)
    }, [userData.user.personBean.curp]);

    const actualizarDatos = async () => {
        const datosActualizados = {
            external: external,
            userBean: {
                id: datos.userBean.id,
                email: datos.userBean.email,
                password: datos.userBean.password,
                status: datos.userBean.status,
                personBean: {
                    id: datos.userBean.personBean.id,
                    name: datos.userBean.personBean.name,
                    middleName: datos.userBean.personBean.middleName,
                    lastName: datos.userBean.personBean.lastName,
                    birthdate: datos.userBean.personBean.birthdate,
                    birthplace: datos.userBean.personBean.birthplace,
                    curp: datos.userBean.personBean.curp,
                    phoneNumber: telefono,
                    sex: datos.userBean.personBean.sex,
                    addressBean: {
                        id: datos.userBean.personBean.addressBean.id,
                        state: estado,
                        town: municipio,
                        zip: cp,
                        interiorNumber: datos.userBean.personBean.addressBean.interiorNumber,
                        exteriorNumber: datos.userBean.personBean.addressBean.exteriorNumber,
                        street1: calle,
                        street2: calle2,
                        street3: datos.userBean.personBean.addressBean.street3,
                    }
                }
            }
        };

        try {
            const response = await AxiosClient.put('patient/update', datosActualizados);
            if (response.status == "OK") {
                Alert.alert("Éxito", "Datos actualizados correctamente");
            } else {
                Alert.alert("Error", "La actualización no fue exitosa");
            }
        } catch (error) {
            console.error("Error al actualizar datos:", error);
            Alert.alert("Error", "No se pudieron actualizar los datos");
        }
    };


    const cambiarContraseña = async () => {
        const datosParaCambiarContraseña = {
            curp: curp,
            oldPassword: oldPassword,
            newPassword: newPassword
        };

        try {
            const response = await AxiosClient.post('patient/changePassword', datosParaCambiarContraseña);
            console.log(response);
            if (response.status === "OK") {
                Alert.alert("Éxito", "Contraseña actualizada correctamente");
            }
        } catch (error) {
            Alert.alert("Error", "No se pudo cambiar la contraseña");
        }
    };

    return (
        <ScrollView>
            <View style={styles.allScreen}>
                <View style={styles.container}>
                    <Text style={styles.title}>Perfil</Text>
                    <View style={styles.contImputs}>
                        <Text style={styles.comp}>Teléfono</Text>
                        <TextInput style={styles.input} value={telefono} onChangeText={setTelefono}/>

                        <Text style={styles.comp}>Estado</Text>
                        <TextInput style={styles.input} value={estado} onChangeText={setEstado}/>

                        <Text style={styles.comp}>Municipio</Text>
                        <TextInput style={styles.input} value={municipio} onChangeText={setMunicipio}/>

                        <Text style={styles.comp}>Código Postal</Text>
                        <TextInput style={styles.input} value={cp} onChangeText={setCP}/>

                        <Text style={styles.comp}>Calle 1</Text>
                        <TextInput style={styles.input} value={calle} onChangeText={setCalle}/>

                        <Text style={styles.comp}>Calle 2</Text>
                        <TextInput style={styles.input} value={calle2} onChangeText={setCalle2}/>

                    </View>
                </View>
                <TouchableOpacity style={styles.btnActualizar} onPress={actualizarDatos}>
                    <Text style={styles.titlebtn}>Actualizar</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.allScreen}>
                <View style={styles.container}>
                    <Text style={styles.title}>Cambiar Contraseña</Text>
                    <View style={styles.contImputs}>
                        <Text style={styles.comp}>Contraseña Actual</Text>
                        <TextInput style={styles.input} value={oldPassword} secureTextEntry onChangeText={setOldPassword}/>

                        <Text style={styles.comp}>Nueva Contraseña</Text>
                        <TextInput style={styles.input} value={newPassword} secureTextEntry onChangeText={setNewPassword}/>
                    </View>
                </View>
                <TouchableOpacity style={styles.btnActualizar} onPress={cambiarContraseña}>
                    <Text style={styles.titlebtn}>Cambiar Contraseña</Text>
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

