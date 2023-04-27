import localforage from 'localforage';
import { matchSorter } from 'match-sorter';
import sortBy from 'sort-by';
import crypo from 'crypto';
import { fakeData } from './constantes/fakedb';

export async function getContacts(query) {
    await fakeNetwork(`getContacts:${query}`);

    let contacts = await localforage.getItem('contacts');
    if (!contacts) contacts = [];
    if (query) {
        contacts = matchSorter(contacts, query.trim(), {
            keys: ['fullName', 'first'],
        });
    }
    return contacts;
    //.sort(sortBy('last', 'createdAt'));
}
export async function getContact(id) {
    await fakeNetwork(`contact:${id}`);
    let contacts = await localforage.getItem('contacts');

    let contact = contacts.find((contact) => contact.id === id);
    return contact ?? [];
}

export async function createContact() {
    await fakeNetwork();
    let id = crypto.randomUUID().toString();
    let contact = { id, createdAt: Date.now() };
    let contacts = await getContacts();
    contacts.push(contact);
    await set(contacts);
    return contact;
}

export async function updateContact(id, updates) {
    await fakeNetwork();
    let contacts = await localforage.getItem('contacts');
    let contact = contacts.find((contact) => contact.id === id);
    if (!contact) throw new Error('No contact found for', id);
    Object.assign(contact, updates);
    await set(contacts);
}

export async function deleteContact(id) {
    let contacts = await localforage.getItem('contacts');
    let index = contacts.findIndex((contact) => contact.id === id);
    if (index > -1) {
        contacts.splice(index, 1);
        await set(contacts);
        return true;
    }
    return false;
}

const set = async (contacts) => localforage.setItem('contacts', contacts);

// fake a cache so we don't slow down stuff we've already seen
let fakeCache = {};

async function fakeNetwork(key) {
    if (!key) {
        fakeCache = {};
    }

    if (fakeCache[key]) {
        return;
    }

    fakeCache[key] = true;
    return new Promise((res) => {
        setTimeout(res, Math.random() * 400);
    });
}
