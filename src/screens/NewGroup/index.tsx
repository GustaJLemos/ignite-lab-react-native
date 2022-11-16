import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Button } from '@components/Button';
import React from 'react';
import { Container, Content, Icon } from './styles';
import { Input } from '@components/Input';


export function NewGroup() {
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
        />

        <Button 
          title='Criar'
          style={{ marginTop: 20 }}
        />
      </Content>
    </Container>
  );
};