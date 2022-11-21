import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import React, { useState } from 'react';
import { Container, Content, Icon } from './styles';
import { Input } from '@components/Input';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@components/Button';


export function NewGroup() {
  const [group, setGroup] = useState('');

  const navigation = useNavigation();

  function handleNavigateToNewGroup() {
    setGroup('')
    navigation.navigate('playersScreen', { group: group })
  }

  return (
    <Container>
      <Header />

      <Content>
        <Icon />
        <Highlight 
          title='Nova turma'
          subtitle='Crie a turma para adicionar as pessoas'
        />

        <Input 
          placeholder='Nome da turma'
          onChangeText={setGroup}
          value={group}
        />

        <Button 
          title='Criar'
          style={{ marginTop: 20 }}
          onPress={handleNavigateToNewGroup}
        />
      </Content>
    </Container>
  );
};