import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import capitalizeWord from "@mfurqanabbas20/capitalize-word";

const StreaksScreen = () => {
  return (
    <View style={styles.view}>
      <Text>{capitalizeWord('hhh')} </Text>
    </View>
  )
}

export default StreaksScreen;

const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
})
