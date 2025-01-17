import React, { useState, useEffect, useRef } from "react";
import { fetchUsers, User } from "../../services/apiService/apiService";
import styles from "./UserList.module.scss";

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null); // برای نظارت بر آخرین آیتم

  const itemsPerPage = 10;

  useEffect(() => {
    // بارگذاری داده‌های اولیه
    loadMoreUsers();
  }, []);

  const loadMoreUsers = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const fetchedUsers = await fetchUsers(
        itemsPerPage,
        currentPage * itemsPerPage
      ); // فراخوانی API برای گرفتن داده‌ها
      if (fetchedUsers.length > 0) {
        setUsers((prevUsers) => [...prevUsers, ...fetchedUsers]);
        setCurrentPage((prevPage) => prevPage + 1);
      } else {
        setHasMore(false); // اگر داده‌ای موجود نیست
      }
    } catch (error) {
      console.error("Error loading users:", error);
    } finally {
      setLoading(false);
    }
  };

  // نظارت بر آخرین عنصر
  const lastUserElementRef = (node: HTMLDivElement | null) => {
    if (loading) return;

    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreUsers();
        }
      },
      { rootMargin: "200px" }
    );
    if (node) observer.current.observe(node);
  };

  return (
    <div className={styles.userList}>
      <h2 className={styles.title}>User List</h2>
      <div className={styles.list}>
        {users.map((user, index) => {
          const isLastElement = index === users.length - 1;
          return (
            <div
              key={user.id}
              ref={isLastElement ? lastUserElementRef : null}
              className={styles.userCard}
            >
              {/* ساختار کارت کاربر */}
              <div className={styles.profile}>
                <img
                  src={user.profilePicture}
                  alt={`${user.firstName} ${user.lastName}`}
                  className={styles.profileImage}
                />
                <h3 className={styles.name}>
                  {user.firstName} {user.lastName}
                  <p className={styles.username}>@{user.username}</p>
                </h3>
              </div>
              <div className={styles.userInfo}>
                <p className={styles.gender}>Gender: {user.gender}</p>
                <p className={styles.phone}>Phone: {user.phone}</p>
                <p className={styles.email}>Email: {user.email}</p>
              </div>
            </div>
          );
        })}
      </div>
      {loading && <p className={styles.loadingText}>Loading...</p>}
      {!hasMore && <p className={styles.noMoreData}>No more users to load</p>}
    </div>
  );
};

export default UserList;
