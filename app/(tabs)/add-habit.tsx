import { DataType } from '@/lib/types/habits';
import React, { useState } from 'react';
import {View, StyleSheet} from 'react-native';
import { Button, SegmentedButtons, TextInput } from 'react-native-paper';

const FREQUENCIES = ["daily", "weekly", "monthly"];

const AddHabitScreen = () => {
    const [data, setData]  = useState<DataType>({
        title: "",
        description: "",
        frequency: "daily",
    })
  return (
    <View style={styles.container}>
        <TextInput
          style={styles.input}
          label="Title"
          mode="outlined"
          onChangeText={(text) => setData(prev => {
            return {
                ...prev,
                title: text
            }
          })}
        />
        <TextInput
          style={styles.input}
          label="Description"
          mode="outlined"
          onChangeText={(text) => setData(prev => {
            return {
                ...prev,
                description: text
            }
          })}
        />
        <View style={styles.frequencyContainer}>
          <SegmentedButtons
            value={data.frequency}
            onValueChange={(value) => setData(prev => {
              return {
                ...prev,
                frequency: value
              }
            })}
            style={styles.segmentedButtons}
            buttons={FREQUENCIES.map(item => (
              {label: item.charAt(0), value: item}
            ))}
          />
        </View>
        <Button style={styles.habitBtn} mode='contained'>Add Habit</Button>

    </View>
  )
}

export default AddHabitScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#f5f5f5",
        color: "black",
        justifyContent: "center"

    },
    input: {
        marginBottom: 16,
    },
    frequencyContainer: {
        marginBottom: 24,
    },
    segmentedButtons: {
        marginBottom: 8,
    },
    habitBtn: {
        marginTop: 8,
    }
})
