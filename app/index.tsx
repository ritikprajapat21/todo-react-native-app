import AddButton from "@/components/AddButton";
import Modal from "@/components/Modal";
import { Colors } from "@/constant/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Pressable, Text, View, StyleSheet, TextInput } from "react-native";
import Animated, { LinearTransition } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Todo = {
  id: number;
  title: string;
  isCompleted: boolean;
  createAt: Date;
};

export default function Index() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editTodoId, setEditTodoId] = useState(0);
  const [editTodoTitle, setEditTodoTitle] = useState("");

  useEffect(() => {
    const getTodos = async () => {
      const json = await AsyncStorage.getItem("todos");
      const todos = json ? JSON.parse(json) : [];

      if (todos.length) {
        setTodos(todos);
      } else {
        setTodos([]);
      }
    };

    getTodos();
  }, []);

  const onClose = () => {
    setCreateModalVisible(false);
  };

  const addTodo = () => {
    setTodos((p) => {
      const newTodo = {
        id: p.length + 1,
        title,
        isCompleted: false,
        createAt: new Date(),
      };
      return [newTodo, ...p];
    });

    setCreateModalVisible(false);
    setTitle("");
  };

  const toggleTodo = (id: number) => {
    console.log(id);
    setTodos((p) =>
      p.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo,
      ),
    );
  };

  const removeTodo = (id: number) => {
    setTodos((p) => p.filter((todo) => todo.id !== id));
  };

  const closeEditModal = () => {
    setEditModalVisible(false);
  };

  const editTodoSave = () => {
    const editTodo = todos.find((todo) => todo.id === editTodoId);
    if (editTodo) {
      editTodo.title = editTodoTitle;

      setTodos((p) => {
        const todos = p.filter((e) => e.id !== editTodoId);

        return [editTodo, ...todos];
      });
      setEditModalVisible(false);
    }
  };

  const editTodo = (id: number) => {
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      setEditTodoId(id);
      setEditTodoTitle(todo.title);
      setEditModalVisible(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ padding: 10 }}>
        <Animated.FlatList
          data={todos}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={
            <View>
              <Text style={styles.empty}>No todos present</Text>
            </View>
          }
          itemLayoutAnimation={LinearTransition}
          renderItem={(e) => {
            return (
              <View
                style={[
                  styles.itemContainer,
                  e.item.isCompleted && styles.completed,
                ]}
              >
                <Text
                  style={[
                    styles.text,
                    e.item.isCompleted && styles.completedText,
                  ]}
                >
                  {e.item.title}
                </Text>
                <View style={styles.buttonContainer}>
                  <Pressable onPress={() => editTodo(e.item.id)}>
                    <MaterialIcons
                      name="edit"
                      size={24}
                      color={Colors.danger}
                    />
                  </Pressable>
                  <Pressable onPress={() => toggleTodo(e.item.id)}>
                    {e.item.isCompleted ? (
                      <MaterialIcons
                        name="close"
                        size={24}
                        color={Colors.danger}
                      />
                    ) : (
                      <MaterialIcons
                        name="check"
                        size={24}
                        color={Colors.danger}
                      />
                    )}
                  </Pressable>

                  <Pressable onPress={() => removeTodo(e.item.id)}>
                    <MaterialIcons
                      name="delete"
                      size={24}
                      color={Colors.danger}
                    />
                  </Pressable>
                </View>
              </View>
            );
          }}
        />
      </View>
      <AddButton onPress={() => setCreateModalVisible(true)} />
      <Modal
        title="Edit Todo"
        withInput
        isVisible={editModalVisible}
        onClose={closeEditModal}
      >
        <View style={styles.modalContent}>
          <TextInput
            style={styles.input}
            placeholder="Enter your task"
            placeholderTextColor={Colors.secondaryText}
            defaultValue={editTodoTitle}
            onChangeText={setEditTodoTitle}
          />
          <Pressable style={styles.button} onPress={editTodoSave}>
            <Text style={styles.buttonText}>Save</Text>
          </Pressable>
        </View>
      </Modal>
      <Modal
        title="Add Todo"
        withInput
        isVisible={createModalVisible}
        onClose={onClose}
      >
        <View style={styles.modalContent}>
          <TextInput
            style={styles.input}
            placeholder="Enter your task"
            placeholderTextColor={Colors.secondaryText}
            onChangeText={setTitle}
          />
          <Pressable style={styles.button} onPress={addTodo}>
            <Text style={styles.buttonText}>Save</Text>
          </Pressable>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.todoItemBackground,
    marginBottom: 10,
    alignItems: "center",
    borderRadius: 8,
    padding: 10,
  },
  empty: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    marginTop: 10,
  },
  text: {
    fontSize: 18,
    color: Colors.primaryText,
  },
  completed: {
    backgroundColor: Colors.doneItemBackground,
  },
  completedText: {
    textDecorationLine: "line-through",
  },
  modalContent: {
    flex: 1,
    gap: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    padding: 10,
    borderWidth: 1,
    width: "70%",
    borderColor: "#ccc",
    color: "white",
    borderRadius: 8,
    elevation: 0,
    fontSize: 18,
  },
  buttonContainer: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
  button: {
    padding: 10,
    backgroundColor: Colors.primaryButton,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
});
