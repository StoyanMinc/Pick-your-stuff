import { View, Text, FlatList, TouchableOpacity, Switch } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import { listItems, lists } from '../../constants';
import { useEffect, useState } from 'react';
import { styles } from './ListItem.styles';

type RootStackParamList = {
    'Your Lists': undefined;
    List: { id: string };
};
type ListRouteProp = RouteProp<RootStackParamList, 'List'>;

export default function ListItem() {
    const [items, setItems] = useState(listItems);
    const route = useRoute<ListRouteProp>();
    const navigation = useNavigation();
    const { id } = route.params;

    const currentList = lists.find((list) => list._id === id);

    useEffect(() => {
        if (currentList) {
            navigation.setOptions({ title: currentList.title });
        }
    }, [navigation, currentList]);

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

    const addItem = () => {
        console.log('add');
    }

    return (
        <View style={styles.container}>
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
                    onPress={addItem}
                >
                    <Text style={styles.buttonText}>ADD NEW</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>

                {listItemsToShow.length > 0
                    ? <FlatList
                        data={listItemsToShow}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item }) => (
                            <View style={styles.itemView}>
                                <Switch
                                    style={styles.switch}
                                    value={item.isCheked}
                                    onValueChange={() => toggleSwitch(item._id)}
                                />
                                <Text>{item.title}</Text>
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