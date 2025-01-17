import React, { useState, useEffect } from "react";
import { fetchUsers, User } from "../../services/apiService/apiService";
import styles from "./UserList.module.scss";
import Pagination from "../Pagination/Pagination";

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const fetchedUsers = await fetchUsers(50);
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error loading users:", error);
      }
    };

    loadUsers();
  }, []);

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
