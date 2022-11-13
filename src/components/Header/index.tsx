import React from 'react';
import { BackIcon, Container, BackButton, Logo } from './styles';
import LogoImg from '@assets/logo.png';

type Props = {
  showBackButton?: boolean
}

export function Header({ showBackButton = true }: Props) {
  return (
    <Container>
      {
        showBackButton && (
          <BackButton>
            <BackIcon />
          </BackButton>
        )
      }
      <Logo source={LogoImg}/>
    </Container>
  );
}