import { View, Text, TouchableOpacity, Alert, TextInput, ActivityIndicator, Platform, FlatList, KeyboardAvoidingView } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useRef, useState, useEffect } from "react";

import { styles } from "./lists.styles";
import { useLists } from "../../hooks/useList";

type RootStackParamList = {
    "Your Lists": undefined;
    List: { id: string; title: string };
};
type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Your Lists">;

export default function Lists() {
    const { lists, loading, error, addList, deleteList, shareList } = useLists();
    const [showAddInput, setShowAddInput] = useState(false);
    const [showShareInput, setShowShareInput] = useState<{ show: boolean, id: null | string }>({ show: false, id: null });
    const [newList, setNewList] = useState("");
    const [shareEmail, setShareEmail] = useState("");
    const [actionError, setActionError] = useState<string | null>(null);

    const inputRef = useRef<TextInput>(null);
    const navigation = useNavigation<NavigationProp>();

    useEffect(() => {
        if (showAddInput && inputRef.current) inputRef.current.focus();
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

    const shareHandler = async (id: string) => {
        await shareList(id, shareEmail);
        setShowShareInput({ show: false, id: null });
        setShareEmail('');
    };

    if (loading) {
        return (
            <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
                <ActivityIndicator size="large" color="#6a0dad" />
                <Text style={styles.spinnerText}>Loading lists...</Text>
            </View>
        );
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={80}
        >

            <View style={styles.container}>
                <View style={styles.addList}>
                    <TouchableOpacity style={styles.addButton} onPress={() => setShowAddInput(prev => !prev)}>
                        <Text style={styles.buttonText}>ADD NEW LIST</Text>
                    </TouchableOpacity>
                </View>
                {showAddInput && (
                    <View style={styles.addListContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Add new list here..."
                            placeholderTextColor="#555"
                            ref={inputRef}
                            value={newList}
                            onChangeText={setNewList}
                        />
                        <TouchableOpacity style={[styles.addButton, styles.confirmButton]} onPress={handleAddList}>
                            <Text style={styles.buttonText}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {actionError && <Text style={{ color: "red", textAlign: "center", marginVertical: 5 }}>{actionError}</Text>}
                <FlatList
                    contentContainerStyle={{ paddingBottom: 80 }}
                    data={lists}
                    keyExtractor={(list) => list._id}
                    renderItem={({ item }) => (
                        <View key={item._id}>
                            <View style={styles.listContainer}>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => navigation.navigate("List", { id: item._id, title: item.title })}
                                    onLongPress={() => showDeleteConfirmation(item._id, item.title)}
                                >
                                    <Text style={styles.listTitle}>{item.title}</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.showShareInputBtn}
                                    onPress={() =>
                                        setShowShareInput(prev =>
                                            prev.show && prev.id === item._id ? { show: false, id: null } : { show: true, id: item._id }
                                        )
                                    }
                                >
                                    <Text style={styles.showShareInputBtnText}>share</Text>
                                </TouchableOpacity>
                            </View>

                            {showShareInput.show && showShareInput.id === item._id && (
                                <View style={styles.shareEmailContainer}>
                                    <TextInput
                                        style={styles.shareInput}
                                        placeholder="Write email to share..."
                                        placeholderTextColor="#555"
                                        value={shareEmail}
                                        onChangeText={setShareEmail}
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                    />
                                    <TouchableOpacity style={styles.shareBtn} onPress={() => shareHandler(item._id)}>
                                        <Text style={styles.shareBtnText}>Send</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    )}
                    refreshing={loading}   // 🔹 shows spinner when loading
                />
                {error && <Text style={{ color: "red" }}>{error}</Text>}
            </View>
        </KeyboardAvoidingView>

    );
}
