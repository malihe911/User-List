import http from "../interceptor/interceptor";

// Define the function to fetch users
export const fetchUsers = async (results: number = 10) => {
  try {
    const response = await http.get(`/?results=${results}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
