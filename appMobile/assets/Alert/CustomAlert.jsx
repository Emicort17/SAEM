import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import animations from './animations';

const CustomAlert = ({ isVisible, onClose, message, animationName }) => (
    <Modal visible={isVisible} transparent animationType="fade">
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <LottieView
                    source={animations[animationName]}
                    autoPlay
                    loop
                    style={{ width: 100, height: 100 }}
                />
                <Text style={styles.modalText}>{message}</Text>
                <TouchableOpacity
                    style={styles.closeButton}
                    onPress={onClose}>
                    <Text style={styles.textStyle}>Cerrar</Text>
                </TouchableOpacity>
            </View>
        </View>
    </Modal>
);

export default CustomAlert;

const styles = StyleSheet.create({
centeredView: {
    flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
},
modalView: {
    margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
            height: 2
    },
    shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
},
closeButton: {
    backgroundColor: "#2196F3",
        borderRadius: 20,
        padding: 10,
        elevation: 2
},
textStyle: {
    color: "white",
        fontWeight: "bold",
        textAlign: "center"
},
modalText: {
    marginBottom: 15,
        textAlign: "center"
}
})