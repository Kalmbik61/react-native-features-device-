import React, { useEffect, useState } from "react";
import PlacesList from "../components/Places/PlacesList";
import { useIsFocused } from "@react-navigation/native";
import { fetchPlaces } from "../../utils/database";

export default function AllPlaces() {
  const isFocused = useIsFocused();

  const [places, setPlaces] = useState([]);

  useEffect(() => {
    (async () => {
      if (isFocused) {
        const res = await fetchPlaces();
        setPlaces(res);
      }
    })();
  }, [isFocused]);

  return <PlacesList places={places} />;
}
