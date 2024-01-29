import { Image, StyleSheet, Text, View } from "react-native";

function ItemCard({ patientData }) {
  const limitSymptomsText = (symptomsText) => {
    return symptomsText.substring(0, 49);
  };
  return (
    <View style={styles.cardContainer}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.medicNote}
          source={{ uri: patientData.imageUri }}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.patientInfo}>
          <Text style={styles.span}>Paciente:</Text> {patientData.name}
        </Text>
        <Text style={styles.patientInfo}>
          <Text style={styles.span}>Malestar:</Text>{" "}
          {limitSymptomsText(patientData.symptoms)}
        </Text>
        <Text style={styles.patientInfo}>
          <Text style={styles.span}>Doctor:</Text> {patientData.doctor}
        </Text>
        <Text style={styles.patientInfo}>
          <Text style={styles.span}>Tel:</Text> {patientData.phoneNo}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    borderRadius: 10,
    height: 150,
    marginVertical: 6,
    padding: 6,
    backgroundColor: "#F8F8F8",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  imageContainer: {
    flex: 3,
    borderRadius: 10,
    overflow: "hidden",
  },
  medicNote: {
    width: "100%",
    height: "100%",
  },
  infoContainer: {
    flex: 4,
    marginHorizontal: 6,
    justifyContent: "space-between",
  },
  patientInfo: {
    textAlign: "justify",
    marginVertical: 3,
  },
  span: {
    fontWeight: "bold",
  },
});

export default ItemCard;
