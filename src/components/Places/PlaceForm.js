import React, { useCallback, useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import { ScrollView, Text, View } from "react-native";
import { COLORS } from "../../../styles/styles";
import ImageTaker from "./ImageTaker";
import LocationPicker from "./LocationPicker";
import OutlineBtn from "../global/OutlineBtn";
import { Place } from "../../models/place";

export default function PlaceForm({ onCreatePlaceHandler }) {
  const [title, setTitle] = useState("");
  const [pickedImage, setPickedImage] = useState();
  const [pickedLocation, setPickedLocation] = useState();

  const onChangeTitle = (v) => setTitle(v);

  const onImageTaken = useCallback((uri) => {
    setPickedImage(uri);
  }, []);
  const onLocaitonTaken = useCallback((loc) => {
    setPickedLocation(loc);
  }, []);

  const onFormSubmit = () => {
    const place = new Place(title, pickedImage, pickedLocation);
    onCreatePlaceHandler(place);
  };

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={onChangeTitle}
        />
      </View>

      <ImageTaker onImageTaken={onImageTaken} />
      <LocationPicker onLocaitonTaken={onLocaitonTaken} />

      <OutlineBtn
        icon={"save"}
        containerStyle={styles.formButton}
        textStyle={styles.formButton_text}
        onPress={onFormSubmit}
      >
        Save
      </OutlineBtn>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: COLORS.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: COLORS.primary700,
    borderBottomWidth: 2,
    backgroundColor: COLORS.primary100,
  },
  formButton: {
    backgroundColor: COLORS.primary500,
    marginTop: 20,
  },
  formButton_text: {
    color: "#fff",
  },
});
