import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function PlaceItem({
  title,
  id,
  location,
  imageUri,
  address,
  onSelect,
}) {
  return (
    <Pressable onPress={onSelect}>
      <View>
        <Image source={{ uri: imageUri }} />
        <Text>{title}</Text>
        <Text>{address}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({});
