import { View, Text, TouchableOpacity, Animated, Easing } from "react-native";
import { useContext, useEffect, useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { UserContext } from "../../contexts/UserContext";
import { styles } from "./home.styles";
import { Ionicons } from "@expo/vector-icons";

export default function Home({ navigation }: any) {
  const { user } = useContext(UserContext);

  // 🔹 Animate gradient shift
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 8000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 8000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  const bgInterpolation = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["#6a0dad", "#ff6ec4"]
  });

  return (
    <Animated.View style={[styles.container, { backgroundColor: bgInterpolation }]}>
      <LinearGradient
        colors={["rgba(255,255,255,0.15)", "rgba(255,255,255,0.05)"]}
        style={styles.card}
      >
        <Ionicons name="sparkles" size={50} color="#fff" style={styles.icon} />

        <Text style={styles.greeting}>
          Welcome back{user?.username ? `, ${user.username}` : ""}!
        </Text>
        <Text style={styles.subText}>Your stuff are waiting 🚀</Text>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => navigation.navigate("Your Lists")}
        >
          <Text style={styles.buttonText}>✨ Go to your lists</Text>
        </TouchableOpacity>
      </LinearGradient>
    </Animated.View>
  );
}
