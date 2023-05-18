import React, {useEffect, useState} from 'react'
import { StatusBar } from 'expo-status-bar'

import {
    Colors,
    StyledContainer,
    InnerContainer,
    PageLogo, 
    SubTitle,
    StyledFormArea,
    LeftIcon,
    StyledInputLabel,
    StyledButton,
    StyledTextInput,
    RightIcon,
    ButtonText,
    MsgBox,
    Line,
    ExtraText,
    ExtraView,
    TextLink,
    TextLinkContent,
} from "./../components/styles"
import { View, ActivityIndicator, TouchableOpacity, Text } from 'react-native'
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons'
import { Formik } from 'formik'
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";


const {brand, darkLight, primary} = Colors;


import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

const Login = ({navigation}) => {

    const [hidePassword, setHidePassword] =useState(true);
    const [message, setMessage] =useState();
    const [messageType, setMessageType] =useState();

    const handleMessage = (message, type = "FAILED") => {
        setMessage(message);
        setMessageType(type);
    }
    
    const loginFirebase = (values, {setSubmitting}) => {
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


    const handleForgotPassword = (email) => {
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
    //     signInWithRedirect(auth, provider);
    //     getRedirectResult(auth)
    //     .then((result) => {
    //         // This gives you a Google Access Token. You can use it to access Google APIs.
    //         const credential = GoogleAuthProvider.credentialFromResult(result);
    //         const token = credential.accessToken;

    //         // The signed-in user info.
    //         const user = result.user;
    //         // IdP data available using getAdditionalUserInfo(result)
    //         // ...
    //     }).catch((error) => {
    //         // Handle Errors here.
    //         const errorCode = error.code;
    //         const errorMessage = error.message;
    //         // The email of the user's account used.
    //         const email = error.customData.email;
    //         // The AuthCredential type that was used.
    //         const credential = GoogleAuthProvider.credentialFromError(error);
    //         // ...
    //     });

    // }

  return (
    <KeyboardAvoidingWrapper><StyledContainer>
        <StatusBar style="dark"/>
        <InnerContainer>
            <PageLogo resizeMode="cover" source={require('./../assets/logo.png')} />
            {/* <PageTitle>App Selva</PageTitle> */}
            <SubTitle>Login de Usuário</SubTitle>

            <Formik
            initialValues={{email: '', password: ''}}
            onSubmit={loginFirebase}>
                {({handleChange, handleBlur, handleSubmit, values, isSubmitting}) => 
                    (<StyledFormArea>
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

                        <MsgBox type={messageType}>{message}</MsgBox>

                        <ExtraView>
                            <ExtraText>
                            Esqueceu sua senha?
                            </ExtraText>
                            <TextLink onPress={() => {handleForgotPassword(values.email)}}>
                                    <TextLinkContent> Clique aqui</TextLinkContent>
                            </TextLink>
                        </ExtraView>

                        {!isSubmitting && <StyledButton onPress={handleSubmit}>
                            <ButtonText>Login</ButtonText>
                        </StyledButton>}

                        {isSubmitting && <StyledButton disabled={true}>
                            <ActivityIndicator size="large" color={primary} />
                        </StyledButton>}
                        
                    </StyledFormArea>)
                }

            </Formik>
            <StyledFormArea>
                <Line />
                <StyledButton google={true} >
                    <Fontisto name='google' color={primary} size={25} />
                    <ButtonText google={true}>Entre com o Google</ButtonText>
                </StyledButton>
            
                <ExtraView>
                    <ExtraText>
                        Ainda não tem uma conta?
                    </ExtraText>
                    <TextLink onPress={() => navigation.navigate("Signup")}>
                        <TextLinkContent>  Registre-se</TextLinkContent>
                    </TextLink>
                </ExtraView>
                
            </StyledFormArea>
        </InnerContainer>
    </StyledContainer></KeyboardAvoidingWrapper>
  )
}

const MyTextInput = ({label, icon,isPassword, hidePassword, setHidePassword, ...props}) => {
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand}/>
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props}/>
        {isPassword && (
            <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                <Ionicons name={hidePassword ? 'md-eye-off':"md-eye"} size={30} color={darkLight} />
            </RightIcon>
        )}
        </View>
    )
}

export default Login