import React, { useState } from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { COLORS } from "../../../styles/styles";
import OutlineBtn from "../global/OutlineBtn";

export default function ImageTaker({ onImageTaken }) {
  const [cameraPermisionStatus, requestPermistion] = useCameraPermissions();

  const [imgPreview, setImagePreview] = useState(null);

  const verifyPermisions = async () => {
    if (cameraPermisionStatus.status === PermissionStatus.UNDETERMINED) {
      const res = await requestPermistion();

      return res.granted;
    }
    if (cameraPermisionStatus.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permission",
        "You need to grant camera permissions to use this app."
      );
      return false;
    }

    return true;
  };

  const onTakeImage = async () => {
    const hasPermision = await verifyPermisions();

    if (!hasPermision) return;

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    setImagePreview(image.assets[0].uri);
    onImageTaken(image.assets[0].uri);
  };

  const imagePreview = imgPreview ? (
    <Image source={{ uri: imgPreview }} style={styles.preview} />
  ) : (
    <Text>No image taken yet.</Text>
  );

  return (
    <View>
      <View style={styles.previewContainer}>{imagePreview}</View>
      <OutlineBtn icon={"camera"} onPress={onTakeImage}>
        Take image
      </OutlineBtn>
    </View>
  );
}

const styles = StyleSheet.create({
  previewContainer: {
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 200,
    backgroundColor: COLORS.primary100,
  },
  previewText: {},
  preview: {
    width: "100%",
    height: "100%",
  },
});
