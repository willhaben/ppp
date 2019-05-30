import firebase from "./config";

export function saveItem(week, key, item) {
  console.log("saveItem", week, key,item)
  return firebase
    .database()
    .ref("/weeks/" + week + "/" + key)
    .set(item);
}

export function deleteItem(week, key) {
  console.log("deleteItem", week, key)
  return firebase.database().ref("/weeks/" + week + "/" + key).remove()
}

export function getWeekList() {
  return firebase
    .database()
    .ref("/weeks")
    .once("value")
    .then(function(snapshot) {
      let weeks = [];
      snapshot.forEach(function(childSnapshot) {
        let key = childSnapshot.key;
        weeks.push(key);
      });
      weeks = weeks.sort().reverse();
      return Promise.resolve(weeks);
      console.log("getWeekList", weeks);
    });
}

export function getWeek(week) {

  return new Promise(function(resolve, reject) {
    firebase
      .database()
      .ref("/weeks/" + week)
      .once("value")
      .then(snapshot => {
        let items = {};
        snapshot.forEach(child => {
          items[child.key] = child.val();
        });
        resolve(items);
        console.log("getWeek", week, items);
      })
      .catch(e => reject(e));
  });
}
