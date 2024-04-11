import { useNavigation } from '@react-navigation/native';
import { Button } from "@rneui/themed";
import { View,StyleSheet,Text } from "react-native";



FlatListPerfil= ({fecha,resultado, enfermedad,seguimiento,}) =>{
    
    const navigation = useNavigation();

  let send=()=>{

    navigation.navigate('Seguimiento', { seguimiento: seguimiento });
}

    return(
        <View style={styles.container}>
            <View style={{flexDirection: 'row', marginBottom: 5}}>
                <Text style={styles.header}>Enfermedad</Text>
                <Text style={styles.header}>Resultado</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.text}>{enfermedad}</Text>
                <Text style={styles.text}>{resultado}</Text>
                <Button
                    buttonStyle={styles.btn}
                    onPress={send}
                    title="Ver mas"
                    titleStyle={styles.titlebtn}
                />
            </View>
            <Text style={styles.date}>Fecha: {fecha}</Text>
        </View>
    ) 
}


const styles = StyleSheet.create({

    container:{
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection:'col',
        justifyContent: 'center',
        width:340,
        height:85,
        backgroundColor:'#f8f6f6',
        borderRadius:10
    },
    content:{
      flexDirection: 'row',
        justifyContent:'space-between',
    },
    header:{
        fontSize:15,
        fontWeight:'bold',
        marginRight: 24
    },
    text:{
        fontSize: 16
    },
    btn:{
        width:90,
        height:35,
        backgroundColor:'#083565',
        borderRadius:5,
        right:0
    },
    titlebtn:{
        textAlign:'center',
        alignItems:'center',
        fontSize:13,
        fontWeight:'bold',
        color:'#ffffff'
    },
    date:{
        fontSize: 16,
        color: 'gray'
    }


})

export default FlatListPerfil;

