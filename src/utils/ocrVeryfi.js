import axios from "axios";

// const ocrVeryfiConfig = {
//   clientID: process.env.REACT_APP_VERYFI_CLIENT_ID,
//   apiKey: process.env.REACT_APP_VERYFI_API_KEY,
// };

// console.log(ocrVeryfiConfig)
// export const performOcr = async (imageUrl) => {
//   try {
//     const data = JSON.stringify({
//       file_url: imageUrl,
//     });

//     const config = {
//       method: "post",
//       maxBodyLength: Infinity,
//       url: "https://cors-anywhere.herokuapp.com/https://api.veryfi.com/api/v8/partner/documents",
//       //Hide all of the keys and tokens
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         "CLIENT-ID": ocrVeryfiConfig.clientID,
//         AUTHORIZATION: ocrVeryfiConfig.apiKey,
//       },
//       data: data,
//     };

//     const response = await axios(config);
//     return response.data ?? {}
//   } catch (error) {
//     console.log(error);
//     return {}
//   }
// };

export const performOcr = async (imageUrl) => {
  try {
    const requestBody = {
      "imageURL": imageUrl
    }
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://us-central1-receiptmanagement-1d51d.cloudfunctions.net/performOcr",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      data: requestBody
    }
    const response = await axios(config);
    return response.data ?? {};

  } catch (error) {
    console.error("OCR Request Error:", error);
    throw error; 
  }
}