import { Models } from "react-native-appwrite";

export interface DataType {
    title: string;
    description: string;
    frequency: string;
}

export interface Habit extends Models.Row {
    userId: string;
    title: string;
    description: string;
    frequency: string;
    streak_count: number;
    last_completed: string;
    created_at: string;
}