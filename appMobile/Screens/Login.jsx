import React, { useState } from 'react';
import { View, Text, TextInput, Alert, Image, StyleSheet } from 'react-native';
import { Button } from '@rneui/themed';
import { StatusBar } from "expo-status-bar";
import { useNavigation } from '@react-navigation/native';
import AxiosClient from '../config/http/AxiosClient'; // Importa tu objeto AxiosClient
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../config/context/AuthContext';
import { useEffect } from 'react';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (text) => {
    setUsername(text.trim());
  };

  const handlePasswordChange = (text) => {
    setPassword(text.trim());
  };
  const { userData, onLoginSuccess } = useAuth(''); // Cambio de userType a userData

  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const response = await AxiosClient.post('auth/signIn', {
        emailOrUsername: username,
        password: password
      });

      console.log(response.data.authorities[0].authority);

      if (response.data.authorities[0].authority === "PATIENT_ROLE") {
        await AsyncStorage.setItem('user', JSON.stringify(response.data));
        onLoginSuccess(response.data);
        console.log('entramos');
      } else (Alert.alert("El usuario no tiene acceso a esta app"))


    } catch (error) {
      Alert.alert("Usuario o contraseña incorrectos");
      onLoginSuccess(null);
    }
  };

  useEffect(() => {
    if (userData) {
      onLoginSuccess(userData);
    }
  }, [userData, onLoginSuccess]);

  const goToForgetPasswordScreen = () => {
    // Navega a la pantalla 'ForgetPass' para recuperar la contraseña
    navigation.navigate('ForgetPass');
  };


  return (
    <View style={styles.allScreen}>
      <StatusBar style="auto" backgroundColor="#fff" />
      <StatusBar barStyle={styles.status} />

      <View style={styles.container}>
        <Text style={styles.title}>Iniciar sesión</Text>
        <Image style={[styles.img]} source={require('../assets/Images/Logo.png')} />

        <View>

          <View style={styles.contInputs}>
            <TextInput
              style={styles.input}

              placeholder='Usuario'
              value={username}
              onChangeText={handleUsernameChange}
            />
            <TextInput
              style={styles.input}
              placeholder='Contraseña'
              value={password}
              onChangeText={handlePasswordChange}
              secureTextEntry
            />

            <Button
              type="clear"
              buttonStyle={{ width: 250 }}
              containerStyle={{ margin: 5 }}
              disabledStyle={{ borderWidth: 2 }}
              linearGradientProps={null}
              loadingProps={{ animating: true }}
              loadingStyle={{}}
              onPress={goToForgetPasswordScreen}
              title="Olvidé mi contraseña"
              titleProps={{}}
              titleStyle={{ marginHorizontal: 5, color: '#7C7C7C' }}
            />

            <Button
              buttonStyle={styles.btnLogin}
              onPress={handleLogin}
              title="Entrar"
              titleStyle={styles.titleBtn}
            />

          </View>

        </View>

      </View>

    </View>

  );
}

export default Login;

const styles = StyleSheet.create({

  title: {
    position: 'absolute',
    top: 0,
    width: '100%',
    fontSize: 30,
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
  contInputs: {

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

  btnLogin: {
    marginTop: 20,
    width: 250,
    margin: 5,
    borderRadius: 5,
    backgroundColor: '#092088'
  },
  titleBtn: {
    marginHorizontal: 5,
    fontSize: 18
  },
  forgetPass: {
    marginTop: 20,
    width: 250,
    margin: 5,
    borderRadius: 5,
  },
  status: {
    color: '#000000'
  }
});
