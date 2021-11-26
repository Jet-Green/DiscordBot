const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", { structuredData: true });
    response.send("Hello from Firebase!");
});
///// Watch here
// https://www.youtube.com/watch?v=d8LHJPPMx7c&list=PLxV3CY0oI95igV3ft1kik5HQzESNv_oRu&index=5