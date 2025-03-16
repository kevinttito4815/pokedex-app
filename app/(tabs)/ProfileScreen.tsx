import { Link } from 'expo-router';
import { Image, StyleSheet, Text, View } from 'react-native';
import { mainUser } from '@/app/index';


export default function ScreenProfile() {
  return (
    <View style={styles.container}>
      <View style={styles.profileCard}>
        <Image
          source={require('@/assets/icons/user_icon.png')}
          style={styles.userIcon}
        />
        <Text style={styles.userName}>{mainUser.name}</Text>
        <Text style={styles.userEmail}>{mainUser.email}</Text>
        <Link 
          href='/' 
          style={styles.logoutButton}
        >
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  profileCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  userIcon: {
    width: 100,
    height: 100,
    marginBottom: 15,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: '#ff4444',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    width: '80%',
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
