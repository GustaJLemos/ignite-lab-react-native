import React from 'react';
import { TouchableOpacityProps, View } from 'react-native';
import { Container, FilterStyleProps, Title } from './styles';

type Props = TouchableOpacityProps & FilterStyleProps & {
  title: string;
}

export function Filter({ title, isActive = false, ...rest }: Props) {
  return (
    <Container isActive={isActive} {...rest}>
      <Title>
        {title}
      </Title>
    </Container>
  );
}