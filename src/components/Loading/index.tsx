import React from 'react';
import { View } from 'react-native';
import { Container, LoadIndicator } from './styles';

export function Loading() {
  return (
    <Container>
      <LoadIndicator />
    </Container>
  );
}