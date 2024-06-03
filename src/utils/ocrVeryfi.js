import axios from "axios";

//Refers from Demo
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