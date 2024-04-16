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
import {SearchBar} from "@rneui/themed";

Perfil = () => {
  const { userData, onLoginSuccess } = useAuth('');
  const [datos, setPersonResponse] = useState([]);
  const id = userData.user.id;
  const [refreshing, setRefreshing] = useState(false);
  const [query, setQuery] = useState('')
  const [filterData, setFilterData] = useState([])
  const handleSearch = (q) => {
    let getSearch = q;

    if (getSearch !== '') {
      const searchData = filterData.filter((item) => search(item, getSearch));
      setPersonResponse(searchData);
    } else {
      setPersonResponse(filterData);
    }
    setQuery(getSearch);
  }

  const search = (item, search) => {
    const { disease, startDate, result } = item;
    return disease.toLowerCase().includes(search.toLowerCase()) ||
        startDate.toLowerCase().includes(search.toLowerCase()) ||
        result.toLowerCase().includes(search.toLowerCase());
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
        <SearchBar
            placeholder="Buscar..."
            onChangeText={handleSearch}
            value={query}
            containerStyle={styles.containerSearch}  // Estilos para el contenedor exterior
            inputContainerStyle={styles.inputContainerSearch}  // Estilos para el contenedor interno del input
            inputStyle={styles.inputSearch}  // Estilos para el input
            placeholderTextColor='rgba(255, 255, 255, 0.7)'  // Color del placeholder
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
                      <Text style={{marginBottom: 8}}>Arrastra la pantalla hacia abajo para actualizar</Text>
                    </View>
                )}
            />
        ) : (
            <ScrollView
                style={{width: '100%'}}
                refreshControl={
              <RefreshControl style={{ alignSelf: 'center' }} refreshing={refreshing} onRefresh={onRefresh} />
            }>
              { refreshing? (<Text style={{color:'gray'}}>Cargando...</Text>): (<Text style={{color: 'gray', textAlign:'center'}}>No hay datos disponibles. Arrastre la pantlla hacia abajo para restablecer</Text>)}
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
  containerSearch: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    width: '100%',
  },
  inputContainerSearch: {
    backgroundColor: '#083565',
    borderRadius: 10,
  },
  inputSearch: {
    color: 'white',
    fontSize: 18,
  },
  contSearch: {
    position: 'absolute',
    marginTop: 25,
    top: 0,
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 20,
  },
  search: {
    flex: 1,
    height: 50,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#083565',
    color: 'white',
    fontSize: 18,
    backgroundColor: '#083565',
    paddingLeft: 15,
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
  img: {
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