import { StyleSheet, Text, View, Image, TextInput, FlatList } from 'react-native';
import * as React from "react";
import { Button } from "@rneui/base";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FlatListPerfil from './FlatListPerfil';
import { useAuth } from '../config/context/AuthContext';
import { useEffect, useState } from 'react';
import AxiosClient from '../config/http/AxiosClient';

Perfil = () => {
  const { userData, onLoginSuccess } = useAuth('');
  const [datos, setPersonResponse] = useState();
  const curp = userData.user.personBean.curp;
  console.log(curp)

  const getPerson = async () => {
    try {
      const response = await AxiosClient.get(`patient/findOne/${curp}`);
      console.log('hola person');
      console.log('Datos de la respuesta:', JSON.stringify(response.data, null, 2));
      if (response.data) {
        setPersonResponse(response.data);
      }
    } catch (error) {
      console.error('Error al encontrar el paciente:', error);
    }
  };



  useEffect(() => {
    getPerson();
  }, []); // Solo depende de datos



  return (

    <View style={styles.allScreen}>
      <View style={styles.contSearch}>
        <TextInput style={styles.search} placeholder='Buscar' />
        <Button
          buttonStyle={styles.btnSearch}
          containerStyle={{}}
          linearGradientProps={null}
          icon={<Icon name="magnify" size={25} color="#ffffff" />}
          iconContainerStyle={{ background: "#03104A" }}
          loadingProps={{ animating: true }}
          loadingStyle={{}}
          onPress={() => alert("click")}
          titleProps={{}}
          titleStyle={{ marginHorizontal: 5 }}
        />
      </View>


      <View style={styles.list}>
        <FlatList
          data={datos?.medicalRecordBean?.diagnosticBeans || []}
          renderItem={({ item }) => (
            <FlatListPerfil
              fecha={item.startDate}
              medico={item.result}
              seguimiento={item}
            />
          )}
          keyExtractor={item => item.id?.toString()}
        />

      </View>
    </View>

  );
}
export default Perfil;
const styles = StyleSheet.create({
  allScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  circulo: {
    borderRadius: 100,
    backgroundColor: 'black',
    width: 150,
    height: 150
  },

  nombre: {
    color: 'black',
    fontSize: 20,
    marginTop: 20
  },
  contSearch: {
    position: 'absolute',
    marginTop: 25,
    top: 0,
    flexDirection: 'row'
  },
  search: {
    padding: 10,
    color: 'gray',
    fontSize: 15,
    width: 250,
    height: 50,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderRadius: 5,


  }, img: {
    position: 'absolute',
    top: 0,
    marginTop: 90,
    width: 180,
    height: 180,
  },
  btnSearch: {
    width: 50,
    height: 50,
    backgroundColor: '#083565',
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'black'

  },
  list: {
    position: 'absolute',
    top: 0,
    marginTop: 100
  }
});