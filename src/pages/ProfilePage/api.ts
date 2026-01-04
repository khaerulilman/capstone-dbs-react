import api from "../../api";

export const getAllCheckHistory = () => {
  const token = localStorage.getItem("token");
  const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
  return api.get("/form-check-history", { headers });
};

export const getCheckHistroyById = (id: string) => {
  const token = localStorage.getItem("token");
  const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
  return api.get(`/form-check-history/${id}`, { headers });
};

export const updateProfile = (data: any) => {
  const token = localStorage.getItem("token");
  const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
  return api.patch("/profile", data, { headers });
};

export const unSaveCheckHistory = (id: string) => {
  const token = localStorage.getItem("token");
  const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
  return api.patch(`/form-check-history/${id}/unsave`, undefined, { headers });
};

export const getProfile = () => {
  const token = localStorage.getItem("token");
  const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
  return api.get("/profile", { headers });
};
