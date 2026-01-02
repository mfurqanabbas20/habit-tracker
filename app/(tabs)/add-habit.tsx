import { COLLECTION_NAME, DATABASE_ID, databases } from '@/lib/appwrite';
import { useAuth } from '@/lib/auth-context';
import { DataType } from '@/lib/types/habits';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {View, StyleSheet} from 'react-native';
import { ID } from 'react-native-appwrite';
import { Button, SegmentedButtons, TextInput } from 'react-native-paper';

const FREQUENCIES = ["daily", "weekly", "monthly"];

const AddHabitScreen = () => {
  const router = useRouter();
  const [data, setData]  = useState<DataType>({
      title: "",
      description: "",
      frequency: "daily",
  });
  const {user} = useAuth();

  const handleSubmit = async () => {
    if(!user) return;

    await databases.createDocument(
      DATABASE_ID || "",
      COLLECTION_NAME || "",
      ID.unique(),
      {
        user_id: user.$id,
        title: data.title,
        description: data.description,
        frequency: data.frequency,
        streak_count: 0,
        last_completed: new Date().toISOString(),
        created_at: new Date().toISOString(),
      }
    );

    router.back();
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
