const {onRequest} = require("firebase-functions/v2/https");
const axios = require("axios");

const allowedOrigins = [
  "http://localhost:3000",
  "https://budget-application-chi.vercel.app",
];

const handleCors = (request, response) => {
  const origin = request.headers.origin;
  if (allowedOrigins.includes(origin)) {
    response.header("Access-Control-Allow-Origin", origin);
  }
  response.header("Access-Control-Allow-Credentials", "true");
  response.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.header("Access-Control-Allow-Headers", "Content-Type");
};

exports.performOcr = onRequest(async (request, response) => {
  console.log("Request body:", request.body);
  console.log("imageURL", request.body.imageURL);
  try {
    const imageURL = request.body.imageURL;

    if (request.method === "OPTIONS") {
      handleCors(request, response);
      response.status(204).send("");
      return;
    }

    const data = {
      file_url: imageURL,
    };

    if (!imageURL) {
      throw new Error("Image URL is missing in the request body");
    }

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://api.veryfi.com/api/v8/partner/documents",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "CLIENT-ID": process.env.VERYFI_CLIENT_ID,
        "AUTHORIZATION": process.env.VERYFI_API_KEY,
      },
      data: data,
    };

    const veryfiResponse = await axios(config);

    handleCors(request, response);
    response.status(200).send(veryfiResponse.data ?? {});
  } catch (error) {
    console.error("Error in performOcr function:", error);
    handleCors(request, response);
    response.status(500).send({
      error: "Error in OCR Veryfi API call: " + error.message,
      CLIENT_ID: process.env.VERYFI_CLIENT_ID,
      AUTHORIZATION: process.env.VERYFI_API_KEY,
    });
  }
});
