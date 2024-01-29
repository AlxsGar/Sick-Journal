import * as sqlite from "expo-sqlite";

const database = sqlite.openDatabase("patients.db");

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS patients (
                id INTEGER PRIMARY KEY NOT NULL,
                name TEXT NOT NULL,
                doctor TEXT NOT NULL,
                symptoms TEXT NOT NULL,
                phoneNo INTEGER NOT NULL,
                imageUri TEXT NOT NULL,
                date TEXT NOT NULL
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
};

export const insertData = (data) => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO patients (name, doctor, symptoms, phoneNo, imageUri, date) VALUES (?, ?, ?, ?, ?, ?)`,
        [
          data.name,
          data.doctor,
          data.symptoms,
          data.phoneNo,
          data.imageUri,
          data.date,
        ],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
            console.log(error)
          reject(error);
        }
      );
    });
  });
  return promise;
};

export const fetchData = () => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM patients",
        [],
        (_, result) => {
            const patients = [];
            for(const pd of result.rows._array){
                patients.push(pd)
            }
            console.log(patients)
            resolve(patients)
        },
        (_, error) => {
            console.log("fetch"+error);
            reject(error)
        }
      );
    });
  });
  return promise;
};
