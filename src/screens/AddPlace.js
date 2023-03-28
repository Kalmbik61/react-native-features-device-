import React from "react";
import PlaceForm from "../components/Places/PlaceForm";
import { insertPlaceToDb } from "../../utils/database";

export default function AddPlace({ navigation }) {
  const onCreatePlaceHandler = async (place) => {
    await insertPlaceToDb(place);
    navigation.navigate("AllPlaces");
  };
  return <PlaceForm onCreatePlaceHandler={onCreatePlaceHandler} />;
}
