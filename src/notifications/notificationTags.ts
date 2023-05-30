import OneSignal from "react-native-onesignal";

export function tagUserEmailCreate(email: string) {
  OneSignal.sendTag('user_email', email)
}

export function tagUserEmailDelete() {
  OneSignal.deleteTag('user_email')
}

export function tagUserInfoCreate() {
  OneSignal.sendTags({
    'user_name': 'Gustavo',
    'user_email': 'gustavolemosmendes1@gmail.com'
  })
}