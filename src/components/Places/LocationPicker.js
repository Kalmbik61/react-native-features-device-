import { StyleSheet, View, Alert, Image, Text } from "react-native";
import OutlineBtn from "../global/OutlineBtn";
import { COLORS } from "../../../styles/styles";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import { useEffect, useState } from "react";
import { getMapPreview } from "../../../utils/locaiton";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getAddress } from "../../../utils/locaiton";

export default function LocationPicker({ onLocaitonTaken }) {
  const navigation = useNavigation();
  const route = useRoute();

  const [locationPermision, requestLocationPermision] =
    useForegroundPermissions();
  const [location, setLocaiton] = useState();

  useEffect(() => {
    const mapPickedLocation = route.params && {
      lat: route.params.pickedLocaiton.lat,
      lng: route.params.pickedLocaiton.lng,
    };
    if (!mapPickedLocation) return;

    setLocaiton(mapPickedLocation);
  }, [route]);

  useEffect(() => {
    if (!location) return;
    (async () => {
      const address = await getAddress(location);
      onLocaitonTaken({ ...location, address });
    })();
  }, [location]);

  const verifyPermissions = async () => {
    if (locationPermision.status === PermissionStatus.UNDETERMINED) {
      const res = await requestLocationPermision();

      return res.granted;
    }
    if (locationPermision.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permission",
        "You need to grant locaiton permission to use this app."
      );
      return false;
    }

    return true;
  };

  const getLocationHandler = async () => {
    const permision = await verifyPermissions();
    if (!permision) return;

    const loc = await getCurrentPositionAsync();
    setLocaiton({
      lat: loc.coords.latitude,
      lng: loc.coords.longitude,
    });
    onLocaitonTaken({
      lat: loc.coords.latitude,
      lng: loc.coords.longitude,
    });
  };

  const mapHandler = () => {
    navigation.navigate("Map");
  };

  const preview = location ? (
    <Image
      source={{
        uri: getMapPreview(location.lat, location.lng),
      }}
      style={styles.mapPreviewImage}
    />
  ) : (
    <Text>No map location</Text>
  );

  return (
    <View>
      <View style={styles.mapPreview}>{preview}</View>
      <View style={styles.actions}>
        <OutlineBtn icon={"location"} onPress={getLocationHandler}>
          Locate User
        </OutlineBtn>
        <OutlineBtn icon={"map"} onPress={mapHandler}>
          Pick on a Map
        </OutlineBtn>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  mapPreview: {
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 200,
    backgroundColor: COLORS.primary100,
  },
  mapPreviewImage: {
    width: "100%",
    height: "100%",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
