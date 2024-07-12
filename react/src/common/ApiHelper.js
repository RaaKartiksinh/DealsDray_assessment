import axios from "axios";

class ApiHelper {
  constructor() {
    this.baseUrl = process.env.REACT_APP_APIUrl;
    console.log(this.baseUrl);
  }

  adminCreate(data) {
    return axios.post(`${this.baseUrl}/auth/signup`, data);
  }

  adminLogin(data) {
    return axios.post(`${this.baseUrl}/auth/login`, data, {
      withCredentials: true,
    });
  }
  check() {
    return axios.get(`${this.baseUrl}/auth/checkAuth`);
  }

  // Employe
  getEmployeeList() {
    return axios.get(`${this.baseUrl}/employe`);
  }

  createEmploye(data) {
    return axios.post(`${this.baseUrl}/employe`, data);
  }
  updateEmployeeList(id, data) {
    return axios.put(`${this.baseUrl}/employe/${id}`, data);
  }
  deleteEmployeeList(id) {
    return axios.delete(`${this.baseUrl}/employe/${id}`);
  }
}

const apiHelper = new ApiHelper();
export default apiHelper;
