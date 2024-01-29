import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Colors from "../util/Colors";
import ExitButton from "../components/Buttons/ExitButton";
import { useEffect, useState } from "react";
import LoginButton from "../components/Buttons/LoginButton";
import { insertData } from "../util/Data";
import DatePicker from "../components/DatePicker/DatePicker";
import ImagePicker from "../components/ImagePicker/ImagePicker";

function NewPatient({ onExit, onRetrieveBundle }) {
  const [data, setData] = useState({
    id: Math.ceil(Math.random() * 100),
    name: "",
    symptoms: "",
    doctor: "",
    phoneNo: 0,
    imageUri: "",
    date: new Date().toDateString(),
  });
  const [enableButton, setEnableButton] = useState({
    nameValid: false,
    doctorValid: false,
    phoneValid: false,
    symptomsValid: false,
    imageValid: false,
  });
  const [err, setErr] = useState(false)

  useEffect(() => {}, [data]);

  const retrieveDate = (dateRetrieved) => {
    setData({
      ...data,
      date: dateRetrieved,
    });
  };

  const retrieveImageUri = (imgUriRetrieved) => {
    setData({
      ...data,
      imageUri: imgUriRetrieved,
    });
    setEnableButton({
      ...enableButton,
      imageValid: imgUriRetrieved ? true : false,
    });
  };

  const nameChangeHandler = (nameInput) => {
    setData({
      ...data,
      name: nameInput,
    });
    setEnableButton({
      ...enableButton,
      nameValid: nameInput ? true : false,
    });
  };

  const doctorChangeHandler = (doctorInput) => {
    setData({
      ...data,
      doctor: doctorInput,
    });
    setEnableButton({
      ...enableButton,
      doctorValid: doctorInput ? true : false,
    });
  };

  const phoneCheck = (phoneSet) => {
    const phoneRx = /^\d{10}$/;
    if(phoneRx.test(phoneSet) === false) return false
    return true;
  };

  const phoneChangeHandler = (phoneInput) => {
    if (phoneCheck(phoneInput)) {
      setData({
        ...data,
        phoneNo: +phoneInput,
      });

      setErr(false)
    }else{
      setErr(true)
    }
    setEnableButton({
      ...enableButton,
      phoneValid: phoneCheck(phoneInput),
    });
  };

  const symptomsChangeHandler = (symptomsInput) => {
    setData({
      ...data,
      symptoms: symptomsInput,
    });
    setEnableButton({
      ...enableButton,
      symptomsValid: symptomsInput ? true : false,
    });
  };

  const submitData = async () => {
    if (
      !enableButton.nameValid ||
      !enableButton.doctorValid ||
      !enableButton.phoneValid ||
      !enableButton.symptomsValid ||
      !enableButton.imageValid
    )
      return;
    onRetrieveBundle(data);
    await insertData(data);
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
    setEnableButton({
      nameValid: false,
      doctorValid: false,
      phoneValid: false,
      symptomsValid: false,
      imageValid: false,
    });
  };
  return (
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
              maxLength={150}
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Doctor: </Text>
            <TextInput
              style={styles.inputDesign}
              placeholder="Ingresa el nombre del doctor atendiendo"
              onChangeText={doctorChangeHandler}
              autoCorrect={false}
              maxLength={150}
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
              maxLength={10}
            />
            {err && (
              <Text style={{ color: "red"}}>
                Ingrese un valor numerico correcto
              </Text>
            )}
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Malestar: </Text>
            <TextInput
              multiline={true}
              numberOfLines={5}
              style={[styles.inputDesign, styles.textArea]}
              placeholder="Detalla los malestares presentes del paciente"
              onChangeText={symptomsChangeHandler}
              maxLength={1024}
            />
          </View>
          <View style={styles.formGroup}>
            <DatePicker onRetrieveDate={retrieveDate} />
          </View>
          <View style={styles.formGroup}>
            <ImagePicker onRetrieveUri={retrieveImageUri} />
          </View>
          <LoginButton
            enable={
              enableButton.nameValid &&
              enableButton.doctorValid &&
              enableButton.phoneValid &&
              enableButton.symptomsValid &&
              enableButton.imageValid
            }
            onPress={submitData}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
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

export default NewPatient;
