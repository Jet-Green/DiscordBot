// const firebase = require('firebase/app')
// const FieldValue = require('firebase-admin').firestore.FieldValue;
var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = {
  "admin": admin
};

// export default firebaseApp
// const firebaseConfig = {
//   apiKey: "AIzaSyDY98tlz8elFQimHjLg3tsFd33OUSpqo4o",
//   authDomain: "ai-chan-2b9d1.firebaseapp.com",
//   databaseURL: "https://ai-chan-2b9d1-default-rtdb.firebaseio.com",
//   projectId: "ai-chan-2b9d1",
//   storageBucket: "ai-chan-2b9d1.appspot.com",
//   messagingSenderId: "205566693041",
//   appId: "1:205566693041:web:656216cc3b6ce511489c90",
//   measurementId: "G-NRV46BQSGB"
// };