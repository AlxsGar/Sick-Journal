import {
  Button,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Colors from "../util/Colors";
import ExitButton from "../components/Buttons/ExitButton";
import { useState } from "react";

function NewItemModal({ active, onExit }) {
    

  return (
    <Modal visible={active} animationType="slide">
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <View style={styles.header}>
            <Text style={styles.title}>Registro del Paciente</Text>
            <ExitButton onExit={onExit} />
          </View>
          <View style={styles.formContainer}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Paciente: </Text>
              <TextInput
                style={styles.inputDesign}
                placeholder="Ingresa el nombre del paciente"
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Doctor: </Text>
              <TextInput
                style={styles.inputDesign}
                placeholder="Ingresa el nombre del doctor atendiendo"
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Télefono: </Text>
              <TextInput
                style={styles.inputDesign}
                placeholder="Ingresa el télefono del paciente"
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Malestar: </Text>
              <TextInput
                multiline={true}
                numberOfLines={5}
                style={[styles.inputDesign, styles.textArea]}
                placeholder="Detalla los malestares presentes del paciente"
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Fecha: </Text>
              
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    color: "#979797",
    fontWeight: "bold",
    fontSize: 24,
  },
  formContainer: {
    padding: 12,
  },
  formGroup: {
    marginVertical: 6,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.accentColor,
    marginBottom: 3,
  },
  inputDesign: {
    backgroundColor: "#F1F1F1",
    padding: 6,
    borderRadius: 6,
  },
  textArea: {
    textAlignVertical: "top",
    overflow: "scroll",
  },
});

export default NewItemModal;
