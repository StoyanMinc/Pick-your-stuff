import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import {  useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { lists } from '../../constants';
import { styles } from './lists.styles';

type RootStackParamList = {
    'Your Lists': undefined;
    List: { id: string };
};
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Your Lists'>;

export default function Lists() {
    const navigation = useNavigation<NavigationProp>();

    return (
        <View style={styles.container}>
            <ScrollView>
                {lists.map((list) => (
                    <TouchableOpacity style={styles.button} key={list._id} onPress={() => navigation.navigate('List', { id: list._id })}>
                        <Text style={styles.listTitle}>{list.title}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}