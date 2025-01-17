import React, { useState } from "react";
import styles from "./UserList.module.scss";
import Pagination from "../Pagination/Pagination";

interface User {
  id: number;
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

const UserList: React.FC = () => {
  const users: User[] = [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      username: "johndoe",
      gender: "Male",
      phone: "123-456-7890",
      email: "john@example.com",
      address: "123 Main St, Anytown, USA",
      country: "USA",
      countryFlag: "https://flagcdn.com/us.svg",
      profilePicture: "https://via.placeholder.com/50",
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Doe",
      username: "janedoe",
      gender: "Female",
      phone: "098-765-4321",
      email: "jane@example.com",
      address: "456 Oak St, Anytown, Canada",
      country: "Canada",
      countryFlag: "https://flagcdn.com/ca.svg",
      profilePicture: "https://via.placeholder.com/50",
    },
    // Add more users as needed
  ];

  const itemsPerPage = 10; // تعداد آیتم‌ها در هر صفحه
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (selectedPage: number) => {
    setCurrentPage(selectedPage);
  };

  const offset = currentPage * itemsPerPage;
  const currentUsers = users.slice(offset, offset + itemsPerPage);

  return (
    <div className={styles.userList}>
      <h2 className={styles.title}>User List</h2>
      <div className={styles.list}>
        {currentUsers.map(
          ({
            id,
            firstName,
            lastName,
            username,
            gender,
            phone,
            email,
            address,
            country,
            countryFlag,
            profilePicture,
          }) => (
            <div key={id} className={styles.userCard}>
              <div className={styles.profile}>
                <img
                  src={profilePicture}
                  alt={`${firstName} ${lastName}`}
                  className={styles.profileImage}
                />
                <h3 className={styles.name}>
                  {firstName} {lastName}
                  <p className={styles.username}>@{username}</p>
                </h3>
              </div>
              <div className={styles.userInfo}>
                <div className={styles.additionalInfo}>
                  <p className={styles.gender}>Gender: {gender}</p>
                  <p className={styles.phone}>Phone: {phone}</p>
                  <p className={styles.email}>Email: {email}</p>
                </div>
              </div>
              <div className={styles.countryInfo}>
                <p className={styles.country}>Country: {country}</p>
                <img
                  src={countryFlag}
                  alt={`${country} flag`}
                  className={styles.countryFlag}
                />
                <p className={styles.address}>Address: {address}</p>
              </div>
            </div>
          )
        )}
      </div>
      <Pagination
        totalItems={users.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default UserList;
