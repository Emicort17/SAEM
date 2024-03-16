import React, { useState, useEffect } from 'react';
import { Button, LinearGradient } from '@rneui/themed';
import { StyleSheet, Text, View, Image, Modal, Alert, TextInput} from 'react-native';

const Pokedex = () => {
  const [urlimg, setUrl] = useState('https://pokeapi.co/api/v2/pokemon/ditto');
  const [name, setName] = useState('¿Quién es ese Pokémon?');
  const [modal, setModalVisible] = useState(false);
  const [NombrePokemon, setnombre] = useState('ditto');

  const showAlert = () => {
    Alert.alert(
      '¿Te gusta Pokémon?',
      'Dependiendo de tu respuesta será el resultado',
      [{ text: 'Si', onPress: () =>{ getPokemon();}}, { text: 'No', onPress: () => {setModalVisible(false)} }]
    );
  };
  
  const getPokemon = async () => {
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${NombrePokemon.toLowerCase()}` ;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        console.log(data.name);
        setUrl(data.sprites.front_shiny);
        setName(data.name);
      } else {
        Alert.alert(
          'No se encontraron coincidencias', 
          `No existe un Pokémon con el nombre: ${NombrePokemon} `, 
          [{
            text: 'Ok', onPress: () => {
              setModalVisible(false);
              setnombre('')
            }
          }]
        )
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const closeModal = () =>{
    setModalVisible(false);
  }

  return ( 
    <View style={styles.container}>
      <Text style={{ fontSize: 20, marginBottom: 20}} >
        {NombrePokemon}
      </Text>
      <TextInput placeholder='Introduce el nombre de un Pokémon' value={NombrePokemon} onChangeText={text => setnombre(text)} style={{ fontSize: 15, marginBottom: 20}}/>
      <Button title='Bienvenido' onPress={() => setModalVisible(!modal)}/>
      <Modal animationType='slide' transparent={true} visible={modal}>
        <View style={styles.modalView}>
          <View style={styles.cerrar} >
            <Button color={'black'} title='X' onPress={closeModal} />
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center'}} >
          <Image source={{ uri: urlimg }} style={styles.circulo} />
          <Text style={{ fontSize: 20, marginBottom: 20 }}>{name.charAt(0).toUpperCase() + name.slice(1)}</Text>
          <Button ViewComponent={LinearGradient}
  linearGradientProps={{
    colors: ["#FF9800", "#F44336"],
    start: { x: 0, y: 0.5 },
    end: { x: 1, y: 0.5 },
  }}  title='Descubrir al Pokémon' onPress={showAlert}/>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Pokedex;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdf5e6',
    alignItems: 'center',
    justifyContent: 'center',
  },  
  circulo: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: 'black',
    borderRadius: 5,
    width: 100,
    height: 100,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#F2F5A9',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  cerrar:{
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
});
