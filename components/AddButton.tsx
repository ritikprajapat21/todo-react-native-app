import { Colors } from "@/constant/Colors";
import { AntDesign } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";

type Props = {
  onPress: () => void;
};

const AddButton = ({ onPress }: Props) => {
  return (
    <View style={styles.floatingButtonContainer}>
      <Pressable style={styles.floatingButton} onPress={onPress}>
        <AntDesign name="pluscircleo" size={32} color="white" />
      </Pressable>
    </View>
  );
};

export default AddButton;

const styles = StyleSheet.create({
  floatingButtonContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
    padding: 10,
    borderRadius: 100,
    backgroundColor: Colors.primaryButton,
  },
  floatingButton: {
    alignItems: "center",
    borderStyle: undefined,
    elevation: 0,
    borderRadius: 100,
  },
});
