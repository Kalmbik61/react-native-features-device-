import { FlatList, Text, View, StyleSheet } from "react-native";
import PlaceItem from "./PlaceItem";
import { COLORS } from "../../../styles/styles";

export default function PlacesList({ places }) {
  if (!places || !places.length) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>No places added yet</Text>
      </View>
    );
  }
  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <PlaceItem {...item} onSelect={() => {}} />}
    />
  );
}

const styles = StyleSheet.create({
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
