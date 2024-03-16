import { StyleSheet, Text, View, Image, TextInput, FlatList } from 'react-native';
import * as React from "react";
import { Button } from "@rneui/base";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FlatListPerfil from './FlatListPerfil';

Perfil = () => {

  const datos = [
    {
      uid: 1,
      fecha: "01/12/23",
      medico: "Juan",
       seguimiento: {
            enfermedad: 'Sida',
            fecha: '20/12/22',
            resultado: 'positivo',
            fechaToma: '20/12/22',
            fechaResult: '20/12/22',
            cargaViral: '32,786',
            AST: '27',
            plaquetas: '250,000',
            antiretroviral: 'Atazanavir',
            fechaResult2: '30/12/22',
            creatinina: '1.3',
        },

    
    },
    {
      uid: 2,
      fecha: "02/12/23",
      medico: "Jose",
      seguimiento: {
        enfermedad: 'Sifilis',
        fecha: '20/12/22',
        resultado: 'positivo',
        fechaToma: '20/12/22',
        fechaResult: '20/12/22',
        cargaViral: '32,786',
        AST: '27',
        plaquetas: '250,000',
        antiretroviral: 'Atazanavir',
        fechaResult2: '30/12/22',
        creatinina: '1.3',
    },
    },
    {
      uid: 3,
      fecha: "03/12/23",
      medico: "Pepe",
      seguimiento: {
        enfermedad: 'Gonorrea',
        fecha: '20/12/22',
        resultado: 'positivo',
        fechaToma: '20/12/22',
        fechaResult: '20/12/22',
        cargaViral: '32,786',
        AST: '27',
        plaquetas: '250,000',
        antiretroviral: 'Atazanavir',
        fechaResult2: '30/12/22',
        creatinina: '1.3',
    },
    },
    {
      uid: 4,
      fecha: "04/12/23",
      medico: "Alfonso",
      seguimiento: {
        enfermedad: 'Hepatitis',
        fecha: '20/12/22',
        resultado: 'positivo',
        fechaToma: '20/12/22',
        fechaResult: '20/12/22',
        cargaViral: '32,786',
        AST: '27',
        plaquetas: '250,000',
        antiretroviral: 'Atazanavir',
        fechaResult2: '30/12/22',
        creatinina: '1.3',
    },
    }
  ]

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
        <FlatList data={datos} renderItem={({ item }) =>
          <FlatListPerfil
            fecha={item.fecha}
            medico={item.medico}
            seguimiento={item.seguimiento}
          />
        } keyExtractor={item => item.uid.toString()}>

        </FlatList>
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