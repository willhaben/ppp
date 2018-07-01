var firebase = require('firebase');

var config = {
  apiKey: "AIzaSyD4H3dCxz8SYhle1Sa2Zk_gtSSGAWsSuJM",
  authDomain: "wh-ppp.firebaseapp.com",
  databaseURL: "https://wh-ppp.firebaseio.com",
  projectId: "wh-ppp",
  storageBucket: "wh-ppp.appspot.com",
  messagingSenderId: "879595478666"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export default firebase