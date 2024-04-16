import { StyleSheet, Text, View, TextInput, Alert, Image, ScrollView } from 'react-native';
import { useAuth } from '../config/context/AuthContext';
import { useEffect, useState } from 'react';
import AxiosClient from '../config/http/AxiosClient';
import Fondo from './../assets/Images/fondo.png'




Expediente = () => {

  const { userData, onLoginSuccess } = useAuth('');
  const [datos, setPersonResponse] = useState();
  const curp = userData.user.personBean.curp;
  const name = userData.user.personBean.name[0];

  console.log(curp)
  console.log(name)

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

    <ScrollView>
      <View style={styles.allScreen}>
        <Image source={Fondo} style={styles.backgroundImage} />
        <View style={styles.img}>
          <Text style={styles.compimg}>{name}</Text>
        </View>
        <View style={styles.container}>


          <View style={styles.contImputs}>
            {datos && (
              <>
                <Text style={styles.comp} >
                  Nombre:
                </Text>
                <View style={styles.dato}>
                  <Text style={styles.compdatos}>
                    {(datos?.userBean.personBean.name ?? 'Sin datos ') +' '+(datos?.userBean.personBean.middleName ?? ' ') +
                    ' '+  (datos?.userBean.personBean.lastName ?? ' ')}
                  </Text>
                </View>
                <Text style={styles.comp} >Teléfono: </Text>
                <View style={styles.dato}>
                  <Text style={styles.compdatos}> {datos?.userBean.personBean.phoneNumber ?? 'Sin datos'}</Text>
                </View>
                <Text style={styles.comp} >País:</Text>
                <View style={styles.dato}>
                  <Text style={styles.compdatos}> {datos?.userBean.personBean.addressBean.state ?? 'Sin datos'}</Text>
                </View>
                <Text style={styles.comp} >Estado:</Text>
                <View style={styles.dato}>
                  <Text style={styles.compdatos}> {datos?.userBean.personBean.addressBean.state ?? 'Sin datos'}</Text>
                </View>

                <Text style={styles.comp} >Municipio:</Text>
                <View style={styles.dato}>
                  <Text style={styles.compdatos}> {datos?.userBean.personBean.addressBean.town ?? 'Sin datos'}</Text>
                </View>

                <Text style={styles.comp} >CP:</Text>
                <View style={styles.dato}>
                  <Text style={styles.compdatos}> {datos?.userBean.personBean.addressBean.zip ?? 'Sin datos'}</Text>
                </View>
                <Text style={styles.comp} >Estado de nacimiento:</Text>
                <View style={styles.dato}>
                  <Text style={styles.compdatos}> {datos?.userBean.personBean.birthplace ?? 'Sin datos'}</Text>
                </View>
                <Text style={styles.comp} >Fecha de nacimiento:</Text>
                <View style={styles.dato}>
                  <Text style={styles.compdatos}> {datos?.userBean.personBean.birthdate ?? 'Sin datos'}</Text>
                </View>
                <Text style={styles.comp} >Sexo:</Text>
                <View style={styles.dato}>
                  <Text style={styles.compdatos}> {datos?.userBean.personBean.sex ?? 'Sin datos'}</Text>
                </View>
                <Text style={styles.comp} >CURP:</Text>
                <View style={styles.dato}>
                  <Text style={styles.compdatos}> {datos?.userBean.personBean.curp ?? 'Sin datos'}</Text>
                </View>
              </>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default Expediente;

const styles = StyleSheet.create({
  backgroundImage: {
    height: 150,
    width: '100%',
    zIndex: -10,
    position: 'absolute',
  },
  img: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
    height: 120,
    backgroundColor: '#092088',
    borderRadius: 100,
    position: 'absolute',
    zIndex: 10,
    top: 50,
    borderWidth: 5,
    borderColor: '#ccc'
  },
  title: {
    width: '100%',
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#092088'
  },
  allScreen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffff',
  },
  container: {
    marginTop: 150,
    top: 20,
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'white',
    width: 350,
    marginBottom: 25,
  },
  contImputs: {
    justifyContent: 'center',
    width: 300,
  },
  comp: {
    fontSize: 16,
    color: '#014242',
    fontWeight: 'bold',
    marginBottom: 5,
    flexDirection: 'column'
  },
  compimg: {
    fontSize: 50,
    color: '#ffff',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  compdatos: {
    fontSize: 18,
    color: '#000',
    fontWeight: '500',

  },
  dato: {
    backgroundColor: '#f9f9f9',
    paddingTop: 7,
    paddingBottom: 4,
    paddingHorizontal: 5,
    borderRadius: 5,
  }

})
