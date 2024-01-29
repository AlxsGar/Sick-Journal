import { Image, StyleSheet, Text, View } from "react-native";

function ItemCard({patientData}) {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.imageContainer}>
        <Image style={styles.medicNote} source={{uri: patientData.imageUri}} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.patientInfo}><Text style={styles.span}>Paciente:</Text> {patientData.name}</Text>
        <Text style={styles.patientInfo}><Text style={styles.span}>Malestar:</Text> {patientData.symptoms}</Text>
        <Text style={styles.patientInfo}><Text style={styles.span}>Doctor:</Text> {patientData.doctor}</Text>
        <Text style={styles.patientInfo}><Text style={styles.span}>Tel:</Text> {patientData.phoneNo}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderColor: "gray",
    height: 150,
    marginVertical: 12,
  },
  imageContainer: {
    flex: 3,
  },
  medicNote: {
    width: '100%',
    height: '100%'
  },
  infoContainer: {
    flex: 4,
    marginHorizontal: 6,
  },
  patientInfo: {
    textAlign: 'justify',
    marginVertical: 3,
  },
  span: {
    fontWeight: 'bold',
  }
});

export default ItemCard;
