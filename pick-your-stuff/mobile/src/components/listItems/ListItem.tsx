import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Switch,
    TextInput,
    Alert,
    ActivityIndicator
} from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { styles } from './ListItem.styles';
import { useListItems } from '../../hooks/useListItem';

type RootStackParamList = {
    'Your Lists': undefined;
    List: { id: string; title: string };
};

type ListRouteProp = RouteProp<RootStackParamList, 'List'>;

export default function ListItem() {
    const route = useRoute<ListRouteProp>();
    const { id, title } = route.params;

    const {
        items,
        loading,
        error,
        addItem,
        deleteItem,
        toggleItem,
        checkAll,
        uncheckAll,
        refresh
    } = useListItems(id, true);

    const [showAddInput, setShowAddInput] = useState(false);
    const [newItem, setNewItem] = useState('');
    const [actionError, setActionError] = useState<string | null>(null);

    const inputRef = useRef<TextInput>(null);
    const navigation = useNavigation();

    useEffect(() => {
        if (title) {
            navigation.setOptions({ title });
        }
    }, [navigation, title]);

    useEffect(() => {
        if (showAddInput && inputRef.current) {
            inputRef.current.focus();
        }
    }, [showAddInput]);

    const handleAddItem = async () => {
        if (!newItem.trim()) {
            setActionError('Task cannot be empty.');
            return;
        }
        const result = await addItem(newItem);
        if (!result) setActionError('Failed to create task.');
        setNewItem('');
        inputRef.current?.focus();
        // setShowAddInput(false);
    };


    const showDeleteConfirmation = (id: string, title: string) => {
        Alert.alert(
            'Delete Task',
            `Are you sure you want to delete "${title}"?`,
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', style: 'destructive', onPress: () => deleteItem(id) },
            ]
        );
    };

    if (loading) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color="#6a0dad" />
                <Text style={styles.spinnerText}>Loading lists items...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={[styles.container, styles.errorContainer]}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <View style={styles.checkButtonsContainer}>
                    <TouchableOpacity
                        style={[styles.checkingBtn, styles.checkBtn]}
                        onPress={() => checkAll(id)}>
                        <Text style={styles.buttonText}>check all</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.checkingBtn, styles.uncheckBtn]}
                        onPress={() => uncheckAll(id)}>
                        <Text style={styles.buttonText}>uncheck all</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => setShowAddInput((prev) => !prev)}>
                    <Text style={styles.buttonText}>ADD NEW TASK</Text>
                </TouchableOpacity>
            </View>

            <View style={{ flex: 1 }}>
                {showAddInput && (
                    <View style={styles.addItemContainer}>
                        <TextInput
                            placeholder="Type new task here..."
                            placeholderTextColor="#555"
                            style={styles.input}
                            ref={inputRef}
                            value={newItem}
                            onChangeText={setNewItem}
                            onSubmitEditing={handleAddItem}
                            blurOnSubmit={false}
                        />
                        <TouchableOpacity
                            style={styles.buttonIcon}
                            onPress={handleAddItem}>
                            <Ionicons name='send' size={20} color={'lightblue'} />
                        </TouchableOpacity>
                    </View>
                )}
                {items.length > 0 ? (
                    <FlatList
                        contentContainerStyle={{ paddingBottom: 80 }}
                        data={items}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item }) => (
                            <View style={styles.itemView}>
                                <Switch
                                    style={styles.switch}
                                    value={item.isChecked}
                                    onValueChange={() => { toggleItem(item._id, !item.isChecked) }}
                                />
                                <TouchableOpacity onLongPress={() => showDeleteConfirmation(item._id, item.title)}>
                                    <Text>{item.title}</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        refreshing={loading}   // 🔹 shows spinner when loading
                        onRefresh={refresh}
                    />
                ) : (
                    <View style={styles.noDataContainer}>
                        <Text style={styles.noDataText}>No data to show...</Text>
                    </View>
                )}
            </View>
        </View>

    );
}
