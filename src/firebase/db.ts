import {db} from './firebase';

export const doCreateUser = (id, username, email) =>
    db.ref(`users/${id}`).set({
        username,
        email,
    });

export const doCreateUserData = (uid) =>
    db.ref(`data/${uid}/questionBuilder`).set({
        version: Date.now(),
        steps: []
    });

export const doSaveStore = (uid, questionBuilder) =>
    db.ref(`data/${uid}`).set({
        questionBuilder
    });

export const doGetDataBuilder = (uid) => {
    return db.ref(`data/${uid}/questionBuilder`).once('value').then(function (snapshot) {
        return snapshot.val();
    });
};

export const GetUserData = (uid) => {
    return db.ref(`users/${uid}`).once('value').then(function (snapshot) {
        return snapshot.val();
    });
};

export const getDataUsers = () => {
    return db.ref('users').once('value').then(function (snapshot) {
        return snapshot.val();
    });
};

export const getDataAdmins = () => {
    return db.ref('admins').once('value').then(function (snapshot) {
        return snapshot.val();
    });
};

export const getDataStore = () => {
    return db.ref('data').once('value').then(function (snapshot) {
        return snapshot.val();
    });
};

