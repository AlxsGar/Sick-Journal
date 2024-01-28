import {
  Button,
  Image,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Colors from "../util/Colors";
import ExitButton from "../components/Buttons/ExitButton";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";

function NewItemModal({ active, onExit }) {
  const [activePicker, setActivePicker] = useState(false);
  const [dateSelected, setDateSelected] = useState(new Date().toDateString());
  const [displayedDate, setDisplayedDate] = useState(new Date());
  const [previewPhoto, setPreviewPhoto] = useState(require('../assets/Images/no-image.png'))

  const changeDateHandler = ({ type }, selectedDate) => {
    if (type === "set") {
      setDisplayedDate(selectedDate);
      if (Platform.OS === "android") {
        setActivePicker(false);
        setDateSelected(selectedDate.toDateString());
      }
    } else {
      datePickerHandler();
    }
  };

  const datePickerHandler = () => {
    setActivePicker(!activePicker);
  };

  const iosDateAssignHandler = () => {
    setDateSelected(displayedDate.toDateString());
    datePickerHandler(false);
  };

  const openCameraHandler = () => {
    console.log('pressed')
  }

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
              <Pressable onPress={datePickerHandler}>
                <TextInput
                  style={[styles.inputDesign]}
                  value={dateSelected}
                  editable={false}
                  onPressIn={datePickerHandler}
                />
              </Pressable>
              {activePicker && (
                <DateTimePicker
                  mode="date"
                  display="spinner"
                  value={displayedDate}
                  onChange={changeDateHandler}
                />
              )}
              {activePicker && Platform.OS === "ios" && (
                <View style={styles.iOSButtonLayout}>
                  <Button
                    color={"red"}
                    title="Cancelar"
                    onPress={datePickerHandler}
                  />
                  <Button title="Confirmar" onPress={iosDateAssignHandler} />
                </View>
              )}
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Foto: </Text>
              <View style={styles.photoPreviewContainer}>
                <Pressable onPress={openCameraHandler}>
                  <Image style={styles.photoPreview} source={previewPhoto}/>
                </Pressable>
              </View>
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
  iOSButtonLayout: {
    flexDirection: "row",
    justifyContent: "center",
    columnGap: 40,
  },
  photoPreviewContainer: {
    backgroundColor: '#F7F7F7',
    height: 200,
    borderRadius: 10,
  },
  photoPreview: {
    width: '100%',
    height: '100%'
  }
});

export default NewItemModal;
