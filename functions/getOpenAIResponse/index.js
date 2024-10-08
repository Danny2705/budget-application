// TODO: convert function to v2
// See https://firebase.google.com/docs/functions/2nd-gen-upgrade

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios");

admin.initializeApp();

// TODO: read API key from .env file
const apiKey = "";

exports.getOpenAIResponse = functions.https.onCall(async (data) => {
  try {
    const {conversation} = data;

    if (!conversation || !apiKey) {
      throw new functions.https.HttpsError("invalid-arg", "API Error");
    }

    const url = "https://api.openai.com/v1/chat/completions";

    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    };

    const body = {
      messages: conversation,
      temperature: 0.7,
      model: "gpt-3.5-turbo",
    };

    const response = await axios.post(url, body, {headers});

    if (response.status === 200) {
      return {response: response.data.choices[0].message.content};
    } else {
      throw new functions.https.HttpsError("internal", "Request failed.");
    }
  } catch (error) {
    throw new functions.https.HttpsError("internal", error.message);
  }
});
