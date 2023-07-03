import React, {useState, useContext, useEffect} from 'react'
import Checkbox from 'expo-checkbox';
import { View, Text, TouchableOpacity} from 'react-native';
import { MultipleSelectList } from 'react-native-dropdown-select-list'
import styles, {Colors} from "../styles"
import {cidades} from "../utils/Constants"
import { UserContext } from '../components/UserProvider'; 
import {getDocumento, updateDocumento} from "../config/firebase";
import MsgBox from "../components/MsgBox"

const {brand, secondary, gray} = Colors;

const Profile = () => {

    const {user} = useContext(UserContext)

    const [selected, setSelected] = useState([]);
    const [isChecked, setChecked] = useState(false);

    const [message, setMessage] =useState<string | undefined | null>();
    const [messageType, setMessageType] =useState<string | undefined>();

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

    const handleMessage = (message: string | null, type = "FAILED") => {
      setMessage(message);
      setMessageType(type);
  }
    const handleSubmit = (user: any, selected: any, isChecked: boolean) => {
      handleMessage(null);
      updateDocumento(user, selected, isChecked)
      setMessage("Atualizado com sucesso");
      setMessageType("SUCCESS");
  } 

  return (
    <View style={styles.container}>
          
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
      
      <MsgBox messageType={"SUCCESS"} message={message} />
          <TouchableOpacity
          style={styles.button}
          onPress={() => handleSubmit(user, selected, isChecked)}
        >
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
          </View>
  );
}

export default Profile