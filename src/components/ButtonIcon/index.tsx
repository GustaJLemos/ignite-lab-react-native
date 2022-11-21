import React from 'react';
import { TouchableOpacityProps, View } from 'react-native';
import { ButtonIconTypeStyleProps, Container, Icon } from './styles';

import { MaterialIcons } from '@expo/vector-icons';

type Props = TouchableOpacityProps & {
  // tipando para que a gente consiga ter acesso a toda a lista de icones disponíveis
  icon: keyof typeof MaterialIcons.glyphMap,
  type?: ButtonIconTypeStyleProps,
}

export function ButtonIcon({ icon, type = 'ADD', ...rest }: Props) {
  return (
    <Container {...rest}>
      <Icon name={icon} type={type}/>
    </Container>
  );
}