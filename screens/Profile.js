import React, {useState, useContext, useEffect} from 'react'
import Checkbox from 'expo-checkbox';
import { View, Text, StyleSheet } from 'react-native';
import { MultipleSelectList } from 'react-native-dropdown-select-list'
import {
    Colors,
    StyledInputLabel,
    StyledButton,
    ButtonText,
    StyledContainer,
    MsgBox
} from "./../components/styles"
import {cidades} from "./../components/Constants"
import { UserContext } from '../components/UserProvider'; 
import {getDocumento, updateDocumento} from "../config/firebase"

const {brand, secondary, gray} = Colors;

const Profile = () => {

    const {user} = useContext(UserContext)
    const [message, setMessage] =useState();

    const [selected, setSelected] = useState("");
    const [isChecked, setChecked] = useState(false);
    const [data, setData] = useState({"fullName": "", "citys": []});

    useEffect(() => {
        getDocumento(user)
        .then(data => {
            setData(data)
        })
        .catch(error => {
            console.error(error);
        });
    }, []);
    

  return (
    
        <StyledContainer>
        <MsgBox type={"SUCCESS"}>{message}</MsgBox>
        <Text>Bem-vindo de volta {data.fullName}!</Text>
        <StyledInputLabel>Onde quer monitorar?</StyledInputLabel>
            <MultipleSelectList 
                setSelected={(val) => setSelected(val)} 
                data={cidades} 
                label="Localidades selecionadas"
                save="value"
                onSelect={()=> console.log(selected)}
                fontFamily=''
                notFoundText='Localidade não cadastrada no sistema.'
                badgeStyles={{backgroundColor: gray}}
                boxStyles={{backgroundColor: secondary}}
                searchPlaceholder = "Procurar"
            />

        <View style={styles.section}>
            <Checkbox 
            style={styles.checkbox}
            color={isChecked ? '#4630EB' : undefined}
            value={isChecked}
            onValueChange={setChecked} />
            <Text style={styles.paragraph}>Quer receber notificações?</Text>
        </View>
        

            <StyledButton onPress={() => updateDocumento(user, selected, isChecked)}>
                <ButtonText>Salvar</ButtonText>
            </StyledButton>
            </StyledContainer>
    
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginHorizontal: 16,
      marginVertical: 32,
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    paragraph: {
      fontSize: 15,
    },
    checkbox: {
      margin: 8,
    },
  });

export default Profile