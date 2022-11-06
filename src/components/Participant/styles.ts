import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#1F1E25',
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  name: {
    flex: 1,
    fontSize: 16,
    marginLeft: 16,
    color: '#fff',
  },
  buttonText: {
    color: '#FDFCFE',
    fontSize: 16
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 6,
    backgroundColor: '#E23C44',
    alignItems: 'center',
    justifyContent: 'center'
  },
});