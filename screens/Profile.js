import React, {useState, useContext} from 'react'
import { View, Text } from 'react-native';
import { MultipleSelectList, SelectList } from 'react-native-dropdown-select-list'
import {
    Colors,
    StyledInputLabel,
    StyledButton,
    ButtonText,
    StyledContainer,
    InnerContainer,
} from "./../components/styles"
import {cidades} from "./../components/Constants"
import { UserContext } from '../components/UserProvider'; 
import {getDocumento} from "../config/firebase"

const {brand, secondary, gray} = Colors;

const Profile = () => {

    const {user} = useContext(UserContext)

    const [selected, setSelected] = useState("");

    // const data = getDocumento(user);
    // console.log(data);
    

  return (
    
        <StyledContainer>
        <Text>Usuário: {user}</Text>
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

            <StyledButton >
                <ButtonText>Salvar</ButtonText>
            </StyledButton>
            </StyledContainer>
    
  )
}

export default Profile