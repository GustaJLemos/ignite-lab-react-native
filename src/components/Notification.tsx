import { Heading, Pressable, Text } from "native-base";
import { OSNotification } from "react-native-onesignal";
import * as Linking from 'expo-linking';

type Props = {
  notification: OSNotification,
  onClose: () => void;
}

export function Notification({ notification, onClose }: Props) {
  function handleOnPress() {
    console.log('notification.launchURL', notification.launchURL)
    if (notification?.launchURL) {
      Linking.openURL('igniteGym://signUpScreen');
    }

    onClose()
  }

  return (
    <Pressable
      w='full'
      p='6'
      pt='12'
      bgColor="green.700"
      position="absolute"
      top={0}
      onPress={handleOnPress}
      borderBottomColor="green.700"
      borderBottomWidth='1'
    >
      <Heading color='gray.100' fontSize='md' fontFamily='heading' numberOfLines={1}>
        {notification.title}
      </Heading>
      <Text color='gray.100' fontSize='sm'>
        Clique para visulizar.
      </Text>
    </Pressable>
  )
}