// utils/storage.js
export const getUsers = () => JSON.parse(localStorage.getItem('users')) || [];

export const saveUser = (user) => {
  const users = getUsers();
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
};

export const getCurrentUser = () => JSON.parse(localStorage.getItem('currentUser'));
export const setCurrentUser = (user) => localStorage.setItem('currentUser', JSON.stringify(user));
export const logoutUser = () => localStorage.removeItem('currentUser');
