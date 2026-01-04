import { api, mlapi } from "../../api";
import type { PredictColomn } from "./formProps";
import axios from "axios";

// types/predict.ts
export type PredictResponse = {
  success: boolean;
  message: string;
  recordId: string;
  timestamp: string;
  userId: string;

  inputData: {
    HbA1c_level: number;
    age: number;
    blood_glucose_level: number;
    bmi: number;
    gender: string;
    heart_disease: number;
    hypertension: number;
    smoking_history: string;
  };

  prediction: {
    result: number;
    resultText: string;
    confidence: number;
  };
};

export const predictHistory = async (payload: PredictColomn) => {
  try {
    const res = await mlapi.post<PredictResponse>("/predict-history", payload);
    return res;
  } catch (err: any) {
    let message = "Gagal memanggil API";

    if (axios.isAxiosError(err)) {
      if (err.code === "ECONNABORTED" || err.message?.includes("timeout")) {
        message = "Railway timeout (limit free tier).";
      } else if (
        err.message === "Network Error" ||
        [502, 503, 504].includes(err.response?.status ?? 0)
      ) {
        message = "Railway timeout (service sleep / limit).";
      } else if (err.response?.data?.message) {
        message = err.response.data.message;
      } else if (err.message) {
        message = err.message;
      }
    }

    // Lempar ulang error yang sudah dimapping
    return Promise.reject(new Error(message));
  }
};

export const insertUserId = async (id: string) => {
  return api.patch(`/form-check-history/${id}`);
};

export const saveCheckHistory = (checkFormId: string) => {
  return api.patch(`/form-check-history/${checkFormId}/save`);
};
