import { View, Text, TouchableOpacity, Alert, ActivityIndicator, FlatList, Platform, KeyboardAvoidingView, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";

import { styles } from "./sharedLists.styles";
import { useLists } from "../../hooks/useList";
import { RootStackParamList } from "../../types";  //

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "SharedListItem"
>;
export default function SharedLists() {
    const { sharedLists, listsLoading, deleteSharedList, error, refresh } = useLists();
    const [actionError, setActionError] = useState<string | null>(null);
    const navigation = useNavigation<NavigationProp>();

    const showDeleteConfirmation = (id: string, title: string) => {
        Alert.alert("Delete List", `Are you sure you want to delete "${title}"?`, [
            { text: "Cancel", style: "cancel" },
            { text: "Delete", style: "destructive", onPress: () => deleteSharedList(id) },
        ]);
    };
    if (listsLoading) {
        return (
            <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
                <ActivityIndicator size="large" color="#6a0dad" />
                <Text style={styles.spinnerText}>Loading lists...</Text>
            </View>
        );
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#f2f2f7" }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0} // can adjust if needed
            >
                <View style={styles.container}>
                    {actionError && <Text style={{ color: "red", textAlign: "center", marginVertical: 5 }}>{actionError}</Text>}
                    {sharedLists.length > 0 ? (
                        <FlatList
                            contentContainerStyle={{ paddingBottom: 80 }}
                            data={sharedLists}
                            keyExtractor={(list) => list._id}
                            renderItem={({ item }) => (
                                <View key={item._id}>
                                    <View style={styles.listContainer}>
                                        <TouchableOpacity
                                            style={styles.button}
                                            // onPress={() => navigation.navigate("Shared List", { id: item._id, title: item.title })}
                                            onPress={() => navigation.navigate("SharedListItem", { id: item._id, title: item.title })}

                                            onLongPress={() => showDeleteConfirmation(item._id, item.title)}
                                        >
                                            <Text style={styles.listTitle}>{item.title}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                            refreshing={listsLoading}
                            onRefresh={refresh}
                        />
                    ) : (
                        <View style={styles.noDataContainer}>
                            <Text style={styles.noDataText}>No shared lists yet...</Text>
                        </View>
                    )}
                    {error && <Text style={{ color: "red", textAlign: "center" }}>{error}</Text>}
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
