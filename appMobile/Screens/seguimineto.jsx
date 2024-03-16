import { StyleSheet, Text, View, TextInput, Alert, Image, ScrollView } from 'react-native';

Seguimineto = ({route}) => {


    const seguimiento = route.params.seguimiento;

    return (
        <View style={styles.allScreen}>
            <Text style={styles.title} >Informe de Seguimineto</Text>

            <View style={styles.container}>
                <View style={styles.contImputs}>

                    <View style={styles.flex}>
                        <Text style={styles.comp} >Enfermedad: <Text style={styles.compdatos}>{seguimiento.enfermedad}</Text></Text>
                        <Text style={styles.comp} >Fecha:<Text style={styles.compdatos}> {seguimiento.fecha}</Text></Text>

                    </View>
                    <Text style={styles.comp} >Resultado:<Text style={styles.compdatos}> {seguimiento.resultado}</Text></Text>
                    <Text style={styles.comp} >Fecha de toma confirmatoria:<Text style={styles.compdatos}> {seguimiento.fechaToma}</Text></Text>
                    <Text style={styles.comp} >Fecha de resultados:<Text style={styles.compdatos}> {seguimiento.fechaResult}</Text></Text>
                    <Text style={styles.comp} >Carga viral:<Text style={styles.compdatos}> {seguimiento.cargaViral}</Text></Text>
                    <Text style={styles.comp} >AST:<Text style={styles.compdatos}> {seguimiento.AST}</Text> U/L</Text>
                    <Text style={styles.comp} >Plaquetas:<Text style={styles.compdatos}> {seguimiento.plaquetas}</Text> ml</Text>
                    <Text style={styles.comp} >Antiretroviral:<Text style={styles.compdatos}> {seguimiento.antiretroviral}</Text></Text>
                    <Text style={styles.comp} >2 Toma confirmatoria</Text>
                    <Text style={styles.comp} >Fecha de resultado:<Text style={styles.compdatos}>  {seguimiento.fechaResult2}</Text></Text>
                    <Text style={styles.comp} >Creatinina:<Text style={styles.compdatos}> {seguimiento.creatinina}</Text> mg/dl</Text>

                </View>

            </View>

        </View>

    )
}
export default Seguimineto;


const styles = StyleSheet.create({

    title: {
        width: '100%',
        fontSize: 28,
        textAlign: 'center',
        marginBottom: 10,
        fontWeight: 'bold',
        color: '#092088'
    },
    flex:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:5,
    },

    allScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffff',
    },

    container: {
        top: 20,
        padding: 40,
        marginBottom: 50,
        alignItems: 'center',
        backgroundColor: 'white',
        width: 350,
        borderRadius: 20,
    },

    img: {
        width: 150,
        height: 150,
        marginBottom: 50,
    },

    contImputs: {

        justifyContent: 'center',
        width: 340,
    },

    comp: {
        fontSize: 17,
        color: '#092088',
        fontWeight: 'bold',
        marginBottom: 10,
    },

    compdatos: {
        fontSize: 17,
        color: '#000',
        fontWeight: '500',

    },
})
