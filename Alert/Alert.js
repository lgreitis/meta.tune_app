import React from 'react';
import { Platform, StyleSheet, View, Text, TouchableOpacity, Modal } from 'react-native';
export default props => {

  const { isOpen, close, message } = props;
  return (
    <View style={styles.MainContainer} >
      <Modal visible={isOpen} transparent={true}>

        <View style={{
          flex: 1, alignItems: 'center', justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }}>

          <View style={styles.Alert_Main_View}>

            <Text style={styles.Alert_Message}> {message} </Text>

            <View style={{ width: '100%', height: 1 }} />


            <View style={{ flexDirection: 'row', }}>

              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={close}
                activeOpacity={0.7}
              >
                <Text style={styles.TextStyle}> OK </Text>

              </TouchableOpacity>

            </View>

          </View>

        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: (Platform.OS == 'ios') ? 20 : 0
  },

  Alert_Main_View: {

    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#44475a",
    height: 150,
    width: '90%',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 25,
  },

  Alert_Message: {

    fontSize: 20,
    color: "#fff",
    textAlign: 'center',
    padding: 10,
    height: '42%'

  },

  buttonStyle: {

    width: '25%',
    height: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#bd93f9',
    marginTop: 5
  },

  TextStyle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 25,
  },

});