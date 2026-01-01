// install reactnattive appwrite sdk
import {Account, Client, Databases} from "react-native-appwrite";

export const client = new Client()
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)


export const account = new Account(client);
export const databases = new Databases(client);

export const DATABASE_ID = process.env.EXPO_PUBLIC_DATABASE_ID;
export const COLLECTION_NAME = process.env.EXPO_PUBLIC_HABITS_TABLE;




