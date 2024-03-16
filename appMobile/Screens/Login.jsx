import { useNavigation } from '@react-navigation/native';
import { Button } from '@rneui/themed';
import { StatusBar } from "expo-status-bar";

import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, Image } from 'react-native';

Login = () => {
  let [userName, setUserName] = useState("");
  let [password, setPassword] = useState("");

  let [tries, setTries] = useState(0);

  const navigation = useNavigation();

  const user = {
    userName: 'Martin',
    password: '123'
  };

  const validateUser = () => {
    console.log(user);
    console.log(userName);

    if (tries <= 3) {
      if (userName === user.userName && password === user.password) {
        navigation.replace('TabNav');
      } else {
        Alert.alert(
          'Contraseña o Usuario incorrectos',
          `Te quedan ${tries} intentos`,
          [{ text: 'Intentar de nuevo', onPress: () => { setTries(tries + 1); } }]
        );
      }
    } else {
      Alert.alert(
        'Demasiados intentos',
        'Límite de intentos superado, inténtalo más tarde...',
        [{ text: 'Ok' }]
      );
    }
  };

  const goToScreen = () => {
    navigation.replace('ForgetPass');
  };


  return (
 

    <View style={styles.allScreen}>
         <StatusBar style="auto" backgroundColor="#fff" />
            <StatusBar barStyle={styles.status}/>

      <View style={styles.container}>
        <Text style={styles.title}>Iniciar sessión</Text>
        <Image style={[styles.img]} source={require('../assets/Images/Logo.png')} />

        <View>

          <View style={styles.contImputs}>
            <TextInput style={styles.input} placeholder='Usuario' value={userName}
              onChangeText={setUserName} />
            <TextInput style={styles.input} placeholder='Contraseña' value={password}
              onChangeText={setPassword} />



            <Button
              type="clear"
              buttonStyle={{ width: 250 }}
              containerStyle={{ margin: 5 }}
              disabledStyle={{
                borderWidth: 2,
              }}
            
              linearGradientProps={null}
              loadingProps={{ animating: true }}
              loadingStyle={{}}
              onPress={goToScreen}
              title="Olvide mi contraseña"
              titleProps={{}}
              titleStyle={{ marginHorizontal: 5 ,color:'#7C7C7C' }}
            />



            <Button
              buttonStyle={styles.btnlogin}
              onPress={validateUser}
              title="Entrar"
              titleStyle={styles.titlebtn}
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
  }, status:{
    color:'#000000'
  }



});
