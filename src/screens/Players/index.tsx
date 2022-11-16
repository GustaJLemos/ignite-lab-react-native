import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import React from 'react';
import { Container } from './styles';

export function Players() {
  return (
    <Container>
      <Header />

      <Highlight 
        title='Nome da turma'
        subtitle='Adicione a galera e separe os times'
      />
    </Container>
  );
}