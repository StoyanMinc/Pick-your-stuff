import { View, Text, FlatList, TouchableOpacity, Switch, TextInput, Alert } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';

import { listItems, lists } from '../../constants';
import { styles } from './ListItem.styles';

type RootStackParamList = {
    'Your Lists': undefined;
    List: { id: string };
};

type ListRouteProp = RouteProp<RootStackParamList, 'List'>;

export default function ListItem() {
    const [items, setItems] = useState(listItems);
    const [showAddInput, SetShowAddInput] = useState<boolean>(false);
    const [newItem, setNewItem] = useState<string>('');

    const inputRef = useRef<TextInput>(null);
    const route = useRoute<ListRouteProp>();

    const navigation = useNavigation();
    const { id } = route.params;

    const currentList = lists.find((list) => list._id === id);

    useEffect(() => {
        if (currentList) {
            navigation.setOptions({ title: currentList.title });
        }
    }, [navigation, currentList]);

    useEffect(() => {
        if (showAddInput && inputRef.current) {
            inputRef.current.focus();
        }
    }, [showAddInput]);

    const listItemsToShow = items.filter((item) => item.listId === id);
    // const listItemsToShow: any = []

    const toggleSwitch = (id: string) => {
        setItems((prev) =>
            prev.map((item) =>
                item._id === id ? { ...item, isCheked: !item.isCheked } : item
            )
        );
    };

    const checkAll = () => {
        setItems((prev) => prev.map((item) => ({
            ...item,
            isCheked: true,
        })))
    }
    const uncheckAll = () => {
        setItems((prev) => prev.map((item) => ({
            ...item,
            isCheked: false,
        })))
    }

    const addNewItem = () => {
        console.log(newItem);
        setItems((prev) => ([
            ...prev,
            {
                _id: '123',
                title: 'NEW ITEM',
                isCheked: false,
                listId: id,
                ownerId: '1'
            }
        ]))
        setNewItem('');
        SetShowAddInput(false);
    }

    const showDeleteConfirmation = (id: string, title: string) => {
        Alert.alert(
            'Delete Item',
            `Are you sure you want to delete "${title}"?`,
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', style: 'destructive', onPress: () => deleteItem(id) },
            ]
        );
    }

    const deleteItem = (id: string) => {
        setItems((prev) => prev.filter((item) => item._id !== id));
    }
    return (
        <View style={styles.container}>
            <View>

            </View>
            <View style={styles.buttonContainer}>
                <View style={styles.checkButtonsContainer}>
                    <TouchableOpacity
                        style={[styles.checkingBtn, styles.checkBtn]}
                        onPress={checkAll}>
                        <Text style={styles.buttonText}>check all</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.checkingBtn, styles.uncheckBtn]}
                        onPress={uncheckAll}>
                        <Text style={styles.buttonText}>uncheck all</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => SetShowAddInput(true)}
                >
                    <Text style={styles.buttonText}>ADD NEW TASK</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
                {showAddInput && (
                    <View style={styles.addItemContainer}>
                        <TextInput
                        placeholder='Type new task here...'
                            style={styles.input}
                            ref={inputRef}
                            value={newItem}
                            onChangeText={setNewItem}
                        />
                        <TouchableOpacity
                            style={[styles.button, styles.confirmButton]}
                            onPress={addNewItem}>
                            <Text style={styles.buttonText}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                )}
                {listItemsToShow.length > 0
                    ? <FlatList
                        contentContainerStyle={{ paddingBottom: 80 }}
                        data={listItemsToShow}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item }) => (
                            <View style={styles.itemView}>
                                <Switch
                                    style={styles.switch}
                                    value={item.isCheked}
                                    onValueChange={() => toggleSwitch(item._id)}
                                />
                                <TouchableOpacity onLongPress={() => showDeleteConfirmation(item._id, item.title)}>
                                    <Text>{item.title}</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                    : <View style={styles.noDataContainer}>
                        <Text style={styles.noDataText}>No data to show...</Text>
                    </View>}
            </View>
        </View>
    );
}