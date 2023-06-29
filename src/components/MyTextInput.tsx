import React from 'react'
import { View, ActivityIndicator, Image, Text, TextInput, TouchableOpacity,  } from 'react-native'
import styles, {Colors} from "../styles"
import { Octicons, Ionicons } from '@expo/vector-icons'
const {brand, darkLight, primary} = Colors;


const MyTextInput = ({
    label,
    icon,
    isPassword,
    hidePassword,
    setHidePassword,
    ...props
}: any) => {
    return (
        <View>
           <View style={styles.leftIcon}>
        <Octicons name={icon} size={30} color={brand} />
        </View>
        <View>
            <Text style={styles.inputLabel}>{label}</Text>
            <TextInput
            style={styles.textInput}
            secureTextEntry={isPassword && hidePassword}
            {...props}
            />
        </View>
        {isPassword ? (
            <TouchableOpacity
            style={styles.rightIcon}
            onPress={() => setHidePassword(!hidePassword)}
            >
            <Ionicons
                name={hidePassword ? 'md-eye-off' : 'md-eye'}
                size={30}
                color={darkLight}
            />
            </TouchableOpacity>
        ): null} 
        </View>
    )
}

export default MyTextInput