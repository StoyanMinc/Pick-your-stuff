import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f7',
        padding: 20,
    },
    button: {
        backgroundColor: '#6a0dad',
        paddingVertical: 15,
        paddingHorizontal: 10,
        marginBottom: 15,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonPressed: {
        transform: [{ scale: 0.97 }],
    },
    listTitle: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: '700',
        color: '#fff',
    },
});
