import { Platform } from 'react-native';
import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { Exercise } from '@screens/Exercise';
import { History } from '@screens/History';
import { Home } from '@screens/Home';
import { Profile } from '@screens/Profile';

import HomeSvg from '@assets/home.svg';
import HistorySvg from '@assets/history.svg';
import ProfileSvg from '@assets/profile.svg';
import { useTheme } from 'native-base';

type AppRoutes = {
  homeScreen: undefined;
  exerciseScreen: {
    exerciseId: string;
  };
  historyScreen: undefined;
  profileScreen: undefined;
}

// TODO testar essa patifaria aq

// TODO Notificar usuários de novidades no app (ex.: novos exercícios adicionados).
// TODO utilizar DeepLinking para mandar o usuário para a tela de novos exercícios

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {
  const { sizes, colors } = useTheme();

  const iconSize = sizes[6];

  return (
    <Navigator screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarActiveTintColor: colors.green[500],
      tabBarInactiveTintColor: colors.gray[200],
      tabBarStyle: {
        backgroundColor: colors.gray[600],
        borderTopWidth: 0,
        height: Platform.OS === 'android' ? 'auto' : 96,
        paddingBottom: sizes[10],
        paddingTop: sizes[6],
      }
    }}>
      <Screen
        name='homeScreen'
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            // quando n definimos a cor no próprio arquivo de svg, o svg entende que vamos definir no próprio código
            <HomeSvg fill={color} width={iconSize} height={iconSize} />
          )
        }}
      />
      <Screen
        name='exerciseScreen'
        component={Exercise}
        options={{ tabBarButton: () => null }}
      />
      <Screen
        name='historyScreen'
        component={History}
        options={{
          tabBarIcon: ({ color }) => (
            // quando n definimos a cor no próprio arquivo de svg, o svg entende que vamos definir no próprio código
            <HistorySvg fill={color} width={iconSize} height={iconSize} />
          )
        }}
      />
      <Screen
        name='profileScreen'
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            // quando n definimos a cor no próprio arquivo de svg, o svg entende que vamos definir no próprio código
            <ProfileSvg fill={color} width={iconSize} height={iconSize} />
          )
        }}
      />
    </Navigator>
  );
}