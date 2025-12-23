import { useEffect, useState } from "react";

const ENDPOINT = "https://dummyjson.com/users";

const FetchUsers = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const resp = await fetch(ENDPOINT, {
          signal: controller.signal,
        });

        if (!resp.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await resp.json();
        setUsers(data.users || []);
      } catch (e) {
        if (e.name !== "AbortError") {
          setError(e.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();

    return () => controller.abort();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (users.length === 0) return <p>No Users Found</p>;

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <UserInfo key={user.id} userData={user} />
        ))}
      </ul>
    </div>
  );
};

const UserInfo = ({ userData }) => {
  return (
    <li>
      <h2>User Detail</h2>
      <p>Email: {userData.email}</p>
      <p>First Name: {userData.firstName}</p>
      <p>Last Name: {userData.lastName}</p>
    </li>
  );
};

export default FetchUsers;
