import { useAuth } from "@/lib/auth-context";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, View, StyleSheet } from "react-native";
import {Button, Text, TextInput, useTheme} from 'react-native-paper';
import {useRouter} from "expo-router";

export default function AuthScreen(){
    const theme = useTheme();
    const [isSignup, setIsSignup] = useState<boolean>(false);
    const [credentials, setCredentials] = useState<{email: string; password: string}>({
        email: "",
        password: "",
    });
    const [error, setError] = useState<string>("");
    const router = useRouter();

    const {signIn, signUp} = useAuth();

    const handleAuth = async () => {
        if(!credentials.email || !credentials.password){
            setError("Please fill in all fields");
            return;
        }

        if(credentials.password.length < 6){
            setError("Password must be at least 6 characters long");
        }
        setError("");
        if(isSignup){
            const error = await signUp(credentials);
            if(error){
                setError(error);
            }
            return;
        }

        const error = await signIn(credentials);
        if(error){
            setError(error);
        }
        router.replace("/")
    }


    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            {/* it ensures that keyboard don't overlap */}
            <View style={styles.content}>
                <Text variant="headlineMedium" style={styles.title}> {isSignup ? "Create Account" : "Welcome Back"}</Text>
                <TextInput
                style={styles.input}
                 label="Email"
                 autoCapitalize="none"
                 placeholder="Enter Email"
                 keyboardType="email-address"
                 mode="outlined"
                 onChangeText={(e) => setCredentials(prev => {
                    return {
                        ...prev,
                        email: e
                    }
                 })}
                />
                <TextInput
                 style={styles.input}
                 label="Password"
                 autoCapitalize="none"
                 placeholder="Your password"
                 secureTextEntry
                 mode="outlined"
                 onChangeText={(e) => setCredentials(prev => {
                    return {
                        ...prev,
                        password: e
                    }
                 })}
                />
                {error && <Text style={{color: theme.colors.error}}>{error}</Text>}
                <Button onPress={handleAuth} style={styles.button} mode="contained">
                    {isSignup ? "Sign Up" : "Sign In"}
                </Button>
                <Button style={styles.swithModeButton} onPress={() => setIsSignup(prev => !prev)} mode="text">
                    {isSignup ? " Already have an account? Sign In" : "Don't have an account? Sign Up"}
                </Button>
            </View>
        </KeyboardAvoidingView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    content: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
    },
    title: {
        textAlign: 'center',
        marginBottom: 24,
    },
    input: {
        marginBottom: 16,
    },
    button: {
       marginTop: 8
    },
    swithModeButton: {
       marginTop: 16,

    }
})


