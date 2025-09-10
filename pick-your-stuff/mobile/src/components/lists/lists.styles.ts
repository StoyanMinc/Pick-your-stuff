import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f7',
        padding: 20,
    },
    addList: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 10,
    },
    addButton: {
        backgroundColor: 'blue',
        padding: 10,
        width: 150,
        borderRadius: 10,
    },
    confirmButton: {
        backgroundColor: 'green'
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 12
    },
    addListContainer: {
        gap: 10,
        alignItems: 'center',
        marginBottom: 10
    },
    input: {
        borderColor: 'green',
        borderWidth: 0.2,
        paddingVertical: 15,
        paddingHorizontal: 10,
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 10
    },
    buttonPressed: {
        transform: [{ scale: 0.97 }],
    },
    listContainer: {
        flexDirection: 'row',
        gap: 5,
        marginBottom: 12,
    },
    button: {
        backgroundColor: '#6a0dad',
        paddingVertical: 7,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    listTitle: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: '700',
        color: '#fff',
    },
    showShareInputBtn: {
        backgroundColor: 'hsla(275, 86%, 51%, 1.00)',
        paddingVertical: 7,
        paddingHorizontal: 7,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    showShareInputBtnText: {
        color: '#fff',
        fontWeight: 'bold'
    },
    shareEmailContainer: {
        flexDirection: 'row',
        gap: 5,
        marginBottom: 10
    },
    shareInput: {
        borderColor: 'green',
        borderWidth: 0.2,
        paddingVertical: 15,
        paddingHorizontal: 10,
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 10
    },
    shareBtn: {
        backgroundColor: 'green',
        paddingHorizontal: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    shareBtnText: {
        color: '#fff',
        fontWeight: 'bold'
    },
    spinner: {
        color: "#6a0dad"
    },
    spinnerText: {
        marginTop: 10,
        fontSize: 20,
        fontWeight: 'bold'
    }
});
