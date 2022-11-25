import AsyncStorage from "@react-native-async-storage/async-storage"
import { GROUP_COLLECTION, PLAYER_COLLECTION } from "@storage/storageConfig"
import { groupsGetAll } from "./groupsGetAll"

export async function groupRemoveByName(groupDeleted: string) {
  try {
    const storedGroups = await groupsGetAll()

    const filteredGroups = storedGroups.filter(group => group !== groupDeleted)

    await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify(filteredGroups))

    // estamos removendo toda a chave do grupo
    // pq? pq quando excluimos um grupo inteiro, os players dentro dele tbm devem ser excluidos
    // pq se n eles vão ficar ocupando espaço na memória, sendo que nem fazem parte de um grupo
    // esse removeItem faz justamente isso, remove aquela chave
    await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${groupDeleted}`)
  } catch (error) {
    throw error
  }
}