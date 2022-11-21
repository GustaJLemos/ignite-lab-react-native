import React from 'react';
import { BackIcon, Container, BackButton, Logo } from './styles';
import LogoImg from '@assets/logo.png';
import { useNavigation } from '@react-navigation/native';

type Props = {
  showBackButton?: boolean
}

export function Header({ showBackButton = true }: Props) {
  const navigation = useNavigation();

  function handleNavigateToGroup() {
    // navigation.popToTop(); 
    // esse tbm funciona, porém se utilizarmos o outro jeito, fica mais explicito para onde estamos navegando
    navigation.navigate('groupsScreen');
  }

  return (
    <Container>
      {
        showBackButton && (
          <BackButton onPress={handleNavigateToGroup}>
            <BackIcon />
          </BackButton> 
        )
      }
      <Logo source={LogoImg}/>
    </Container>
  );
}