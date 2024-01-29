import React, { useState } from "react";
import {
  Button,
  Pressable,
  Text,
  TextInput,
  View,
  Platform,
  StyleSheet,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Colors from "../../util/Colors";

function DatePicker({onRetrieveDate}) {
  const [activePicker, setActivePicker] = useState(false);
  const [dateSelected, setDateSelected] = useState(new Date().toDateString());
  const [displayedDate, setDisplayedDate] = useState(new Date());
  const changeDateHandler = ({ type }, selectedDate) => {
    if (type === "set") {
      setDisplayedDate(selectedDate);
      if (Platform.OS === "android") {
        setActivePicker(false);
        setDateSelected(selectedDate.toDateString());
        onRetrieveDate(selectedDate.toDateString())
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
    onRetrieveDate(displayedDate.toDateString())
    datePickerHandler(false);
  };

  return (
    <View>
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
          <Button color={"red"} title="Cancelar" onPress={datePickerHandler} />
          <Button title="Confirmar" onPress={iosDateAssignHandler} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
  iOSButtonLayout: {
    flexDirection: "row",
    justifyContent: "center",
    columnGap: 40,
  },
});

export default DatePicker;
