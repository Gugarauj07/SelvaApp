import React, {useEffect} from 'react'
import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid,Alert } from 'react-native';

const notification = () => {
    // @ts-expect-error TS(2345): Argument of type 'Permission | undefined' is not a... Remove this comment to see the full error message
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

    async function requestUserPermission() {
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      }

      useEffect(() => {
        // @ts-expect-error TS(2801): This condition will always return true since this ... Remove this comment to see the full error message
        if (requestUserPermission()) {
            messaging().getToken().then(token => {
                console.log('Token:', token);
            })
        }
        else{
            console.log("Failed");      
        }

            // Check whether an initial notification is available
        messaging()
        .getInitialNotification()
        .then( async (remoteMessage) => {
        if (remoteMessage) {
            console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
            );
        }
        });

        messaging().onNotificationOpenedApp( async (remoteMessage) => {
            console.log(
                'Notification caused app to open from background state:',
                remoteMessage.notification,
            );
            });
        
        messaging().setBackgroundMessageHandler(async remoteMessage => {
            console.log('Message handled in the background!', remoteMessage);
            });
    
        const unsubscribe = messaging().onMessage(async remoteMessage => {
        Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
        });

        return unsubscribe;
    }, [])

    

}

export default notification