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

export async function getCategories() {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject('No access token set.');
  }
  const categories = await request({
    url: API_BASE_URL + '/categories',
    method: 'GET',
  }).catch((error) => {
    console.error("Error fetching data:", error);
  });
  return categories;
}

export async function getCategoryById(categoryId) {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject('No access token set.');
  }
  const category = await request({
    url: API_BASE_URL + `/categories/${categoryId}`,
    method: 'GET',
  }).catch((error) => {
    console.error("Error fetching data:", error);
  });
    return category;
  }

export async function getCategoriesBySearch(query) {

    if (!localStorage.getItem(ACCESS_TOKEN)) {
      return Promise.reject('No access token set.');
    }

    if (query == null || query == '') {
        return [];
    }

    const categoriesBySearch = await request({
      url: API_BASE_URL + `/categories/search/${query}`,
      method: 'GET',
    }).catch((error) => {
      console.error("Error fetching data:", error);
    });

    if (!categoriesBySearch || categoriesBySearch.data == '') categoriesBySearch = [];
    return categoriesBySearch;
}

export async function addCategory(newCategory) {

  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject('No access token set.');
  }

  const addNewCategory = await request({
    url: API_BASE_URL + `/categories`,
    method: 'POST',
    body: JSON.stringify(newCategory),
  }).catch((error) => {
    console.error("Error fetching data:", error);
  });

  // console.log('newCategory');
  return addNewCategory;
    
}

export async function editCategory(newCategory) {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject('No access token set.');
  }

  // console.log(newCategory);

  const editNewCategory = await request({
    url: API_BASE_URL + `/categories/${newCategory.id}`,
    method: 'PUT',
    body: JSON.stringify(newCategory),
  }).catch((error) => {
    console.error("Error fetching data:", error);
  });

  return editNewCategory;

}

export async function deleteCategory(CategoryId) {

  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject('No access token set.');
  }

  const deleteCategory = await request({
    url: API_BASE_URL + `/categories/${CategoryId}`,
    method: 'DELETE',
  }).catch((error) => {
    console.error("Error fetching data:", error);
  });

  return deleteCategory;
}