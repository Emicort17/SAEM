import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import AxiosClient from '../config/http/AxiosClient'; // Asegúrate de que la ruta sea correcta

const Seguimiento = ({ route }) => {
    const [detallesMedicina, setDetallesMedicina] = useState({});
    const seguimiento = route.params.seguimiento;

    const obtenerDetallesMedicinaPorId = async (id) => {
        if (!detallesMedicina[id]) { // Verifica si ya hemos cargado los detalles de esta medicina
            try {
                const response = await AxiosClient.get(`medicine/getOne/${id}`);
                if (response.status === "OK" && !response.error) {
                    // Actualiza el estado con los nuevos detalles de la medicina
                    setDetallesMedicina(prevState => ({
                        ...prevState,
                        [id]: response.data
                    }));
                } else {
                    console.error("Error al recuperar los detalles de la medicina:", response.message);
                }
            } catch (error) {
                console.error("Error en la petición Axios:", error);
            }
        }
    };

    // Carga los detalles de las medicinas por ID cuando el componente se monta
    useEffect(() => {
        seguimiento.treatmentBeans.forEach(treatment => {
            treatment.medicineBeans.forEach(medicineId => {
                if (typeof medicineId === 'number') {
                    obtenerDetallesMedicinaPorId(medicineId);
                }
            });
        });
    }, [seguimiento.treatmentBeans]);

    return (
        <ScrollView style={styles.allScreen} contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.title}>Informe de visita</Text>
            <View style={styles.container}>
                {seguimiento.treatmentBeans && seguimiento.treatmentBeans.map((treatment, index) => (
                    <View key={index}>
                        <Text style={styles.comp}>Tratamiento {index + 1}</Text>
                        <Text style={styles.comp}>Indicaciones: <Text style={styles.compdatos}>{treatment.indications ?? 'Sin datos'}</Text></Text>
                        {treatment.medicineBeans.map((medicineId, medIndex) => (
                            <View key={medIndex}>
                                <Text style={styles.comp}>Medicina {medIndex + 1}:</Text>
                                {typeof medicineId === 'number' ? (
                                    detallesMedicina[medicineId] ? (
                                        <>
                                            <Text style={styles.comp}>Nombre: <Text style={styles.compdatos}>{detallesMedicina[medicineId].name}</Text></Text>
                                            <Text style={styles.comp}>Fabricante: <Text style={styles.compdatos}>{detallesMedicina[medicineId].manufacturer}</Text></Text>
                                            <Text style={styles.comp}>Presentación: <Text style={styles.compdatos}>{detallesMedicina[medicineId].presentation}</Text></Text>
                                        </>
                                    ) : (
                                        <Text>Cargando detalles de la medicina...</Text>
                                    )
                                ) : (
                                    <>
                                        <Text style={styles.comp}>Nombre: <Text style={styles.compdatos}>{medicineId.name}</Text></Text>
                                        <Text style={styles.comp}>Fabricante: <Text style={styles.compdatos}>{medicineId.manufacturer}</Text></Text>
                                        <Text style={styles.comp}>Presentación: <Text style={styles.compdatos}>{medicineId.presentation}</Text></Text>
                                    </>
                                )}
                            </View>
                        ))}
                    </View>
                ))}

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

                    <Text style={styles.comp} >Antígenos:<Text style={styles.compdatos}>
                        {seguimiento.resultBeans && seguimiento.resultBeans[0] && seguimiento.resultBeans[0].labDataBean ? (seguimiento.resultBeans[0].labDataBean.antigen ?? 'Sin datos') : 'Sin datos'}
                    </Text></Text>

                    <Text style={styles.comp} >Creatinina:<Text style={styles.compdatos}>
                        {seguimiento.resultBeans && seguimiento.resultBeans[0] && seguimiento.resultBeans[0].labDataBean ? (seguimiento.resultBeans[0].labDataBean.creatinine ?? '0') : 'Sin datos'}
                    </Text> mg/dl</Text>
            </View>
        </ScrollView>
    );
};

export default Seguimiento;

                    const styles = StyleSheet.create({
                    // Tus estilos existentes aquí
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
