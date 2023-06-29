import React from 'react';
import { Text } from 'react-native';
import MsgBoxStyles from '../styles';

interface MsgBoxProps {
    messageType: string | undefined;
    message: string | null | undefined;
  }

const MsgBox = ({ messageType, message }: MsgBoxProps) => {
  const textColor = messageType === 'SUCCESS' ? MsgBoxStyles.successMsg : MsgBoxStyles.errorMsg;

  return (
    <Text style={[MsgBoxStyles.msgBox, textColor]}>
      {message}
    </Text>
  );
}

export default MsgBox;