import React from 'react';
import { Platform, StyleSheet, View, Text, TouchableOpacity, Modal } from 'react-native';
export default props => {

  const { isOpen, close, message } = props;
  return (

      <Modal visible={isOpen} transparent={true} statusBarTranslucent={true} animationType={'fade'} >
        <View style={styles.overlay}>
          <View style={styles.alertContainer}>
            <View style={styles.alertMessageContainer}>
              <Text style={styles.alertMessage}> {message} </Text>
            </View>
            <TouchableOpacity style={styles.alertButtonContainer} onPress={close}>
              <View style={styles.alertButton}>
                <Text style={[styles.alertButtonText]}>{"OK"}</Text>
              </View>

            </TouchableOpacity>

          </View>
        </View>
      </Modal>
  );
}

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: (Platform.OS == 'ios') ? 20 : 0
  },
  alertContainer: {
    //flex: 1,
    width: '80%',
    minHeight: 100,
    backgroundColor: "#44475a",
    borderRadius: 20,
  },
  alertMessageContainer: {
    alignContent: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    flexGrow: 1,
    minWidth: 50,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },

  alertMessage: {
    fontSize: 24,
    color: "#fff",
    textAlign: 'center',
    padding: 10,
  },
  alertButtonContainer: {
    flex: 1,
    maxHeight: 80,
    minHeight: 80,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    paddingBottom: 50,
  },
  alertButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 25,
  },
  alertButton: {
    backgroundColor: '#bd93f9',
    height: 50,
    width: '80%',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  blur: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
});