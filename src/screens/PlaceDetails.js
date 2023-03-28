import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
} from "react-native";
import OutlineBtn from "../components/global/OutlineBtn";
import { COLORS } from "../../styles/styles";
import { fetchPlaceDetails } from "../../utils/database";

export default function PlaceDetails({ route, navigation }) {
  const placeId = route.params.placeId;

  const [place, setPlace] = useState();

  useEffect(() => {
    (async () => {
      const p = await fetchPlaceDetails(placeId);
      setPlace(p);
      navigation.setOptions({
        title: p.title,
      });
    })();
  }, [placeId]);

  const onShowMap = () => {
    navigation.navigate("Map", {
      initialLat: place.location.lat,
      initialLng: place.location.lng,
    });
  };

  if (!place)
    return (
      <View style={styles.loader}>
        <ActivityIndicator size={"large"} color={COLORS.accent500} />
      </View>
    );

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: place.imageUri }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{place.address}</Text>
        </View>
        <OutlineBtn icon='map' onPress={onShowMap}>
          View on Map
        </OutlineBtn>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: COLORS.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
