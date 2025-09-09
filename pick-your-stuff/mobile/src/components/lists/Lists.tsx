import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Alert,
    TextInput,
    ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useRef, useState, useEffect } from "react";

import { styles } from "./lists.styles";
import { useLists } from "../../hooks/useList";

type RootStackParamList = {
    "Your Lists": undefined;
    List: { id: string; title: string };
};
type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Your Lists"
>;

export default function Lists() {
    const { lists, loading, error, addList, deleteList } = useLists();

    const [showAddInput, setShowAddInput] = useState(false);
    const [newList, setNewList] = useState("");
    const [actionError, setActionError] = useState<string | null>(null);

    const inputRef = useRef<TextInput>(null);
    const navigation = useNavigation<NavigationProp>();

    useEffect(() => {
        if (showAddInput && inputRef.current) {
            inputRef.current.focus();
        }
    }, [showAddInput]);

    const handleAddList = async () => {
        if (!newList.trim()) {
            setActionError("List title cannot be empty.");
            return;
        }
        const result = await addList(newList);
        if (!result) setActionError("Failed to create list.");
        setNewList("");
        setShowAddInput(false);
    };

    const showDeleteConfirmation = (id: string, title: string) => {
        Alert.alert("Delete List", `Are you sure you want to delete "${title}"?`, [
            { text: "Cancel", style: "cancel" },
            { text: "Delete", style: "destructive", onPress: () => deleteList(id) },
        ]);
    };

    if (loading) {
        return (
            <View
                style={[styles.container, { justifyContent: "center", alignItems: "center" }]}
            >
                <ActivityIndicator size="large" color="#6a0dad" />
                <Text style={styles.spinnerText}>Loading lists...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
                <Text style={{ color: "red" }}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.addList}>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => setShowAddInput((prev) => !prev)}
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
                        onPress={handleAddList}
                    >
                        <Text style={styles.buttonText}>Confirm</Text>
                    </TouchableOpacity>
                </View>
            )}

            {actionError && (
                <Text style={{ color: "red", textAlign: "center", marginVertical: 5 }}>
                    {actionError}
                </Text>
            )}

            <ScrollView>
                {lists.map((list) => (
                    <TouchableOpacity
                        style={styles.button}
                        key={list._id}
                        onPress={() => navigation.navigate("List", { id: list._id, title: list.title })}
                        onLongPress={() => showDeleteConfirmation(list._id, list.title)}
                    >
                        <Text style={styles.listTitle}>{list.title}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}
