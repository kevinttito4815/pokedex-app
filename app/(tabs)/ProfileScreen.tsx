import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';


export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text>Profile Screen</Text>
      <Link href='/'>Cerrar sesion</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
