import { StyleSheet, Text, View, TextInput, Alert, Image, ScrollView } from 'react-native';


const Configuracion = () => {

    return (

        <ScrollView>
        <View style={styles.allScreen}>


                <View style={styles.container}>

                    <Text style={styles.title} >Perfil</Text>
                    <View style={styles.contImputs}>

               

                        <Text style={styles.comp} >Telefono</Text>
                        <TextInput style={styles.input} />
                        <Text style={styles.comp} >Estado</Text>
                        <TextInput style={styles.input} />
                        <Text style={styles.comp} >Municipio</Text>
                        <TextInput style={styles.input} />
                        <Text style={styles.comp} >CP</Text>
                        <TextInput style={styles.input} />
                        <Text style={styles.comp} >Colonia</Text>
                        <TextInput style={styles.input} />
                        <Text style={styles.comp} >Calle</Text>
                        <TextInput style={styles.input} />
                       

                        
                    </View>
                </View>
                <View style={styles.container}>

<Text style={styles.title} >Cuenta</Text>
<View style={styles.contImputs}>

<ScrollView>

    <Text style={styles.comp} >Usuario</Text>
    <TextInput style={styles.input} />
    <Text style={styles.comp} >Contraseña</Text>
    <TextInput style={styles.input} />
  

    </ScrollView>
</View>
</View>

        </View>        
        </ScrollView>
         
    );
}

const styles = StyleSheet.create({

    title: {
        width: '100%',
        fontSize: 25,
        textAlign: 'center',
        marginBottom:10,
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
        top:10,
        padding:20,
        marginBottom:50,
        alignItems: 'center',
        backgroundColor: 'white',
        width: 350,
        borderRadius: 20,
        borderWidth:1,
    },
    img: {
        position: 'absolute',
        top: 0,
        marginTop: 90,
        width: 180,
        height: 180,
    },
    contImputs: {

        justifyContent: 'center',
        width: 300,
    },

    comp: {
        fontSize: 15,
        color: '#092088',
        fontWeight: 'bold'

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
    }, status: {
        color: '#000000'
    }





})


export default Configuracion;

