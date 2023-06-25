import React, {useState, useContext, useEffect} from 'react'
import Checkbox from 'expo-checkbox';
import { View, Text, TouchableOpacity} from 'react-native';
import { MultipleSelectList } from 'react-native-dropdown-select-list'
import styles, {Colors} from "./../components/styles"
import {cidades} from "./../components/Constants"
import { UserContext } from '../components/UserProvider'; 
import {getDocumento, updateDocumento} from "../config/firebase";
import MsgBox from "./../components/MsgBox"

const {brand, secondary, gray} = Colors;

const Profile = () => {

    const {user} = useContext(UserContext)
    const [message, setMessage] =useState();

    const [selected, setSelected] = useState([]);
    const [isChecked, setChecked] = useState(false);

    type DocumentData = {fullName?: string, citys?: string[]}
    const [data, setData] = useState<DocumentData>({fullName: "", citys: []});
    console.log(data);

    useEffect(() => {
        getDocumento(user)
        .then(data => {
          if (data) {setData(data)}
        })
        .catch(error => {
            console.error(error);
        });
    }, []);
    

  return (
    <View style={styles.container}>
          <MsgBox messageType={"SUCCESS"} message={message} />
      <Text>Bem-vindo de volta {data.fullName}!</Text>
      <Text style={styles.inputLabel}>Onde quer monitorar?</Text>
          <MultipleSelectList 
              setSelected={(val: any) => setSelected(val)} 
              data={cidades} 
              label="Localidades selecionadas"
              save="value"
              // onSelect={()=> console.log(selected)}
              fontFamily=''
              notFoundText='Localidade não cadastrada no sistema.'
              badgeStyles={{backgroundColor: gray}}
              boxStyles={{backgroundColor: secondary}}
              searchPlaceholder = "Procurar"
          />

      <View style={styles.section2}>
          <Checkbox 
          style={styles.checkbox2}
          color={isChecked ? '#4630EB' : undefined}
          value={isChecked}
          onValueChange={setChecked} />
          <Text style={styles.paragraph2}>Quer receber notificações?</Text>
      </View>
      

          <TouchableOpacity
          style={styles.button}
          onPress={() => updateDocumento(user, selected, isChecked)}
        >
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
          </View>
  );
}

export default Profile