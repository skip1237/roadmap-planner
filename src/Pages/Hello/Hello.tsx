import React from "react";
import { Link } from "react-router-dom";
import { useSession } from "../../hooks/useSession";

import { firebase } from "../../firebase";
import { useObjectVal } from "react-firebase-hooks/database";

const Hello = () => {
  const user = useSession();
  const [snapshots, loading, error] = useObjectVal(firebase.db.ref("users"));
  // const userList = useUsersList();

  // const databaseRef = firebase.db.ref();
  // const usersRef = databaseRef.child("users");
  // usersRef.on("value", snapshot => {
  //   console.log(snapshot.val());
  // });
  // console.log(usersRef);
  // console.log(useUsersList());
  // const xxx = firebase.db
  //   .ref("users")
  //   .once("value")
  //   .then(function(snapshot) {
  //     return snapshot.val();
  //   });

  return (
    <div>
      <h3>Hello {user.email}, you are on page1</h3>
      <pre>{JSON.stringify({ snapshots, loading, error }, null, 2)}</pre>
      <Link to="hello2">Go to Hello 2</Link>
    </div>
  );
};

export default Hello;
