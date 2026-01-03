import { COLLECTION_NAME, DATABASE_ID, databases, tableDatabases } from '@/lib/appwrite';
import { useAuth } from '@/lib/auth-context';
import { DataType } from '@/lib/types/habits';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {View, StyleSheet} from 'react-native';
import { ID } from 'react-native-appwrite';
import { Button, SegmentedButtons, Text, TextInput, useTheme } from 'react-native-paper';

const FREQUENCIES = ["daily", "weekly", "monthly"];

const AddHabitScreen = () => {
  const router = useRouter();
  const [data, setData]  = useState<DataType>({
      title: "",
      description: "",
      frequency: "daily",
  });
  const {user} = useAuth();
  const [error, setError] = useState<string>("");
  const theme = useTheme();

  const handleSubmit = async () => {
    console.log('databas id', DATABASE_ID, COLLECTION_NAME)
    if(!user) return;
    try {
      await tableDatabases.createRow(
      {
      databaseId: DATABASE_ID || "",
      tableId: COLLECTION_NAME || "",
      rowId: ID.unique(),
      data: {
        userId: user.$id,
        title: data.title,
        description: data.description,
        frequency: data.frequency,
        streak_count: 0,
        last_completed: new Date().toISOString(),
        created_at: new Date().toISOString(),
      }
      } 
      );
      router.back();
    } catch (error) {
      if(error instanceof Error){
        setError(error.message);
        return;
      }
      setError("Error creating habit")
    }
  }

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
              {label: `${item.charAt(0).toUpperCase()}${item.slice(1)}`, value: item}
            ))}
          />
        </View>
        <Button
         style={styles.habitBtn}
         mode='contained'
         disabled={!data.description || !data.title}
         onPress={handleSubmit}
        >Add Habit</Button>
        {error && <Text style={{color: theme.colors.error}}>{error}</Text>}
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
