import { StyleSheet, Text, View, TextInput, Alert, Image, ScrollView } from 'react-native';


const datos = [
    {
        nombre:'Martin',
        medico:'Lauro',
        telefono:'774569797',
        pais:'Mexico',
        municipio:'Xochitepec',
        estado:'Morelos',
        nacimineto:'Morelos',
        sexo:'Masculino',
        curp:'OEMM938402HMEORNT6',
        enfermedad:'Sida',
        fechapade:'20/12/22',
        resultado:'Posiivo',
        fechainicio:'05/06/2004',
    },
  ];


Expediente = () => {


 
      return(

      
    <View style={styles.allScreen}>

        <View style={styles.container}>

        <Image style={styles.img} source={require('../assets/Images/Login.png')}></Image>

        <View style={styles.contImputs}>

            <Text style={styles.comp} >Nombre: <Text style={styles.compdatos}>{datos[0].nombre}</Text></Text>
            <Text style={styles.comp} >Medico tratante:<Text style={styles.compdatos}> {datos[0].medico}</Text></Text>
            <Text style={styles.comp} >Telefono:<Text style={styles.compdatos}> {datos[0].telefono}</Text></Text>
            <Text style={styles.comp} >Pais:<Text style={styles.compdatos}> {datos[0].pais}</Text></Text>
            <Text style={styles.comp} >Municipio:<Text style={styles.compdatos}> {datos[0].municipio}</Text></Text>
            <Text style={styles.comp} >Estado:<Text style={styles.compdatos}> {datos[0].estado}</Text></Text>
            <Text style={styles.comp} >Estado de nacimiento:<Text style={styles.compdatos}> {datos[0].nacimineto}</Text></Text>
            <Text style={styles.comp} >Sexo:<Text style={styles.compdatos}> {datos[0].sexo}</Text></Text>
            <Text style={styles.comp} >CURP:<Text style={styles.compdatos}> {datos[0].curp}</Text></Text>
            <Text style={styles.comp} >Enfermedad cronica:<Text style={styles.compdatos}>  {datos[0].enfermedad}</Text></Text>
            <Text style={styles.comp} >Fecha de padecimiento:<Text style={styles.compdatos}> {datos[0].fechapade}</Text></Text>
            <Text style={styles.comp} >Resultado:<Text style={styles.compdatos}> {datos[0].resultado}</Text></Text>
            <Text style={styles.comp} >Fecha de inicio de tratamiento:<Text style={styles.compdatos}> {datos[0].fechainicio}</Text></Text>

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
