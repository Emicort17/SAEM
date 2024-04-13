import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  FlatList,
  SafeAreaView,
  RefreshControl,
  ScrollView
} from 'react-native';
import * as React from "react";
import { Button } from "@rneui/base";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FlatListPerfil from './FlatListPerfil';
import { useAuth } from '../config/context/AuthContext';
import { useEffect, useState } from 'react';
import AxiosClient from '../config/http/AxiosClient';

Perfil = () => {
  const { userData, onLoginSuccess } = useAuth('');
  const [datos, setPersonResponse] = useState([]);
  const id = userData.user.id;
  const [refreshing, setRefreshing] = useState(false);
  const [query, setQuery] = useState('')
  const [filterData, setFilterData] = useState([])
  const handleSearch = () =>{

    if(query !== ''){
      const searchData = filterData.filter((item) => search(item, query))

      setPersonResponse(searchData)

      console.log(searchData)
      console.log(query)
    }else{
      //setUsers(filterData)
      console.log('HOla '+query)
    }

  }

  const search = (item, search) =>{
    const {disease, startDate, result} = item

    return  disease.toLowerCase().includes(search.toLowerCase()) || startDate.toLowerCase().includes(search.toLowerCase()) || result.toLowerCase().includes(search.toLowerCase())
  }

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      await getPerson()
    }finally {
      setRefreshing(false)
    }
  }, []);

  const getPerson = async () => {
    try {
      const response = await AxiosClient.get(`patient/diagnostic/findAll/${id}`);
      if (response.data) {
        setPersonResponse(response.data);
        setFilterData(response.data)
      }
    } catch (error) {
      console.error('Error al encontrar el paciente:', error);
    }
  };



  useEffect(() => {
    getPerson();
    const intervalId = setInterval(() => {
      getPerson();
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);



  return (

    <View style={styles.allScreen}>
      <View style={styles.contSearch}>
        <TextInput style={styles.search} value={query} onChangeText={setQuery} placeholder='Buscar...' />
        <Button
            buttonStyle={styles.btnSearch}
            containerStyle={{}}
            linearGradientProps={null}
            icon={<Icon name="magnify" size={25} color="#ffffff" />}
            iconContainerStyle={{ background: "#03104A" }}
            loadingProps={{ animating: true }}
            loadingStyle={{}}
            onPress={handleSearch}
            titleProps={{}}
            titleStyle={{ marginHorizontal: 5 }}
        />
      </View>

      <SafeAreaView style={styles.list}>
        {datos.length > 0 ? (
            <FlatList
                data={datos}
                renderItem={({ item }) => (
                    <FlatListPerfil
                        fecha={item.startDate}
                        resultado={item.result}
                        enfermedad={item.disease}
                        seguimiento={item}
                    />
                )}
                keyExtractor={(item) => item.id?.toString()}
                refreshControl={
                  <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                ItemSeparatorComponent={() => (
                    <View style={{ height: 20 }} />
                )}
                ListHeaderComponent={() => (
                    <View style={styles.header}>
                      <Text style={{marginBottom: 8}}>Arrastra la pantalla hacia abajo para restablecer</Text>
                    </View>
                )}
            />
        ) : (
            <ScrollView
                style={{width: '100%'}}
                refreshControl={
              <RefreshControl style={{ alignSelf: 'center' }} refreshing={refreshing} onRefresh={onRefresh} />
            }>
              { refreshing? (<Text style={{color:'gray'}}>Cargando...</Text>): (<Text style={{color: 'gray', textAlign:'center'}}>No hay datos disponibles. Arrastre la pantlla hacia abajo para actualizarla</Text>)}
            </ScrollView>
        )}
      </SafeAreaView>
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
    position: 'relative',
    top: 0,
    marginTop: 100
  }
});