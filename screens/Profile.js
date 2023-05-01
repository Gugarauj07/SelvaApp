import React, {useState, useContext} from 'react'
import { View, Text } from 'react-native';
import { MultipleSelectList, SelectList } from 'react-native-dropdown-select-list'
import {
    Colors,
    StyledInputLabel,
    StyledButton,
    ButtonText
} from "./../components/styles"
import {cidades} from "./../components/Constants"
import { UserContext } from '../components/UserProvider'; 

const {brand, secondary, gray} = Colors;

const Profile = () => {

    const {user} = useContext(UserContext)

    const [selected, setSelected] = useState("");
    

  return (
    <View>
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
    </View>
  )
}

export default Profile