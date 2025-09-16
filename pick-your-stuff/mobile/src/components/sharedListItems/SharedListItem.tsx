import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Switch,
    Alert,
    ActivityIndicator
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useEffect } from 'react';

import { styles } from './sharedListItem.styles';
import { useListItems } from '../../hooks/useListItem';

type RootStackParamList = {
    'Shared Lists': undefined;
    SharedListItem: { id: string; title: string };
};

type ListRouteProp = RouteProp<RootStackParamList, 'SharedListItem'>;

export default function SharedListItem() {
    const route = useRoute<ListRouteProp>();
    const { id, title } = route.params;

    const {
        items,
        loading,
        error,
        deleteItem,
        toggleItem,
        checkAll,
        uncheckAll,
        refresh
    } = useListItems(id, false);

    const navigation = useNavigation();

    useEffect(() => {
        if (title) {
            navigation.setOptions({ title });
        }
    }, [navigation, title]);

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
            </View>
            <View style={{ flex: 1 }}>
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
