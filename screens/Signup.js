import React, {useState} from 'react'
import { StatusBar } from 'expo-status-bar'
import {
    Colors,
    StyledContainer,
    InnerContainer,
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
import {cidades} from "./../components/Constants"
import { View, ActivityIndicator } from 'react-native'
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons'
import { Formik } from 'formik'
import { getAuth, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import firestore from 'firebase/firestore';
import { MultipleSelectList, SelectList } from 'react-native-dropdown-select-list'

const {brand, darkLight, primary, yellow, gray, secondary} = Colors;
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper'

const Signup = ({navigation}) => {

    const [hidePassword, setHidePassword] =useState(true);
    const [message, setMessage] =useState();
    const [messageType, setMessageType] =useState();
    const [selected, setSelected] = useState("");



    const handleMessage = (message, type = "FAILED") => {
        setMessage(message);
        setMessageType(type);
    }

    const registerFirebase = (values, {setSubmitting}) => {
        handleMessage(null);
        if (values.email == '' || values.password == ''|| values.confirmPassword == ''|| values.fullName == '') {
            handleMessage("Preencha todos os campos!")
            setSubmitting(false);
        } else if (values.password !== values.confirmPassword) {
            handleMessage("As senhas estão diferentes!")
            setSubmitting(false);
        } else {
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, values.email, values.password)
            .then((userCredential) => {
                signOut(auth)
                // Signed in
                const userid = userCredential.user.uid;
                const fullName = values.fullName;
                const citys = selected;
                console.log(fullName, citys, userid)
                // firestore()
                // .collection("UserInfo")
                // .doc(userid)
                // .set({
                //     fullName,
                //     citys,
                //     created_at: firestore.FieldValue.serverTimestamp()
                // })
                // .then(() => console.log("firestore updated"))
                // .catch((error) => console.log(error))
                handleMessage("Cadastrado com sucesso!", 'SUCCESS');
                setSubmitting(false);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                handleMessage(errorMessage);
                setSubmitting(false);
            });
        }   
    }

  return (
    <KeyboardAvoidingWrapper><StyledContainer>
        <StatusBar style="dark"/>
        <InnerContainer>
            {/* <PageTitle>App Selva</PageTitle> */}
            <SubTitle>Registro de Usuário</SubTitle>

            <Formik
            initialValues={{fullName:"", email: '', citys:"", password: '', confirmPassword: ''}}
            onSubmit={registerFirebase}>
                {({handleChange, handleBlur, handleSubmit, values, isSubmitting}) => 
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
                        <StyledInputLabel>Onde quer monitorar?</StyledInputLabel>
                        <MultipleSelectList 
                            setSelected={(val) => setSelected(val)} 
                            data={cidades} 
                            label="Localidades selecionadas"
                            save="value"
                            fontFamily=''
                            // onSelect={()=> console.log(selected)}
                            notFoundText='Localidade não cadastrada no sistema.'
                            badgeStyles={{backgroundColor: gray}}
                            boxStyles={{backgroundColor: secondary}}
                            // selectedItems ={selectedItems}

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
                        <MsgBox type={messageType}>{message}</MsgBox>
                        {!isSubmitting && <StyledButton onPress={handleSubmit}>
                            <ButtonText>Registrar</ButtonText>
                        </StyledButton>}

                        {isSubmitting && <StyledButton disabled={true}>
                            <ActivityIndicator size="large" color={primary} />
                        </StyledButton>}
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