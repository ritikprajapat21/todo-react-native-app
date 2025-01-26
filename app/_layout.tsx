import { Colors } from "@/constant/Colors";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: Colors.todoItemBackground },
          headerTitleStyle: {
            color: "white",
            fontWeight: "semibold",
            fontSize: 24,
          },
        }}
      >
        <Stack.Screen name="index" options={{ title: "Todos" }} />
        <Stack.Screen
          name="+not-found"
          options={{ headerShown: true, title: "Oops!" }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
