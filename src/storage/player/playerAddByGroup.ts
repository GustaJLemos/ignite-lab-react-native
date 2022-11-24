import AsyncStorage from "@react-native-async-storage/async-storage";
import { PLAYER_COLLECTION } from "@storage/storageConfig";
import { AppError } from "@utils/AppError";
import { playersGetByGroup } from "./playersGetByGroup";
import { PlayerStorageDTO } from "./PlayerStorageDTO";

export async function playerAddByGroup(newPlayer: PlayerStorageDTO, group: string) {
  try {
    
    const storagedPlayers = await playersGetByGroup(group)

    const playerAlreadyExists = storagedPlayers.filter(player => player.name === newPlayer.name)

    if(playerAlreadyExists.length > 0) {
      throw new AppError('Essa pessoa já está adicionada em um time aqui.')
    }

    const storage = JSON.stringify([...storagedPlayers, newPlayer])
    /*
      @ignite-teams:player-amigos
      @ignite-teams:player-ignite
      @ignite-teams:player-familia
    */
    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage)
  } catch (error) {
    throw (error);
  }
}