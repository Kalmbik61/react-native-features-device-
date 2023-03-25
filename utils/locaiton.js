export const MAP_KEY = "28252976-aa07-4ae6-8790-26f0bc15cd92";

export const getMapPreview = (lat, lng) => {
  const image = `https://static-maps.yandex.ru/1.x/?ll=${lng},${lat}&z=13&l=map&pt=${lng},${lat},pmrdm`;
  return image;
};

export const getAddress = async ({ lat, lng }) => {
  const url = `https://geocode-maps.yandex.ru/1.x/?apikey=${MAP_KEY}&format=json&lang=en_US&kind=street&geocode=${lng},${lat}`;

  try {
    const res = await fetch(url);

    const data = (await res.json()).response.GeoObjectCollection.featureMember;

    const text =
      data[0].GeoObject.metaDataProperty.GeocoderMetaData.Address.formatted;
    return text;
  } catch (e) {
    throw new Error("Faild fetch an address");
  }
};
