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

const {brand, darkLight, primary} = Colors;
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper'

const Signup = ({navigation}) => {

    const [hidePassword, setHidePassword] =useState(true);

  return (
    <KeyboardAvoidingWrapper><StyledContainer>
        <StatusBar style="dark"/>
        <InnerContainer>
            {/* <PageTitle>App Selva</PageTitle> */}
            <SubTitle>Registro de Usuário</SubTitle>

            <Formik
            initialValues={{fullName:"", email: '', dateOfBirth:"", password: '', confirmPassword: ''}}
            onSubmit={(values) => {
                console.log(values);
                navigation.navigate("Login");
            }}>
                {({handleChange, handleBlur, handleSubmit, values}) => 
                    (<StyledFormArea>
                        <MyTextInput 
                            label="Nome completo"
                            icon="person"
                            placeholder="Richard"
                            placeHolderTextColor={darkLight}
                            onChangeText={handleChange("fullName")}
                            onBlur={handleBlur("fullName")}
                            value={values.fullName}
                        />
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
                            label="Data de nascimento"
                            icon="calendar"
                            placeholder="DD-MM-YYYY"
                            placeHolderTextColor={darkLight}
                            onChangeText={handleChange("dateOfBirth")}
                            onBlur={handleBlur("dateOfBirth")}
                            value={values.dateOfBirth}
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
                        <MyTextInput 
                            label="Confirmar a Senha"
                            icon="lock"
                            placeholder="* * * * * * *"
                            placeHolderTextColor={darkLight}
                            onChangeText={handleChange("confirmPassword")}
                            onBlur={handleBlur("confirmPassword")}
                            value={values.confirmPassword}
                            secureTextEntry={hidePassword}
                            isPassword={true}
                            hidePassword={hidePassword}
                            setHidePassword = {setHidePassword}
                        />
                        <MsgBox>
                            ...
                        </MsgBox>
                        <StyledButton onPress={handleSubmit}>
                            <ButtonText>Registrar</ButtonText>
                        </StyledButton>
                        <Line />
                        
                        <ExtraView>
                            <ExtraText>
                                Já tem uma conta?
                            </ExtraText>
                            <TextLink onPress={() => navigation.navigate("Login")}>
                                <TextLinkContent>  Login</TextLinkContent>
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

export default Signup