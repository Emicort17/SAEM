import { StyleSheet, Text, View, TextInput, Alert, Image, ScrollView } from 'react-native';
import { useAuth } from '../config/context/AuthContext';
import { useEffect, useState } from 'react';
import AxiosClient from '../config/http/AxiosClient';




Expediente = () => {

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
  
  
 
      return(

      
        <View style={styles.allScreen}>
        <View style={styles.container}>
          <Image style={styles.img} source={require('../assets/Images/Login.png')} />
          <View style={styles.contImputs}>
            {datos && (
              <>
                <Text style={styles.comp} >Nombre: <Text style={styles.compdatos}>{datos?.userBean.personBean.name ?? 'Sin datos'}</Text></Text>
                <Text style={styles.comp} >Medico tratante:<Text style={styles.compdatos}> {datos?.userBean.personBean.name ?? 'Sin datos'}</Text></Text>
                <Text style={styles.comp} >Telefono:<Text style={styles.compdatos}> {datos?.userBean.personBean.phoneNumber ?? 'Sin datos'}</Text></Text>
                <Text style={styles.comp} >Pais:<Text style={styles.compdatos}> {datos?.userBean.personBean.addressBean.state ?? 'Sin datos'}</Text></Text>
                <Text style={styles.comp} >Municipio:<Text style={styles.compdatos}> {datos?.userBean.personBean.addressBean.town ?? 'Sin datos'}</Text></Text>
                <Text style={styles.comp} >Estado:<Text style={styles.compdatos}> {datos?.userBean.personBean.addressBean.state ?? 'Sin datos'}</Text></Text>
                <Text style={styles.comp} >Estado de nacimiento:<Text style={styles.compdatos}> {datos?.userBean.personBean.birthplace ?? 'Sin datos'}</Text></Text>
                <Text style={styles.comp} >Sexo:<Text style={styles.compdatos}> {datos?.userBean.personBean.sex ?? 'Sin datos'}</Text></Text>
                <Text style={styles.comp} >CURP:<Text style={styles.compdatos}> {datos?.userBean.personBean.curp?? 'Sin datos'}</Text></Text>
                <Text style={styles.comp} >Enfermedad cronica:<Text style={styles.compdatos}>  {datos?.medicalRecordBean.diagnosticBeans[0].disease ?? 'Sin datos'}</Text></Text>
                <Text style={styles.comp} >Fecha de padecimiento:<Text style={styles.compdatos}> {datos?.medicalRecordBean.diagnosticBeans[0].startDate?? 'Sin datos'}</Text></Text>
                <Text style={styles.comp} >Resultado:<Text style={styles.compdatos}> {datos?.medicalRecordBean.diagnosticBeans[0].result ?? 'Sin datos'}</Text></Text>
                <Text style={styles.comp} >Fecha de inicio de tratamiento:<Text style={styles.compdatos}> {datos?.medicalRecordBean.diagnosticBeans[0].startDate?? 'Sin datos'}</Text></Text>
              </>
            )}
          </View>
        </View>
      </View>

)
}

export default Expediente;

const styles = StyleSheet.create({

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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffff',
    },
    container: {
        top: 20,
        padding: 20,
        marginBottom: 50,
        alignItems: 'center',
        backgroundColor: 'white',
        width: 350,
        borderRadius: 20,
        borderWidth: 1,
    },
    img: {
        width: 150,
        height: 150,
        marginBottom:50,
    },
    contImputs: {

        justifyContent: 'center',
        width: 300,
    },

    comp: {
        fontSize: 16,
        color: '#092088',
        fontWeight: 'bold',
        marginBottom:5,
    },

    compdatos: {
        fontSize: 16,
        color: '#000',
        fontWeight:'500',

    },



   





})
