import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NotFound } from '@screens/NotFound';
import { SignIn } from '@screens/SignIn';
import { SignUp } from '@screens/SignUp';

type AuthRoutes = {
  signInScreen: undefined;
  signUpScreen: undefined;
  notFoundScreen: undefined;
}

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>();

export function AuthRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen
        name='signInScreen'
        component={SignIn}
      />
      <Screen
        name='signUpScreen'
        component={SignUp}
      />
      <Screen
        name='notFoundScreen'
        component={NotFound}
      />
    </Navigator>
  );
}