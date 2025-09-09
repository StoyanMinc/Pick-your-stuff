import { View, Text } from "react-native";
import { useContext } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { UserContext } from "../../contexts/UserContext";
import { styles } from "./home.styles";

export default function Home() {
    const { user } = useContext(UserContext);
    console.log(user);
    return (
        <LinearGradient
            colors={["#6a0dad", "#9b59b6", "#d2b4de"]}
            style={styles.container}
        >
            <View>
                <Text style={styles.greeting}>
                    Welcome back{user?.username ? `, ${user.username}` : ""}!
                </Text>
                <Text style={styles.subText}>
                    We’re glad to see you here ✨
                </Text>
            </View>
        </LinearGradient>
    );
}
