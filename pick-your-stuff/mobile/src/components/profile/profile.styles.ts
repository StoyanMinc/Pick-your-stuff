import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: "center",
    },
    greeting: {
        fontSize: 20,
        fontWeight: "600",
        marginBottom: 30,
    },
    section: {
        width: "100%",
        marginBottom: 25,
    },
    label: {
        fontSize: 16,
        fontWeight: "500",
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        padding: 12,
        marginBottom: 12,
    },
    button: {
        backgroundColor: "#6a0dad",
        padding: 14,
        borderRadius: 12,
        alignItems: "center",
    },
    logoutButton: {
        backgroundColor: "#d9534f",
        marginTop: 10,
        width: "100%",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "600",
    },
    dangerZone: {
        marginTop: 40,
        padding: 20,
        borderWidth: 1,
        borderColor: "#f5c6cb",
        borderRadius: 12,
        width: "100%",
        backgroundColor: "#f8d7da",
    },
    dangerLabel: {
        fontSize: 16,
        fontWeight: "700",
        color: "#721c24",
        marginBottom: 12,
    },
    deleteButton: {
        backgroundColor: "#c82333",
        padding: 14,
        borderRadius: 12,
        alignItems: "center",
    },
    deleteButtonText: {
        color: "#fff",
        fontWeight: "700",
    },
    resultMessage: {
        marginBottom: 10,
        fontSize: 16,
        fontWeight: 'bold'
    },
    successMessage: {
        color: '#28a745'
    },
    errorMessage: {
        color: 'red'
    }
});
