// src/components/UserTable.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, setSearch } from '../features/users/usersSlice';
import { RootState, AppDispatch } from '../App/store';

const UserTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, status, error, search } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [dispatch, status]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value));
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  if (status === 'loading') return <p className="text-white text-center">Loading...</p>;
  if (status === 'failed') return <p className="text-red-500 text-center">Error: {error}</p>;

  return (
    <div className="min-h-screen bg-gray-500 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">User Table</h1>
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={handleSearchChange}
          className="mb-6 w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <table className="min-w-full table-auto border-collapse text-left bg-white shadow-md">
          <thead>
            <tr className="bg-gray-200 text-gray-800">
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Username</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Phone</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={user.id} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                <td className="px-4 py-2 border">{user.name}</td>
                <td className="px-4 py-2 border">{user.username}</td>
                <td className="px-4 py-2 border">{user.email}</td>
                <td className="px-4 py-2 border">{user.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
