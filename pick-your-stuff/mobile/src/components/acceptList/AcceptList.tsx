import { useEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { api } from "../../api/axios";
import { RootStackParamList } from "../../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type AcceptListProps = NativeStackScreenProps<RootStackParamList, 'AcceptList'>;
export default function AcceptList({ route, navigation }: AcceptListProps) {
    const { token } = route.params;
    console.log('ACCEPT LIST PAGE:', token);
    useEffect(() => {
        const acceptList = async () => {
            try {
                const res = await api.get(`/list/accept-list/${token}`);
                console.log(res.data.message);
                navigation.navigate('Your Lists');
            } catch (err) {
                console.error("Error accepting shared list:", err);
            }
        };

        acceptList();
    }, [token]);

    return null;
}

