/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

//const {onRequest} = require("firebase-functions/v2/https");
//const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


const functions = require('firebase-functions');
const express = require('express');
const path = require("path")
const fs = require("fs").promises;

const app = express();

app.get("/", async (req, res) => {
    const filePath = path.resolve(__dirname, "./build", "index.html")
    try {
        let data = await fs.readFile(filePath, "utf-8");
        res.send(data)
    } catch (error) {
        res.sendStatus(500)
    }
})

app.use(express.static(path.resolve(__dirname, "./build")))

//define google cloud function name
exports.webApi = functions.https.onRequest(app);

