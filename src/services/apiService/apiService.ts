import http from "../interceptor/interceptor";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
  country: string;
  countryFlag: string;
  profilePicture: string;
}

export const fetchUsers = async (results: number = 10): Promise<User[]> => {
  try {
    const response = await http.get(`/?results=${results}`);
    console.log(response);

    const users = response.data.results.map((user: any) => ({
      id: user.login.uuid,
      firstName: user.name.first,
      lastName: user.name.last,
      username: user.login.username,
      gender: user.gender,
      phone: user.phone,
      email: user.email,
      address: `${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state}`,
      country: user.location.country,
      countryFlag: `https://flagcdn.com/${user.nat.toLowerCase()}.svg`,
      profilePicture: user.picture.large,
    }));
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
