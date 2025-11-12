import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Login = () => {
  const [studentId, setStudentId] = useState("");
  const [pwd, setPwd] = useState("");

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={styles.loginContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.loginInputView}>
          <Text>학번</Text>
          <TextInput
            placeholder="학번 8자리"
            value={studentId}
            onChangeText={setStudentId}
            style={styles.textInput}
          />
          <Text>비밀번호</Text>
          <TextInput
            placeholder="비밀번호를 입력해주세요."
            value={pwd}
            onChangeText={setPwd}
            secureTextEntry
            style={styles.textInput}
          />
          <Pressable style={styles.loginBtn}>
            <Text style={styles.loginText}>Log In</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  loginInputView: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 22,
    alignItems: "center",
  },
  textInput: {
    width: 272,
    height: 45,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginVertical: 15,
  },
  loginBtn: {
    backgroundColor: "#215294",
    width: 272,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  loginText: {
    color: "white",
    fontSize: 16,
  },
});
