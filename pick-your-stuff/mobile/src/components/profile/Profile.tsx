import { View, Text } from 'react-native';
import { useAuth } from '../../hooks/useAuth';

export default function Profile() {
  const { logout } = useAuth();

  const logoutHandler = async () => {
    console.log('logout');
    await logout()

  }
  return (
    <View>
      <Text onPress={() => logoutHandler()}>Logout</Text>
    </View>
  );
}