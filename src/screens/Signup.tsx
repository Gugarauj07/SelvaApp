import React, {useState} from 'react'
import { StatusBar } from 'expo-status-bar'
import styles, {Colors} from "../styles"
import {cidades} from "../utils/Constants"
import { View, ActivityIndicator, Text, TouchableOpacity, TextInput } from 'react-native'
import { Octicons, Ionicons } from '@expo/vector-icons'
import { Formik } from 'formik'
import { getAuth, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { MultipleSelectList } from 'react-native-dropdown-select-list'
import MsgBox from "../components/MsgBox"
const {brand, darkLight, primary, yellow, gray, secondary} = Colors;
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper'
import {adicionarDocumento} from "../config/firebase"
import MyTextInput from '../components/MyTextInput'

const Signup = ({
    navigation
}: any) => {

    const [hidePassword, setHidePassword] =useState(true);
    const [message, setMessage] =useState();
    const [messageType, setMessageType] =useState();
    const [selected, setSelected] = useState([]);

    // Função para adicionar um novo documento em uma coleção
    

    const handleMessage = (message: any, type = "FAILED") => {
        setMessage(message);
        // @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
        setMessageType(type);
    }

    const registerFirebase = async (values: any, {
        setSubmitting
    }: any) => {
        setSubmitting(true);
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
                const userid = userCredential.user.uid;
                const fullName = values.fullName;
                const citys = selected;

                
                adicionarDocumento(fullName, citys, userid);
                handleMessage("Cadastrado com sucesso!", 'SUCCESS');
                setSubmitting(false);
            })
            .catch((error) => {
                const errorMessage = error.message;
                handleMessage(errorMessage);
                setSubmitting(false);
            })
    
        }   
    }

  return (
      <KeyboardAvoidingWrapper><View style={styles.container}>

      <StatusBar style="dark"/>
          <View style={styles.innerContainer}>
              <Text style={styles.subTitle}>Registro de Usuário</Text>

              <Formik
              initialValues={{fullName:"", email: '', citys:"", password: '', confirmPassword: ''}}
              onSubmit={registerFirebase}>
                  {({handleChange, handleBlur, handleSubmit, values, isSubmitting}) => 
                      (<View style={styles.formArea}>
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
                            <Text style={styles.inputLabel}>Onde quer monitorar?</Text>
                          <MultipleSelectList 
                              setSelected={(val: any) => setSelected(val)} 
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

                            <MsgBox messageType={messageType} message={message} />

                        {!isSubmitting && (
                            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                            <Text style={styles.buttonText}>Registrar</Text>
                            </TouchableOpacity>
                        )}

                        {isSubmitting && (
                            <TouchableOpacity disabled={true} style={styles.button}>
                            <ActivityIndicator size="large" color="#000" />
                            </TouchableOpacity>
                        )}
                          
                          <View style={styles.extraView}>
                            <Text style={styles.extraText}>Já tem uma conta?</Text>
                                <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.textLink}>
                                    <Text style={styles.textLinkContent}> Login</Text>
                                </TouchableOpacity>
                            </View>
                      </View>)
                  }

              </Formik>
          </View>
      </View></KeyboardAvoidingWrapper>
  );
}

export default Signup