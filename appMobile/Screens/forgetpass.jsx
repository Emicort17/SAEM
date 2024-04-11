import { useNavigation } from '@react-navigation/native';
import { Button } from '@rneui/themed';
import { StatusBar } from "expo-status-bar";
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import AxiosClient from "../config/http/AxiosClient";
ForgetPass = () => {

    let [userEmail, setUserEmail] = useState("");

    const navigation = useNavigation();

    const sendEmail = async () => {

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(emailRegex.test(userEmail)){
            const json = {
                toEmail: userEmail
            }
            try {
                console.log(userEmail);
                const response = await AxiosClient.post("/auth/recover/send-mail", json);
                console.log(response);
                if (!response.error){
                    navigation.navigate('Login');
                    Alert.alert(
                        'La contraseña se envió al correo',
                    );
                }
            } catch (error) {
                Alert.alert(
                    'El correo ingresado no esta resgistrado',
                );
            }
        } else if(userEmail === ''){
            Alert.alert(
                'Por favor rellena el campo solicitado',
            );
        }else{
            Alert.alert(
                'Ingresa un correo válido',
            );
        }

    };

    return (
        <View style={styles.allScreen}>
            <StatusBar barStyle={styles.status} />

            <View style={styles.container}>
                <Text style={styles.title}>Recuperar Contraseña</Text>
                <Image style={[styles.img]} source={require('../assets/Images/Logo.png')} />


                <View>

                    <View style={styles.contImputs}>


                        <View style={styles.info}>

                        <Feather name="info" size={15} color="black" />
                            <Text style={{marginLeft:5}}>La contraseña será enviada al correo</Text>

                        </View>

                        <TextInput style={styles.input} placeholder='Correo...'
                           value={userEmail} onChangeText={setUserEmail} />

                        <Button
                            buttonStyle={styles.btnlogin}
                            onPress={sendEmail}
                            title="Enviar"
                            titleStyle={styles.titlebtn}
                        />

                    </View>

                </View>
                <View style={styles.goBackButton}>
                    <Button
                        onPress={() => navigation.navigate('Login')}
                        type="clear"
                        disabledStyle={{ borderWidth: 2 }}
                        title="Regresar"
                        titleStyle={{ color: '#7C7C7C' }}
                    />
                </View>
            </View>

        </View>

    );
}

export default ForgetPass;

const styles = StyleSheet.create({
    goBackButton: {
        position: 'absolute',
        bottom: 120
    },
    info: {
        position:'absolute',
        top:-20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        textAlign: 'center',
        width: 330,
        height: 30,
        fontSize:10,
        backgroundColor: '#E1F0FF',
        flexDirection:'row',
        paddingLeft:5,
    },
    title: {
        position: 'absolute',
        top: 0,
        width: '100%',
        fontSize: 25,
        textAlign: 'center',
        marginTop: 20,
        fontWeight: 'bold',
        color: '#092088'

    },
    allScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#03104A',
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        width: 350,
        height: 650,
        borderRadius: 20
    },
    img: {
        position: 'absolute',
        top: 0,
        marginTop: 90,
        width: 180,
        height: 180,
    },
    contImputs: {

        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 150,
        width: 300,
        height: 200,
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



});
