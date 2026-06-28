import axios from "axios";

const API_URL = "http://localhost:5000/projects";

// 1. Create a custom Axios instance
const api = axios.create({
  baseURL: API_URL,
});

// 2. Add an interceptor to inject the auth token
api.interceptors.request.use(
  (config) => {
    // IMPORTANT: Make sure 'token' matches the exact key you use to save your JWT when a user logs in!
    const token = localStorage.getItem("token"); 
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 3. Export your API calls using the new 'api' instance
export const getProjects = () => api.get("/");
export const getProjectById = (id: string | undefined) => api.get(`/${id}`);
export const createProject = (data: any) => api.post("/", data);
export const updateProject = (id: string | undefined, data: any) => api.put(`/${id}`, data);
export const deleteProject = (id: string) => api.delete(`/${id}`);
export const createMonitor = (projectId: string, monitorData: any) => {
  return api.post(`/${projectId}/monitors`, monitorData);
};