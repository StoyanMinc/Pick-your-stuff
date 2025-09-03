import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    checkButtonsContainer: {
        flexDirection: 'row',
        gap: 10
    },
    checkingBtn: {
        padding: 5,
        borderRadius: 5
    },
    checkBtn: {
        backgroundColor: 'green',
    },
    uncheckBtn: {
        backgroundColor: 'red',
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        width: 150,
        borderRadius: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 12
    },
    itemView: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        padding: 5,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderColor: '#ccc'
    },
    switch: {
        transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }]
    },
    noDataContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    noDataText: {
        fontWeight: 'bold',
        fontSize: 25
    }
})