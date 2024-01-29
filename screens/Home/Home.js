import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import ItemCard from "../../components/Cards/ItemCard";
import { useIsFocused } from '@react-navigation/native';
import { fetchData } from "../../util/Data";

import ActionButton from "../../components/Buttons/ActionButton";
import NewItemModal from "../../Modals/NewItemModal";

function Home() {
  const [activeModal, setActiveModal] = useState(false);
  const [storedData, setStoredData] = useState([])
  
  const isFocused = useIsFocused();

  const addNewItemHandler = () => {
    modalHandler();
  };

  const modalHandler = () => {
    setActiveModal(!activeModal)
  }

  const loadBundleToStack = (bundle) => {
    // console.log(bundle)
    setActiveModal(false)
    setStoredData(currentList => [
        ...currentList,
        bundle
    ])
  }

  useEffect(() => {
    const loadData = async () => {
        const retrievedData = await fetchData();
        console.log(retrievedData)
        setStoredData(retrievedData)
    }
    if(isFocused){
        loadData()
    }
  }, [])

  return (
    <View style={styles.homeContainer}>
      <Text style={styles.homeTitle}>Lista de enfermedades</Text>
      <FlatList
        data={storedData}
        renderItem={({ item }) => <ItemCard patientData={item} />}
        keyExtractor={(item) => item.id}
      />

      <ActionButton onPress={addNewItemHandler} />
      <NewItemModal active={activeModal} onExit={modalHandler} onRetrieveBundle={loadBundleToStack}/>
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
