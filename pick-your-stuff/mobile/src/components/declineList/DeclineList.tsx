import { useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import { api } from "../../api/axios";

// Type the screen props
type DeclineListProps = NativeStackScreenProps<RootStackParamList, 'DeclineList'>;

export default function DeclineList({ route, navigation }: DeclineListProps) {
    const { token } = route.params;

    useEffect(() => {
        const declineList = async () => {
            try {

                const res = await api.get(`/list/decline-list/${token}`);
                console.log(res.data.message);
                navigation.navigate("Your Lists");
            } catch (err) {
                console.error("Error declining shared list:", err);
            }
        };

        declineList();
    }, [token]);

    return null;
}
