import styled, { css } from "styled-components/native";
import { TouchableOpacity } from 'react-native'

export type ButtonTypeStyleProps = 'PRIMARY' | 'SECONDARY';

type Props = {
  type: ButtonTypeStyleProps;
}

export const Container = styled(TouchableOpacity)<Props>`
  flex: 1;
  /* 
    hackzinho pra gente fazer com que nosso button ocupe no máximo esse height.
    pq isso? pq como estamos utilizando o flex, pode ser q vai ter interface q só tenha
    o botão, então em teoria nosso botão ficaria gigante em tela, pq ele estaria utilizando
    todo o espaço disponível
  */
  min-height: 56px;
  max-height: 56px;
  /* type acessamos graças ao Props */
  background-color: ${({ theme, type }) => 
    type === 'PRIMARY' ? theme.COLORS.GREEN_700 : theme.COLORS.RED_DARK
  };

  border-radius: 6px;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.MD};
    font-family: ${theme.FONT_FAMILY.BOLD};
    color: ${theme.COLORS.WHITE}
  `};

`;