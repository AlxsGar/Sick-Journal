import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import Colors from "../../util/Colors";
import { useState } from "react";

function ImagePicker({onRetrieveUri}) {
  const [previewPhoto, setPreviewPhoto] = useState();
  const [cameraPermission, requestPermission] = useCameraPermissions();

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
    onRetrieveUri(imageTaken.assets[0].uri)
    setPreviewPhoto(imageTaken.assets[0].uri);
  };

  return (
    <View>
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
            <Image style={styles.photoPreview} source={{ uri: previewPhoto }} />
          )}
        </Pressable>
      </View>
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

export default ImagePicker;
