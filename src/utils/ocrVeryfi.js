import axios from "axios";

//Refers from Demo
// export const performOcr = async (imageUrl) => {
//   try {
//     const requestBody = {
//       "imageURL": imageUrl
//     }
//     const config = {
//       method: "post",
//       maxBodyLength: Infinity,
//       url: "https://us-central1-receiptmanagement-1d51d.cloudfunctions.net/performOcr",
//       headers: {
//         "Content-Type": "application/json",
//         "Accept": "application/json",
//       },
//       data: requestBody
//     }
//     const response = await axios(config);
//     return response.data ?? {};

//   } catch (error) {
//     console.error("OCR Request Error:", error);
//     throw error; 
//   }
// }

const ocrVeryfiConfig = {
  clientID: process.env.REACT_APP_VERYFI_CLIENT_ID,
  apiKey: process.env.REACT_APP_VERYFI_API_KEY,
};

console.log(ocrVeryfiConfig)
export const performOcr = async (imageUrl) => {
  try {
    // Construct the request body
    const requestBody = {
      file_url: imageUrl,
    };

    // Set up the Axios request configuration
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://cors-anywhere.herokuapp.com/api.veryfi.com/api/v8/partner/documents",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "CLIENT-ID": ocrVeryfiConfig.clientID,
        AUTHORIZATION: ocrVeryfiConfig.apiKey,
        "X-Requested-With": "XMLHttpRequest",
      },
      data: JSON.stringify(requestBody), // Ensure data is JSON stringified
    };

    // Make the POST request to Veryfi API
    const response = await axios(config);

    // Return the response data or an empty object if response data is undefined
    return response.data ?? {};
  } catch (error) {
    // Log any errors and return an empty object
    console.error("Error performing OCR:", error);
    return {};
  }
};