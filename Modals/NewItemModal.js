import {
  Alert,
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
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { useState } from "react";
import LoginButton from "../components/Buttons/LoginButton";
import { insertData } from "../util/Data";

function NewItemModal({ active, onExit, onRetrieveBundle }) {
  const [data, setData] = useState({
    id: Math.ceil(Math.random() * 100),
    name: "",
    symptoms: "",
    doctor: "",
    phoneNo: 0,
    imageUri: "",
    date: new Date().toDateString(),
  });
  const [activePicker, setActivePicker] = useState(false);
  const [dateSelected, setDateSelected] = useState(new Date().toDateString());
  const [displayedDate, setDisplayedDate] = useState(new Date());
  const [previewPhoto, setPreviewPhoto] = useState();
  const [cameraPermission, requestPermission] = useCameraPermissions();

  const changeDateHandler = ({ type }, selectedDate) => {
    if (type === "set") {
      setDisplayedDate(selectedDate);
      if (Platform.OS === "android") {
        setActivePicker(false);
        setDateSelected(selectedDate.toDateString());
        setData({
          ...data,
          date: selectedDate.toDateString(),
        });
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
    setData({
      ...data,
      date: displayedDate.toDateString(),
    });
    datePickerHandler(false);
  };

  const permissionCheck = async () => {
    if (cameraPermission.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (cameraPermission.status === PermissionStatus.DENIED) {
      Alert.alert(
        "No se dio acceso a la camara.",
        "Se require acceso a la camara para tomar la foto de la receta."
      );
      return false;
    }

    return true;
  };

  const openCameraHandler = async () => {
    const permissionStatus = await permissionCheck();
    if (!permissionStatus) return;
    const imageTaken = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    setPreviewPhoto(imageTaken.assets[0].uri);
    setData({
      ...data,
      imageUri: imageTaken.assets[0].uri,
    });
  };

  const nameChangeHandler = (nameInput) => {
    setData({
      ...data,
      name: nameInput,
    });
  };

  const doctorChangeHandler = (doctorInput) => {
    setData({
      ...data,
      doctor: doctorInput,
    });
  };

  const phoneChangeHandler = (phoneInput) => {
    setData({
      ...data,
      phoneNo: +phoneInput,
    });
  };

  const symptomsChangeHandler = (symptomsInput) => {
    setData({
      ...data,
      symptoms: symptomsInput,
    });
  };

  const submitData = async () => {
    onRetrieveBundle(data);
    await insertData(data)
    resetData();
  };

  const resetData = () => {
    setData({
      id: Math.ceil(Math.random() * 100),
      name: "",
      symptoms: "",
      doctor: "",
      phoneNo: 0,
      imgUri: "",
      date: new Date().toDateString(),
    });
    setPreviewPhoto();
  };

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
                onChangeText={nameChangeHandler}
                autoCorrect={false}
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Doctor: </Text>
              <TextInput
                style={styles.inputDesign}
                placeholder="Ingresa el nombre del doctor atendiendo"
                onChangeText={doctorChangeHandler}
                autoCorrect={false}
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Télefono: </Text>
              <TextInput
                style={styles.inputDesign}
                placeholder="Ingresa el télefono del paciente"
                onChangeText={phoneChangeHandler}
                autoCorrect={false}
                inputMode="numeric"
                keyboardType="numeric"
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Malestar: </Text>
              <TextInput
                multiline={true}
                numberOfLines={5}
                style={[styles.inputDesign, styles.textArea]}
                placeholder="Detalla los malestares presentes del paciente"
                onChangeText={symptomsChangeHandler}
              />
            </View>
            <View style={styles.formGroup}>
              <Pressable onPress={datePickerHandler}>
                <Text style={styles.label}>Fecha: </Text>
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
                  textColor="black"
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
                <Pressable
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={openCameraHandler}
                >
                  {!previewPhoto && <Text>Pulse aquí para tomar foto</Text>}
                  {previewPhoto && (
                    <Image
                      style={styles.photoPreview}
                      source={{ uri: previewPhoto }}
                    />
                  )}
                </Pressable>
              </View>
            </View>
            <LoginButton enable={true} onPress={submitData} />
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
    backgroundColor: "#F7F7F7",
    height: 200,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    overflow: "hidden",
  },
  photoPreview: {
    width: "100%",
    height: "100%",
  },
});

export default NewItemModal;
