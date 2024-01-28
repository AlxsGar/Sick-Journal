import React, { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import ItemCard from "../../components/Cards/ItemCard";

import { patientData } from "../../util/Data";
import ActionButton from "../../components/Buttons/ActionButton";
import NewItemModal from "../../Modals/NewItemModal";

function Home() {
  const [activeModal, setActiveModal] = useState(false);
  const retrievedPatientData = patientData;

  const addNewItemHandler = () => {
    modalHandler();
  };

  const modalHandler = () => [
    setActiveModal(!activeModal)
  ]

  return (
    <View style={styles.homeContainer}>
      <Text style={styles.homeTitle}>Lista de enfermedades</Text>
      <FlatList
        data={retrievedPatientData}
        renderItem={({ item }) => <ItemCard patientData={item} />}
        keyExtractor={(item) => item.id}
      />

      <ActionButton onPress={addNewItemHandler} />
      <NewItemModal active={activeModal} onExit={modalHandler}/>
    </View>
  );
}

const styles = StyleSheet.create({
  homeTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 12,
    textAlign: "center",
  },
  homeContainer: {
    flex: 1,
  },
});

export default Home;
