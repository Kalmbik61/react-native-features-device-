import * as SQLite from "expo-sqlite";
import { Place } from "../src/models/place";

const database = SQLite.openDatabase("places.db");

export function initSQLite() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS places (
                    id INTEGER PRIMARY KEY NOT NULL,
                    title TEXT NOT NULL,
                    imageUri TEXT NOT NULL,
                    address TEXT NOT NULL,
                    lat REAL NOT NULL,
                    lng REAL NOT NULL
                )`,
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
}

export function insertPlaceToDb(place) {
  const promise = new Promise((res, rej) => {
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO places (
                title,imageUri,address,lat,lng
            ) VALUES (?,?,?,?,?)`,
        [
          place.title,
          place.imageUri,
          place.address,
          place.location.lat,
          place.location.lng,
        ],
        (_, result) => {
          res(result);
        },
        (_, error) => {
          rej(error);
        }
      );
    });
  });

  return promise;
}

export function fetchPlaces() {
  const promise = new Promise((res, rej) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM places`,
        [],
        (_, result) => {
          const places = [];

          for (const dp of result.rows._array) {
            places.push(
              new Place(
                dp.title,
                dp.imageUri,
                {
                  address: dp.address,
                  lat: dp.lat,
                  lng: dp.lng,
                },
                dp.id
              )
            );
          }

          res(places);
        },
        (_, error) => {
          rej(error);
        }
      );
    });
  });

  return promise;
}

export function fetchPlaceDetails(id) {
  const promise = new Promise((res, rej) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM places WHERE id = ?`,
        [id],
        (_, r) => {
          let places;
          const db = r.rows._array[0];
          places = new Place(
            db.title,
            db.imageUri,
            {
              address: db.address,
              lat: db.lat,
              lng: db.lng,
            },
            db.id
          );
          res(places);
        },
        (_, error) => {
          rej(error);
        }
      );
    });
  });

  return promise;
}
