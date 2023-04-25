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
    TextLinkContent
} from "./../components/styles"
import { View, ActivityIndicator } from 'react-native'
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons'
import { Formik } from 'formik'
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged  } from "firebase/auth";
import { app } from './../config/firebase';


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
            signInWithEmailAndPassword(auth, values.email, values.password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user);
                setSubmitting(false);
                handleMessage("Successfully signed in", 'SUCCESS');
                navigation.navigate("Home", {idUser: user.uid});
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

    useEffect(() => {
        if (app) {
            const auth = getAuth();
            onAuthStateChanged(auth, (user) => {
            if (user) {
                navigation.navigate("Home", {idUser: user.uid});
            } 
            });
    }
    }, [app]);

  return (
    <KeyboardAvoidingWrapper><StyledContainer>
        <StatusBar style="dark"/>
        <InnerContainer>
            <PageLogo resizeMode="cover" source={require('./../assets/logo-beta.png')} />
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
                        {!isSubmitting && <StyledButton onPress={handleSubmit}>
                            <ButtonText>Login</ButtonText>
                        </StyledButton>}

                        {isSubmitting && <StyledButton disabled={true}>
                            <ActivityIndicator size="large" color={primary} />
                        </StyledButton>}
                        <Line />
                        <StyledButton google={true} onPress={handleSubmit}>
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
                    </StyledFormArea>)
                }

            </Formik>
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