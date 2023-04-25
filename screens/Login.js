import React, {useState} from 'react'
import { StatusBar } from 'expo-status-bar'
import {
    Colors,
    StyledContainer,
    InnerContainer,
    PageLogo, 
    PageTitle,
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
import { View } from 'react-native'
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons'
import { Formik } from 'formik'
import firebase from '../config/firebase'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const {brand, darkLight, primary} = Colors;

import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

import axios from 'axios';

const Login = ({navigation}) => {

    const [hidePassword, setHidePassword] =useState(true);
    const [message, setMessage] =useState();
    const [messageType, setMessageType] =useState();

    const handleMessage = (message, type) => {
        setMessage(message);
        setMessageType(type);
    }
    
    const loginFirebase = (values) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, values.email, values.email)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            handleMessage("Successfully signed in");
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            handleMessage(errorMessage);
        });
    }

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
                {({handleChange, handleBlur, handleSubmit, values, errors}) => 
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
                        <StyledButton onPress={handleSubmit}>
                            <ButtonText>Login</ButtonText>
                        </StyledButton>
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