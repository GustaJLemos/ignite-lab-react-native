import { Button } from '@components/Button';
import { GroupCard } from '@components/GroupCard';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { ListEmpty } from '@components/ListEmpty';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { groupsGetAll } from '@storage/group/groupsGetAll';
import React, { useCallback } from 'react';
import { useState } from 'react';
import { FlatList } from 'react-native';

import { Container } from './styles'

export function Groups() {
  const navigation = useNavigation();
  
  const [groups, setGroups] = useState<string[]>(['Galera da Rocketseat', 'Amigos da facul']);

  function handleNewGroup() {
    navigation.navigate('newGroupScreen')
  }
  
  function handleNavigateToPlayers(item: string) {
    navigation.navigate('playersScreen', { group: item })
  }

  async function fetchGroups() {
    try {
      const groupsFetcheds = await groupsGetAll()
      setGroups(groupsFetcheds)
    } catch (error) {
      console.log(error)
    }
  }

  // usamos o useCallback para evitar renderizações desnecessárias, inclusive está na doc usar o hook
  //  com o useFocusEffect
  useFocusEffect(useCallback(() => {
    fetchGroups()
  }, []))

  return (
    <Container>
      <Header showBackButton={false}/>

      <Highlight title='Turmas' subtitle='Jogue com a sua turma'/>

      <FlatList 
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <GroupCard 
            title={item} 
            onPress={() => handleNavigateToPlayers(item)}
          />
        )}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={() => (
          <ListEmpty 
            message='Que tal cadastrar a primeira turma?'
          />
        )}
      />

      <Button 
        title='Criar nova turma'
        onPress={handleNewGroup}
      />
    </Container>
  );
}