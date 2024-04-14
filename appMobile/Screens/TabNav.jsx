import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Perfil from './miperfil';
import Configuracion from './settings';
import Expediente from './expediente';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import { useAuth } from '../config/context/AuthContext';

const Tab = createBottomTabNavigator();

const TabNav = () => {
  const { userData, onLoginSuccess } = useAuth(''); // Cambio de userType a userData


  const handleButtonPress = () => {
    Alert.alert(
      "¿Estás seguro que deseas cerrar sesión?",
      "",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Aceptar",
          onPress: () => {
            onLoginSuccess(null);
          }
        }
      ]
    );
  };

  return (
    <Tab.Navigator >
      <Tab.Screen
        name="Diagnósticos"
        component={Perfil}
        options={{
          tabBarShowLabel: false,
          headerShown: true,
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: "black",
          headerStyle: { backgroundColor: '#092088' },
          headerTitleStyle: { color: '#fff' },
          tabBarLabelStyle: { fontSize: 25 },
          tabBarIcon: ({ color, size, focused }) => (
            <View style={[styles.iconContainer, focused && styles.iconContainerActive]}>
                <Entypo name="folder" size={24} color={'#1C3344'} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Expediente"
        component={Expediente}
        options={{
          tabBarShowLabel: false,
          headerShown: true,
          headerTitleStyle: { color: '#fff' },
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: "black",
          headerStyle: { backgroundColor: '#092088' },
          tabBarLabelStyle: { fontSize: 25, },
          tabBarIcon: ({ color, size, focused }) => (
            <View style={[styles.iconContainer, focused && styles.iconContainerActive]}>
                <MaterialIcons name="person" color={'#1C3344'} size={30} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Configuración"
        component={Configuracion}
        options={{
          tabBarShowLabel: false,
          headerShown: true,
          headerTitleStyle: { color: '#fff' },
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: "black",
          headerStyle: { backgroundColor: '#092088' },
          tabBarLabelStyle: { fontSize: 25, },
          headerRight: () => (
            <TouchableOpacity onPress={handleButtonPress} style={styles.headerButton}>
              <Feather name="log-out" size={32} color="#fff" />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ color, size, focused }) => (
            <View style={[styles.iconContainer, focused && styles.iconContainerActive]}>
              <MaterialIcons name="settings" color={'#1C3344'} size={30} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainerActive: {
    backgroundColor: '#E5E5E5',
    borderRadius: 50,
    width: 40,
    height: 40,
  },
  headerButton: {
    marginRight: 15,
  },
});

export default TabNav;
