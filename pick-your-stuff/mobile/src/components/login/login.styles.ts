import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#f2f2f7',
        padding: 20
    },
    titleContainer: {
        padding: 10,
        marginBottom: 20,
        alignItems: 'center'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'purple'
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: 'purple'
    },
    input: {
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        padding: 8,
        borderBlockColor: 'purple',
    },
    button: {
        marginTop: 10,
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
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16
    },
    registerText: {
        color: 'purple',
        textAlign: 'center',
        marginTop: 10,
        fontSize: 18
    },
    signUpLink: {
        fontWeight: 'bold',
        color: '#6a0dad',
        margin: 5
    }

});
