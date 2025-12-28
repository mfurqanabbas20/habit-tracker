// install reactnattive appwrite sdk
import {Account, Client, Databases} from "react-native-appwrite";

export const client = new Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT!)
  .setProject(process.env.APPWRITE_PROJECT_ID!)


export const account = new Account(client)
