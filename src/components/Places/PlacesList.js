import { FlatList, Text, View, StyleSheet } from "react-native";
import PlaceItem from "./PlaceItem";
import { COLORS } from "../../../styles/styles";
import { useNavigation } from "@react-navigation/native";

export default function PlacesList({ places }) {
  const navigation = useNavigation();
  if (!places || !places.length) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>No places added yet</Text>
      </View>
    );
  }

  const onSelectPlace = (id) => {
    navigation.navigate("PlaceDetails", { placeId: id });
  };

  return (
    <FlatList
      style={styles.list}
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <PlaceItem {...item} onSelect={onSelectPlace} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    margin: 24,
  },
  fallbackContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  fallbackText: {
    fontSize: 16,
    color: COLORS.primary200,
  },
});
