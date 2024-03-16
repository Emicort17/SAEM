import { useNavigation } from '@react-navigation/native';
import { Button } from "@rneui/themed";
import { View,StyleSheet,Text } from "react-native";



FlatListPerfil= ({fecha,medico,seguimiento}) =>{
    
    const navigation = useNavigation();

  let send=()=>{

    navigation.navigate('Seguimiento', { seguimiento: seguimiento });
}

    return(

        <View style={styles.list}>
            <Text style={styles.txt}>{fecha}</Text>
            <Text style={styles.txt}>{medico}</Text>

            <Button
              buttonStyle={styles.btn}
              onPress={send}
              title="Ver mas"
              titleStyle={styles.titlebtn}
            />
        </View>
    ) 
}


const styles = StyleSheet.create({

    list:{
        paddingLeft:20,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        width:340,
        height:60,
        backgroundColor:'#F9F9F9',
        marginBottom:30,
        borderRadius:5
    },  
    txt:{
        
        fontSize:15,
        fontWeight:'bold',
    },  
    btn:{
        width:90,
        height:35,
        backgroundColor:'#083565', 
        borderRadius:5,
        right:0,
        marginRight:10
    },
    titlebtn:{
        textAlign:'center',
        alignItems:'center',
        fontSize:13,
        fontWeight:'bold',
        color:'#ffffff'
    }


}) 

export default FlatListPerfil;

