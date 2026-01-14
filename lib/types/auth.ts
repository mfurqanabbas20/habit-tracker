import { Models } from "react-native-appwrite";

export type AuthContextType = {
    user: Models.User<Models.Preferences> | null;
    isLoading: boolean;
    signUp: (credentials: {email: string; password: string}) => Promise<string | null>;
    signIn: (credentials: {email: string; password: string}) => Promise<string | null>;
    signOut: () => Promise<void>
}