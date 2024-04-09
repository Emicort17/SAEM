import { StyleSheet, Text, View, TextInput, Alert, Image, ScrollView } from 'react-native';

Seguimineto = ({ route }) => {


    const seguimiento = route.params.seguimiento;

    return (
        <View style={styles.allScreen}>
            <Text style={styles.title} >Informe de visita</Text>

            <View style={styles.container}>
                <View style={styles.contImputs}>

                    <View style={styles.flex}>
                        <Text style={styles.comp} >Enfermedad: <Text style={styles.compdatos}>{seguimiento.disease ?? 'Sin datos'}</Text></Text>
                        <Text style={styles.comp} >Fecha:<Text style={styles.compdatos}> {seguimiento.startDate ?? 'Sin datos'}</Text></Text>

                    </View>
                    <Text style={styles.comp} >Resultado:<Text style={styles.compdatos}> {seguimiento.result ?? 'Sin datos'}</Text></Text>
                    <Text style={styles.comp} >Fecha de resultados:<Text style={styles.compdatos}>
                        {seguimiento.resultBeans && seguimiento.resultBeans[0] && seguimiento.resultBeans[0].resultDate ? seguimiento.resultBeans[0].resultDate : 'Sin datos'}
                    </Text></Text>
                    <Text style={styles.comp} >Carga viral:<Text style={styles.compdatos}>
                        {seguimiento.resultBeans && seguimiento.resultBeans[0] && seguimiento.resultBeans[0].labDataBean ? (seguimiento.resultBeans[0].labDataBean.viralLoad ?? '0') : 'Sin datos'}
                    </Text></Text>
                    <Text style={styles.comp} >AST:<Text style={styles.compdatos}>
                        {seguimiento.resultBeans && seguimiento.resultBeans[0] && seguimiento.resultBeans[0].labDataBean ? (seguimiento.resultBeans[0].labDataBean.ast ?? '0') : 'Sin datos'}
                    </Text> U/L</Text>
                    <Text style={styles.comp} >Plaquetas:<Text style={styles.compdatos}>
                        {seguimiento.resultBeans && seguimiento.resultBeans[0] && seguimiento.resultBeans[0].labDataBean ? (seguimiento.resultBeans[0].labDataBean.platelets ?? '0') : 'Sin datos'}
                    </Text> ml</Text>
                   
                    <Text style={styles.comp} >Antigenos:<Text style={styles.compdatos}>
                        {seguimiento.resultBeans && seguimiento.resultBeans[0] && seguimiento.resultBeans[0].labDataBean ? (seguimiento.resultBeans[0].labDataBean.antigen ?? 'Sin datos') : 'Sin datos'}
                    </Text></Text>

                    <Text style={styles.comp} >Creatinina:<Text style={styles.compdatos}>
                        {seguimiento.resultBeans && seguimiento.resultBeans[0] && seguimiento.resultBeans[0].labDataBean ? (seguimiento.resultBeans[0].labDataBean.creatinine ?? '0') : 'Sin datos'}
                    </Text> mg/dl</Text>

                    <Text style={styles.comp2} >Tratamiento </Text>


                    <Text style={styles.comp} >Indicaciones:<Text style={styles.compdatos}>
                    {' '+seguimiento.treatmentBeans && seguimiento.treatmentBeans[0] && seguimiento.treatmentBeans[0].medicineBeans[0] ? (seguimiento.treatmentBeans[0].medicineBeans[0].name)+' ' : 'Sin datos'} 
                    {seguimiento.treatmentBeans && seguimiento.treatmentBeans[0]? (seguimiento.treatmentBeans[0].indications) : 'Sin datos'}

                    </Text> </Text>


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
        marginBottom: 0,
        fontWeight: 'bold',
        color: '#092088'
    },
    flex: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
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
    comp2: {
        width: '100%',
        fontSize: 20,
        textAlign: 'center',

        color: '#092088',
        fontWeight: 'bold',
        marginBottom: 15 ,
    },


    compdatos: {
        fontSize: 17,
        color: '#000',
        fontWeight: '500',

    },
})
