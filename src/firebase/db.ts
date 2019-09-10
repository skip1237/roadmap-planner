import { db } from "./firebase";

export const doCreateUser = (id, username, email) =>
  db.ref(`users/${id}`).set({
    username,
    email
  });

export const doSetRole = (id, role) => {
  if (id) {
    let updateAdmin = {};
    updateAdmin[`roles/${id}/role`] = role;
    updateAdmin[`users/${id}/role`] = role;
    db.ref()
      .update(updateAdmin)
      .catch(error => {
        console.log(error);
      });
  }
};
