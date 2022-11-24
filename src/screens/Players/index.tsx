import { Button } from '@components/Button';
import { ButtonIcon } from '@components/ButtonIcon';
import { Filter } from '@components/Filter';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Input } from '@components/Input';
import { ListEmpty } from '@components/ListEmpty';
import { PlayerCard } from '@components/PlayerCard';
import { useRoute } from '@react-navigation/native';
import { playerAddByGroup } from '@storage/player/playerAddByGroup';
import { playersGetByGroup } from '@storage/player/playersGetByGroup';
import { playersGetByGroupAndTeam } from '@storage/player/playersGetByGroupAndTeam';
import { PlayerStorageDTO } from '@storage/player/PlayerStorageDTO';
import { AppError } from '@utils/AppError';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList } from 'react-native';
import { Container, Form, HeaderList, NumberOfPlayers } from './styles';

type RouteParams = {
  group: string;
}

export function Players() {
  const route = useRoute();

  const { group } = route.params as RouteParams

  const [team, setTeam] = useState<string>('Time A');
  const [newPlayerName, setNewPlayerName] = useState('')
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);

  async function fetchPlayersByTeam() {
    try {
      const playersByTeam = await playersGetByGroupAndTeam(group, team)

      setPlayers(playersByTeam)
    } catch (error) {
      Alert.alert('Pessoas', 'Não foi possível carregar as pessoas do time selecionado')
    }
  }

  async function handleAddPlayer() {
    if(newPlayerName.trim().length === 0) {
      return Alert.alert('Nova pessoa', 'Informe o nome da pessoa para adicionar.')
    }

    const newPlayer = {
      name: newPlayerName,
      team: team,
    }

    try {
      await playerAddByGroup(newPlayer, group)

      setNewPlayerName('')

      fetchPlayersByTeam()
    } catch (error) {
      if(error instanceof AppError) {
        Alert.alert('Nova pessoa', error.message)
      } else {
        Alert.alert('Nova pessoa', 'Não foi possível adicionar')
        console.log(error)
      }
    }
  }

  useEffect(() => {
    console.log('aaaa')
    fetchPlayersByTeam()
  }, [team])

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
          value={newPlayerName}
          onChangeText={setNewPlayerName}
        />
        <ButtonIcon 
          icon='add'
          onPress={handleAddPlayer}
        />
      </Form>

      <HeaderList>
        <FlatList 
          data={['Time A', 'Time B']}
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
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <PlayerCard 
            name={item.name}
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