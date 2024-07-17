import axios from "axios";

export const performOcr = async (imageUrl) => {
  try {
    const requestBody = {
      "imageURL": imageUrl
    };
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://us-central1-budget-app-bf80c.cloudfunctions.net/performOcr",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      data: requestBody,
    };
    const response = await axios(config);
    return response.data ?? {};
  } catch (error) {
    console.error("OCR Request Error:", error);
    throw error;
  }
};
