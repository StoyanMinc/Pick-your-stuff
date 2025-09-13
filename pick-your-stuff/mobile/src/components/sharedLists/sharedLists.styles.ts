import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        paddingHorizontal: 20,
        paddingBottom: 25,
        backgroundColor: '#f2f2f7',
    },
    listContainer: {
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
    spinnerText: {
        marginTop: 10,
        fontSize: 20,
        fontWeight: 'bold',
    },
    noDataContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    noDataText: {
        fontWeight: 'bold',
        fontSize: 25,
        color: '#6a0dad',
    },
});
