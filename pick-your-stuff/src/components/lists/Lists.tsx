import { View, Text, ScrollView, TouchableOpacity, Alert, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { lists } from '../../constants';
import { styles } from './lists.styles';
import { useRef, useState } from 'react';

type RootStackParamList = {
    'Your Lists': undefined;
    List: { id: string };
};
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Your Lists'>;

export default function Lists() {
    const [listToDisplay, setListToDisplay] = useState(lists);
    const [showAddInput, SetShowAddInput] = useState<boolean>(false);
    const [newList, setNewList] = useState<string>('');

    const inputRef = useRef<TextInput>(null);
    const navigation = useNavigation<NavigationProp>();
    const showDeleteConfirmation = (id: string, title: string) => {
        Alert.alert(
            'Delete Item',
            `Are you sure you want to delete "${title}"?`,
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', style: 'destructive', onPress: () => deleteList(id) },
            ]
        );
    }

    const deleteList = (id: string) => {
        setListToDisplay((prevLists) => prevLists.filter((list) => list._id !== id));
    }

    const addNewList = () => {
        console.log(newList);
        setListToDisplay((prev) => ([
            ...prev,
            {
                _id: '123',
                title: 'NEW LIST',
                ownerId: '1'
            }
        ]))
        setNewList('');
        SetShowAddInput(false);
    }

    return (
        <View style={styles.container}>
            <View style={styles.addList}>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => SetShowAddInput(true)}
                >
                    <Text style={styles.buttonText}>ADD NEW LIST</Text>
                </TouchableOpacity>
            </View>
            {showAddInput && (
                <View style={styles.addListContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Add new list here..."
                        ref={inputRef}
                        value={newList}
                        onChangeText={setNewList}
                    />
                    <TouchableOpacity
                        style={[styles.addButton, styles.confirmButton]}
                        onPress={addNewList}
                        >
                        <Text style={styles.buttonText}>Confirm</Text>
                    </TouchableOpacity>
                </View>

            )}
            <ScrollView>
                {listToDisplay.map((list) => (
                    <TouchableOpacity
                        style={styles.button}
                        key={list._id}
                        onPress={() => navigation.navigate('List', { id: list._id })}
                        onLongPress={() => showDeleteConfirmation(list._id, list.title)}
                    >
                        <Text style={styles.listTitle}>{list.title}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}