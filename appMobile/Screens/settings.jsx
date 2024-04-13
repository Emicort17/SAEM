import { StyleSheet, Text, View, TextInput, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { useAuth } from '../config/context/AuthContext';
import { useEffect, useState } from 'react';
import AxiosClient from '../config/http/AxiosClient';
import CustomAlert from '../assets/Alert/CustomAlert';
import {Button, Input, Icon} from "@rneui/themed";
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';



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
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [animationName, setAnimationName] = useState('');

    const handleUpdateError = (message, animation) => {
        setAlertMessage(message);
        setAnimationName(animation);
        setAlertVisible(true);
    };

    const closeAlert = () => {
        setAlertVisible(false);
    };

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
        if (!telefono.trim() || !estado.trim() || !municipio.trim() || !cp.trim() || !calle.trim() ) {
            handleUpdateError("Por favor, completa todos los campos antes de actualizar.", 'error');
            return;
        }

        if(telefono.length != 10){
            handleUpdateError("El número de télefono debe de tener 10 caracteres.", 'error');
            return;
        }

        if(cp.length != 5){
            handleUpdateError("El Código Postal debe de tener 5 caracteres.", 'error');
            return;
        }

        if (!/^\d+$/.test(telefono) || !/^\d+$/.test(cp)) {
            handleUpdateError("El número de teléfono y el código postal deben ser numéricos y no contener letras o símbolos.", "error");
            return;
        }
        const regexTexto = /^$|^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/;
        if (!regexTexto.test(estado) || !regexTexto.test(municipio) || !regexTexto.test(calle) || !regexTexto.test(calle2)) {
            handleUpdateError("Los campos de texto solo deben contener letras, acentos y espacios.", "error");
            return;
        }


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
            if (response.status === "OK") {
                handleUpdateError("Datos actualizados correctamente", 'success');
            } else {
                handleUpdateError( "La actualización no fue exitosa", 'success');
            }
        } catch (error) {
            console.error("Error al actualizar datos:", error);
            handleUpdateError("No se pudieron actualizar los datos", 'sucess');
        }
    };


    const cambiarContraseña = async () => {
        if (!oldPassword.trim() || !newPassword.trim()  ) {
            handleUpdateError("Por favor, completa todos los campos antes de actualizar.", 'error');
            return;
        }
        const datosParaCambiarContraseña = {
            curp: curp,
            oldPassword: oldPassword,
            newPassword: newPassword
        };

        try {
            const response = await AxiosClient.post('patient/changePassword', datosParaCambiarContraseña);
            console.log(response);
            if (response.status === "OK") {
                handleUpdateError("Contraseña actualizada correctamente", 'success');
            }
        } catch (error) {
            handleUpdateError("No se pudo cambiar la contraseña", 'error');
        }
    };

    return (
        <ScrollView>
            <View style={styles.allScreen}>
                <View style={styles.container}>
                    <Text style={styles.title}>Perfil</Text>
                    <MaterialCommunityIcons
                        name="account-circle"
                        size={120   }
                        color="#092088"
                        style={{ alignSelf: 'center', marginBottom: 20 }}
                    />
                    <View style={styles.contImputs}>
                        <Text style={styles.comp}>Teléfono</Text>
                        <Input
                            placeholder="Teléfono"
                            value={telefono}
                            onChangeText={setTelefono}
                            leftIcon={
                                <Icon
                                    name="phone"
                                    type="font-awesome"
                                    size={24}
                                    color="black"
                                />
                            }
                        />

                        <Text style={styles.comp}>Estado</Text>
                        <Input
                            placeholder="Estado"
                            value={estado}
                            onChangeText={setEstado}
                            leftIcon={
                                <MaterialCommunityIcons
                                    name="map-marker-outline"
                                    size={24}
                                    color="black"
                                />
                            }
                        />



                        <Text style={styles.comp}>Municipio</Text>
                        <Input
                            placeholder="Municipio"
                            value={municipio}
                            onChangeText={setMunicipio}
                            leftIcon={
                                <FontAwesome5
                                    name="city"
                                    size={24}
                                    color="black"
                                />
                            }
                        />


                        <Text style={styles.comp}>Código Postal</Text>
                        <Input
                            placeholder="Código Postal"
                            value={cp}
                            onChangeText={setCP}
                            leftIcon={
                                <MaterialCommunityIcons
                                    name="mailbox-up-outline"
                                    size={24}
                                    color="black"
                                />
                            }
                        />

                        <Text style={styles.comp}>Calle 1</Text>
                        <Input
                            placeholder="Calle 1"
                            value={calle}
                            onChangeText={setCalle}
                            leftIcon={
                                <Icon
                                    name="road"
                                    type="font-awesome"
                                    size={24}
                                    color="black"
                                />
                            }
                        />

                        <Text style={styles.comp}>Calle 2</Text>
                        <Input
                            placeholder="Calle 2"
                            value={calle2}
                            onChangeText={setCalle2}
                            leftIcon={
                                <Icon
                                    name="road"
                                    type="font-awesome"
                                    size={24}
                                    color="black"
                                />
                            }
                        />
                    </View>
                </View>
                <Button size="md" radius='lg' onPress={actualizarDatos}>
                    <Text style={styles.titlebtn}>Actualizar Datos</Text>
                </Button>
                <CustomAlert
                    isVisible={alertVisible}
                    onClose={closeAlert}
                    message={alertMessage}
                    animationName={animationName}
                />
            </View>

            <View style={styles.allScreen}>
                <View style={styles.container}>
                    <Text style={styles.title}>Cambiar Contraseña</Text>
                    <View style={styles.contImputs}>
                        <Text style={styles.comp2}>Contraseña Actual</Text>
                        <Input placeholder="Escribe la contraseña anterior" value={oldPassword} secureTextEntry onChangeText={setOldPassword}/>
                        <Text style={styles.comp2}>Nueva Contraseña</Text>
                        <Input placeholder="Escribe la contraseña nueva" value={newPassword} secureTextEntry onChangeText={setNewPassword}/>
                    </View>
                </View>
                <Button size="md" radius='lg'
                      onPress={cambiarContraseña}>
                    <Text style={styles.titlebtn}>Cambiar Contraseña</Text>
                </Button>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    allScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0eeeb',
    },
    container: {
        top: 10,
        padding: 20,
        marginBottom: 50,
        alignItems: 'center',
        backgroundColor: 'white',
        width: 350,
        borderRadius: 20,
        borderWidth: 4,
    },
    title: {
        width: '100%',
        fontSize: 40,
        textAlign: 'center',
        marginBottom: 10,
        fontWeight: 'bold',
        color: '#092088',
    },
    img: {
        position: 'absolute',
        top: 0,
        marginTop: 90,
        width: 180,
        height: 180,
    },
    contImputs: {
        justifyContent: 'center', // Centra los elementos hijos horizontalmente
        alignItems: 'center', // Centra los elementos hijos verticalmente para alineación completa
        width: 300,
    },

    comp: {
        fontSize: 32,
        color: '#092088',
        fontWeight: 'bold',
    },
    comp2: {
        fontSize: 24,
        color: '#092088',
        fontWeight: 'bold',
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
        fontSize: 18,
        color: "white"
    },
    forgetpass: {
        marginTop: 20,
        width: 250,
        margin: 5,
        borderRadius: 5,
    }, status: {
        color: '#000000'
    }
});


export default Configuracion;

