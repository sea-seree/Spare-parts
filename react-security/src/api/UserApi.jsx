import axios from "axios";
import { ACCESS_TOKEN, API_BASE_URL } from '../constants';

const request = async (options) => {
  const headers = new Headers({
    'Content-Type': 'application/json',
  });

  if (localStorage.getItem(ACCESS_TOKEN)) {
    headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN));
  }

  const defaults = { headers: headers };
  options = Object.assign({}, defaults, options);

  const response = await fetch(options.url, options);
  const json = await response.json();
  if (!response.ok) {
    return Promise.reject(json);
  }
  return json;
};

export async function getUsers() {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject('No access token set.');
  }

  const users = await request({
    url: API_BASE_URL + `/users`,
    method: 'GET',
  }).catch((error) => {
    console.error("Error fetching data:", error);
  });
  return users;
}


export async function getUserById(userId) {
  // console.log('Hi');
  // console.log(userId);
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject('No access token set.');
  }

  const user = await request({
    url: API_BASE_URL + `/users/${userId}`,
    method: 'GET',
  }).catch((error) => {
    console.error("Error fetching data:", error);
  });

  return user;
}

export async function getUsersBySearch(query) {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject('No access token set.');
  }
  if (query == null || query == '') {
    return [];
  }

  const usersBySearch = await request({
    url: API_BASE_URL + `/users/search/${query}`,
    method: 'GET',
  }).catch((error) => {
    console.error("Error fetching data:", error);
  });
  if (!usersBySearch || usersBySearch.data == '') usersBySearch = [];
  return usersBySearch;
}


export async function addUser(newUser) {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject('No access token set.');
  }

  const addNewUser = await request({
    url: API_BASE_URL + `/users`,
    method: 'POST',
    body: JSON.stringify(newUser),
  }).catch((error) => {
    console.error("Error fetching data:", error);
  });

  return addNewUser;
}

export async function editUser(newUser) {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject('No access token set.');
  }

  const editUser = await request({
    url: API_BASE_URL + `/users`,
    method: 'POST',
    body: JSON.stringify(newUser),
  }).catch((error) => {
    console.error("Error fetching data:", error);
  });

  return editUser;
}


export async function deleteUser(UserId) {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject('No access token set.');
  }

  const editUser = await request({
    url: API_BASE_URL + `/users/${UserId}`,
    method: 'DELETE',
    body: JSON.stringify(UserId),
  }).catch((error) => {
    console.error("Error fetching data:", error);
  });

  return deleteUser;
}

export async function editProfile(newUser) {
  // console.log(newUser);
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject('No access token set.');
  }

  const editProfile = await request({
    url: API_BASE_URL + `/ProfileInfo/${newUser.id}`,
    method: 'POST',
    body: JSON.stringify(newUser),
  }).catch((error) => {
    console.error("Error fetching data:", error);
  });

  return editProfile;
}