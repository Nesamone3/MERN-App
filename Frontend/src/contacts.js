import axios from 'axios';
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

const BASE_URL = 'mongodb://localhost:27017';

export async function getContacts(query) {
  try {
    const response = await axios.get(BASE_URL);
    let contacts = response.data;
    if (query) {
      contacts = matchSorter(contacts, query, { keys: ["first", "last"] });
    }
    return contacts.sort(sortBy("last", "createdAt"));
  } catch (error) {
    console.error('There was an error fetching the contacts:', error);
    return [];
  }
}

export async function createContact(contactData) {
  try {
    const response = await axios.post(BASE_URL, contactData);
    return response.data;
  } catch (error) {
    console.error('There was an error creating the contact:', error);
    throw error;
  }
}

export async function getContact(id) {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`There was an error fetching the contact with id ${id}:`, error);
    return null;
  }
}

export async function updateContact(id, updates) {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, updates);
    return response.data;
  } catch (error) {
    console.error(`There was an error updating the contact with id ${id}:`, error);
    throw error;
  }
}

export async function deleteContact(id) {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
    return true;
  } catch (error) {
    console.error(`There was an error deleting the contact with id ${id}:`, error);
    return false;
  }
}

