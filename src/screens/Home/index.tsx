import React, { useState } from 'react';
import { Text, TextInput, View, TouchableOpacity, FlatList, Alert } from 'react-native';
import { Participant } from '../../components/Participant';

import { styles } from './styles';

export function Home() {
  const [ participants, setParticipants ] = useState<string[]>([]);

  const [ participantName, setParticipantName ] = useState('');

  function handleParticipantAdd() {
    if(participants.includes(participantName)) {
      return Alert.alert('Participante existe', 'Já existe um participante na lista com esse nome')
    }

    setParticipants(prevState => [...prevState, participantName])
    // prevState é o nosso estado atual, temos q usar o ...
    // para desestruturar o nosso array, e pegarmos somente o conteúdo dele
    // se não usasemos o ... estariamos fazendo isso:
    // ['joao'] => [['joao'], 'ana']
    setParticipantName('')
  }

  function handleParticipantRemove(name: string) {
    Alert.alert('Remover participante', `Deseja remover o participante ${name}?`, [
      {
        text: 'Sim',
        onPress: () => setParticipants(prevState => prevState.filter(participant => participant !== name))
      },
      {
        text: 'Não',
        style: 'cancel'
      },
    ])
  }

  return (
    <View style={styles.container}>
      <Text
        style={styles.eventName}
      >
        Nome do evento
      </Text>

      <Text
        style={styles.eventDate}
      >
        Sexta, 4 de novembro de 2022
      </Text>

      <View style={styles.form}>
        <TextInput 
          placeholder='Nome do participante'
          placeholderTextColor='#6B6B6B'
          // alguns tipos de teclados só estão disponiveis para ambientes específicos
          keyboardType='default'
          value={participantName}
          onChangeText={setParticipantName}
          style={styles.input} 
        />

        <TouchableOpacity 
          onPress={handleParticipantAdd}
          style={styles.button}
        >
          <Text style={styles.buttonText}>
            +
          </Text>
        </TouchableOpacity>
      </View>

      {/* <ScrollView showsVerticalScrollIndicator={false}>
        {
          participants.map((participant, index) => (
            <Participant 
              key={index}
              name={participant} 
              onRemove={(name) => handleParticipantRemove(name)}
            />
          ))
        }
      </ScrollView> */}
      
      <FlatList 
        data={participants}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => String(index)}
        renderItem={({item: participant, index}) => (
          <Participant 
            key={index}
            name={participant} 
            onRemove={() => handleParticipantRemove(participant)}
          />
        )}
        ListEmptyComponent={() => (
          <Text style={styles.listEmpty}>
            Adicione participantes a sua lista
          </Text>
        )}
      />
    </View>
  );
}