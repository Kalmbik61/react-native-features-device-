import { useCallback, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { COLORS } from "../../styles/styles";
import MapVew, { Marker } from "react-native-maps";
import IconButton from "../components/global/IconButton";

export default function Map({ navigation }) {
  const [marker, setMarker] = useState();

  const region = {
    latitude: 37.78,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const onPressHandler = (e) => {
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
  }, [marker, navigation]);

  useLayoutEffect(() => {
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
  }, [marker, navigation]);

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
