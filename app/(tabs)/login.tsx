import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const LoginScreen = () => {
  return (
    <View style={styles.view}>
        <Text>Hello World</Text>
    </View>
  )
}

export default LoginScreen;

const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
})
