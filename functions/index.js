// Refers from Demo
const axios = require("axios");

const {onRequest} = require("firebase-functions/v2/https");

// eslint-disable-next-line max-len
exports.performOcr = onRequest(
    async (request, response) => {
      try {
        const imageURL = request.body.imageURL;

        if (request.method === "OPTIONS") {
          response.header("Access-Control-Allow-Origin", "https://budget-application-chi.vercel.app/");
          response.header("Access-Control-Allow-Credentials", "true");
          response.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
          response.header("Access-Control-Allow-Headers", "Content-Type");
          response.end();
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
            "AUTHORIZATION":
            process.env.VERYFI_API_KEY,
          },
          data: data,
        };

        const veryfiResponse = await axios(config);
        response.header("Access-Control-Allow-Origin", "https://budget-application-chi.vercel.app/");
        response.header("Access-Control-Allow-Credentials", "true");
        response.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        response.header("Access-Control-Allow-Headers", "Content-Type");
        response.status(200).send(veryfiResponse.data ?? {});
      } catch (error) {
        console.error("Error in performOcr function:", error);
        console.log(error);
        response.header("Access-Control-Allow-Origin", "https://budget-application-chi.vercel.app/");
        response.header("Access-Control-Allow-Credentials", "true");
        response.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        response.header("Access-Control-Allow-Headers", "Content-Type");
        response.send({
          // eslint-disable-next-line max-len
          "error": "Error in OCR Veryfi API call-indirect OCR Key" + error.message,
          // eslint-disable-next-line max-len
          "CLIENT-ID": process.env.VERYFI_CLIENT_ID, "AUTHORIZATION": process.env.VERYFI_API_KEY,
        });
      }
    },
);

