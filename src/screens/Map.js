import { useCallback, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { COLORS } from "../../styles/styles";
import MapVew, { Marker } from "react-native-maps";
import IconButton from "../components/global/IconButton";

export default function Map({ navigation, route }) {
  const initialLocation = route.params
    ? { lat: route.params.initialLat, lng: route.params.initialLng }
    : undefined;

  const [marker, setMarker] = useState(initialLocation);

  const region = {
    latitude: initialLocation ? initialLocation.lat : 37.78,
    longitude: initialLocation ? initialLocation.lng : -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const onPressHandler = (e) => {
    if (initialLocation) return;
    const lat = e.nativeEvent.coordinate.latitude;
    const lng = e.nativeEvent.coordinate.longitude;
    setMarker({ lat, lng });
  };

  const onSaveSelectedLocation = useCallback(() => {
    if (!marker) {
      Alert.alert("No location picked!", "Pick to location on the map first!");
    }
    navigation.navigate("AddPlace", {
      pickedLocaiton: marker,
    });
  }, [marker, navigation, route]);

  useLayoutEffect(() => {
    if (initialLocation) return;

    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon={"save"}
          color={tintColor}
          size={24}
          onPress={onSaveSelectedLocation}
        />
      ),
    });
  }, [marker, navigation, initialLocation]);

  return (
    <MapVew style={styles.container} region={region} onPress={onPressHandler}>
      {marker && (
        <Marker coordinate={{ latitude: marker.lat, longitude: marker.lng }} />
      )}
    </MapVew>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: COLORS.primary100,
  },
});
