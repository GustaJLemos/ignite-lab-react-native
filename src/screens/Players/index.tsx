import { Button } from '@components/Button';
import { ButtonIcon } from '@components/ButtonIcon';
import { Filter } from '@components/Filter';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Input } from '@components/Input';
import { ListEmpty } from '@components/ListEmpty';
import { PlayerCard } from '@components/PlayerCard';
import { useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { Container, Form, HeaderList, NumberOfPlayers } from './styles';

type RouteParams = {
  group: string;
}

export function Players() {
  const route = useRoute();

  const { group } = route.params as RouteParams

  const [team, setTeam] = useState<string>('Time A');

  const [players, setPlayers] = useState<string[]>(['Time A', 'Time B']);

  return (
    <Container>
      <Header />

      <Highlight 
        title={group}
        subtitle='Adicione a galera e separe os times'
      />

     <Form>
        <Input 
          placeholder='Nome da pessoa'
          // Cell não fica corrigindo oque é digitado
          autoCorrect={false}
        />
        <ButtonIcon icon='add'/>
      </Form>

      <HeaderList>
        <FlatList 
          data={players}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <Filter 
              title={item} 
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />

        <NumberOfPlayers>
          {players.length}
        </NumberOfPlayers>
      </HeaderList>

      <FlatList 
        data={players}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <PlayerCard 
            name={item}
            onRemove={() => console.log('quero remvoer')}
          />
        )}
        ListEmptyComponent={() => (
          <ListEmpty 
            message='Não há pessoas nesse time'
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          { paddingBottom: 100 },
          players.length === 0 && { flex: 1 }
        ]}
      />

      <Button title='Remover turma' type='SECONDARY'/>
    </Container>
  );
}