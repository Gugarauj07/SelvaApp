import React, {useEffect, useState} from 'react'
import { StatusBar } from 'expo-status-bar'

import styles, {Colors} from "../styles"
import MsgBox from "../components/MsgBox"

import { View, ActivityIndicator, Image, Text, TextInput, TouchableOpacity,  } from 'react-native'
import { Fontisto } from '@expo/vector-icons'
import { Formik } from 'formik'
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail, GoogleAuthProvider,signInWithCredential } from "firebase/auth";
import MyTextInput from '../components/MyTextInput'
const {brand, darkLight, primary} = Colors;
/* import { GoogleSignin } from 'react-native-google-signin';

GoogleSignin.configure({
  scopes: ['email'],
  webClientId: '803360995227-59jkc578s1ihta8e01sr7hpm77cfd174.apps.googleusercontent.com',
}); */

import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

const Login = ({navigation}: any) => {

    const [hidePassword, setHidePassword] =useState(true);
    const [message, setMessage] =useState<string | undefined | null>();
    const [messageType, setMessageType] =useState<string | undefined>();

    const handleMessage = (message: string | null, type = "FAILED") => {
        setMessage(message);
        setMessageType(type);
    }
    
    const loginFirebase = (values: any, {
        setSubmitting
    }: any) => {
        handleMessage(null);
        if (values.email == '' || values.password == '') {
            handleMessage("Preencha todos os campos!")
            setSubmitting(false);
        } else {
            const auth = getAuth();
            auth.languageCode = 'pt';
            signInWithEmailAndPassword(auth, values.email, values.password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                setSubmitting(false);
                handleMessage("Successfully signed in", 'SUCCESS');
                navigation.navigate("Home");
                handleMessage(null);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
                handleMessage(errorMessage);
                setSubmitting(false);
            });
            
        }
    }


    const handleForgotPassword = (email: any) => {
        handleMessage(null);
        console.log(email);
        if (email == '') {
            handleMessage("Preencha o campo de email para enviarmos o link!");
        } else {
            console.log(email);
        const auth = getAuth();
        sendPasswordResetEmail(auth, email)
            .then(() => {
                handleMessage("Enviamos um e-mail para você!", "SUCCESS");
            })
            .catch((error) => {
                console.log(error);
                handleMessage(error.message)
            });
        }
    }

// const handleGoogleSignin = async () => {
//     const auth = getAuth();
//             await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
//             // Get the users ID token
//             const { idToken } = await GoogleSignin.signIn();

//             // Create a Google credential with the token
//             const googleCredential = GoogleAuthProvider.credential(idToken);

//             // Sign-in the user with the credential
//             return signInWithCredential(auth, googleCredential);
//     }

  return (
    <KeyboardAvoidingWrapper><View style={styles.container}>

        <StatusBar style="dark"/>
            <View style={styles.innerContainer}>

            <Image style={styles.pageLogo} resizeMode="cover" source={require('./../assets/logo.png')}/>
            <Text style={styles.subTitle}>Login de Usuário</Text>

            <Formik
            initialValues={{email: '', password: ''}}
            onSubmit={loginFirebase}>
                {({handleChange, handleBlur, handleSubmit, values, isSubmitting}) => 
                    (<View style={styles.formArea}>
                        <MyTextInput 
                            label="Endereço de Email"
                            icon="mail"
                            placeholder="example@gmail.com"
                            placeHolderTextColor={darkLight}
                            onChangeText={handleChange("email")}
                            onBlur={handleBlur("email")}
                            value={values.email}
                            keyboardType="email-address"
                        />
                        <MyTextInput 
                            label="Senha"
                            icon="lock"
                            placeholder="* * * * * * *"
                            placeHolderTextColor={darkLight}
                            onChangeText={handleChange("password")}
                            onBlur={handleBlur("password")}
                            value={values.password}
                            secureTextEntry={hidePassword}
                            isPassword={true}
                            hidePassword={hidePassword}
                            setHidePassword = {setHidePassword}
                        />

                        <MsgBox messageType={messageType} message={message} />

                        <View style={styles.extraView}>
                            <Text style={styles.extraText}>Esqueceu sua senha?</Text>
                            <TouchableOpacity onPress={() => handleForgotPassword(values.email)} style={styles.textLink}>
                                <Text style={styles.textLinkContent}>Clique aqui</Text>
                            </TouchableOpacity>
                        </View>

                        {!isSubmitting ? (
                            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                            <Text style={styles.buttonText}>Login</Text>
                            </TouchableOpacity>
                        ): null}

                        {isSubmitting ? (
                            <TouchableOpacity disabled={true} style={styles.button}>
                            <ActivityIndicator size="large" color="#fff" />
                            </TouchableOpacity>
                        ) : null}
                        
                    </View>)
                }

            </Formik>
            <View style={styles.formArea}>
                <View style={styles.line} />

                <TouchableOpacity style={styles.googleButton}>
                    <Fontisto name="google" color="#000" size={25} style={styles.googleButtonIcon} />
                    <Text style={styles.googleButtonText}>Entre com o Google</Text>
                </TouchableOpacity>

                <View style={styles.extraView}>
                    <Text style={styles.extraText}>Ainda não tem uma conta?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                    <Text style={styles.textLinkContent}> Registre-se</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </View></KeyboardAvoidingWrapper>
  )
}

export default Login