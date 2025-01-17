import React, { useState, useEffect } from "react";
import { fetchUsers, User } from "../../services/apiService/apiService";
import styles from "./UserList.module.scss";

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const itemsPerPage = 10;

  useEffect(() => {
    // Load initial data
    loadMoreUsers();
  }, []);

  const loadMoreUsers = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const fetchedUsers = await fetchUsers(
        itemsPerPage,
        currentPage * itemsPerPage
      ); // Adjust API to support pagination
      if (fetchedUsers.length > 0) {
        setUsers((prevUsers) => [...prevUsers, ...fetchedUsers]);
        setCurrentPage((prevPage) => prevPage + 1);
      } else {
        setHasMore(false); // No more data to load
      }
    } catch (error) {
      console.error("Error loading users:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.userList}>
      <h2 className={styles.title}>User List</h2>
      <div className={styles.list}>
        {users.map(
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
      {hasMore ? (
        <button
          className={styles.loadMoreButton}
          onClick={loadMoreUsers}
          disabled={loading}
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      ) : (
        <p className={styles.noMoreData}>No more users to load</p>
      )}
    </div>
  );
};

export default UserList;
