import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../../styles/styles";

export default function PlaceItem({
  title,
  id,
  location,
  imageUri,
  address,
  onSelect,
}) {
  const onSelectPlace = () => {
    onSelect(id);
  };

  return (
    <Pressable
      onPress={onSelectPlace}
      style={({ pressed }) => [styles.item, pressed && styles.pressed]}
    >
      <Image source={{ uri: imageUri }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.address}>{address}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 6,
    marginVertical: 12,
    backgroundColor: COLORS.primary500,
    elevation: 2,
    shadowColor: "black",
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
  },
  pressed: {
    opacity: 0.9,
  },
  image: {
    flex: 1,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    height: 100,
  },
  info: {
    flex: 2,
    padding: 12,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: COLORS.gray700,
  },
  address: {
    marginTop: 5,
    fontSize: 12,
    color: COLORS.gray700,
  },
});
