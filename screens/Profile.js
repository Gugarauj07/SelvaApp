import React, {useState} from 'react'
import { View } from 'react-native';
import { MultipleSelectList, SelectList } from 'react-native-dropdown-select-list'
import {
    Colors,
    StyledInputLabel
} from "./../components/styles"

const {brand, darkLight, primary} = Colors;

const Profile = () => {

    const [selected, setSelected] = useState("");


    const data = [
        {key:'1', value:'Manaus'},
        {key:'2', value:'Itacoatiara'},
        {key:'3', value:'Manacapuru'},
        {key:'4', value:'Jutaí'},
        {key:'5', value:'Arapuanã'},
        {key:'6', value:'Maués'},
        {key:'7', value:'Autazes'},
    ]

  return (
    <View>
        <StyledInputLabel>Onde quer monitorar?</StyledInputLabel>
            <MultipleSelectList 
                setSelected={(val) => setSelected(val)} 
                data={data} 
                label="Localidades selecionadas"
                save="value"
                onSelect={()=> console.log(selected)}
                fontFamily=''
                notFoundText='Localidade não cadastrada no sistema.'
                badgeStyles={{backgroundColor: gray}}
                boxStyles={{backgroundColor: secondary}}
                searchPlaceholder = "Procurar"
            />
    </View>
  )
}

export default Profile