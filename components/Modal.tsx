import {
  KeyboardAvoidingView,
  Modal as NativeModal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constant/Colors";

type Props = {
  title: string;
  isVisible: boolean;
  children: React.ReactNode;
  onClose: () => void;
  withInput?: boolean;
};

const Modal = ({ title, isVisible, children, onClose, withInput }: Props) => {
  const Container = withInput ? KeyboardAvoidingView : View;
  return (
    <NativeModal
      style={styles.container}
      onRequestClose={onClose}
      animationType="slide"
      transparent={true}
      visible={isVisible}
    >
      <Container style={styles.modalContent}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          <Pressable onPress={onClose}>
            <MaterialIcons
              name="close"
              size={22}
              color={Colors.secondaryText}
              style={{ outline: "none" }}
            />
          </Pressable>
        </View>
        {children}
      </Container>
    </NativeModal>
  );
};

export default Modal;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    height: "35%",
    width: "100%",
    backgroundColor: Colors.background,
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: "absolute",
    overflow: "hidden",
    bottom: 0,
  },
  titleContainer: {
    height: "25%",
    backgroundColor: Colors.todoItemBackground,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    color: "#fff",
    fontSize: 18,
  },
});
