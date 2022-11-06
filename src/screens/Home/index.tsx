import React from 'react';
import { Text, TextInput, View, TouchableOpacity, ScrollView, FlatList, Alert } from 'react-native';
import { Participant } from '../../components/Participant';

import { styles } from './styles';

export function Home() {
  const participants = ['Gustavo', 'Jorge', 'Cleito', 'Gustavo', 'Jorge', 'Cleito', 'Gustavo', 'Jorge', 'Cleito']

  function handleParticipantAdd() {
    if(participants.includes('Gustavo')) {
      return Alert.alert('Participante existe', 'Já existe um participante na lista com esse nome')
    }
  }

  function handleParticipantRemove(name: string) {
    Alert.alert('Remover participante', 'Deseja remover o participante?', [
      {
        text: 'Sim',
        onPress: () => Alert.alert('Deletado!')
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