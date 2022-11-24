import { Alert } from 'react-native';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import React, { useState } from 'react';
import { Container, Content, Icon } from './styles';
import { Input } from '@components/Input';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@components/Button';
import { groupCreate } from '@storage/group/groupCreate';
import { AppError } from '@utils/AppError';

export function NewGroup() {

  const [group, setGroup] = useState('');

  const navigation = useNavigation();

  async function handleCreateToNewGroup() {
    try {
      // o trim() serve para removermos espaços em branco
      // se a gente deixar sem o trim, o usuário pode simplesmente digitar um espaço
      // e vai dar certo, vai passar dessa condicional
      if(group.trim().length === 0) {
        return Alert.alert('Novo Grupo', 'Informe o nome da turma ')
      }

      await groupCreate(group)
      setGroup('')
      navigation.navigate('playersScreen', { group: group })

    } catch (error) {
      if(error instanceof AppError) {
        Alert.alert('Novo Grupo', error.message)
      } else {
        Alert.alert('Novo Grupo', 'Não foi possível criar um novo grupo.')
        console.log(error)
      }
    }
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
          onPress={handleCreateToNewGroup}
        />
      </Content>
    </Container>
  );
};