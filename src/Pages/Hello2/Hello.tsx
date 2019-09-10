import React from "react";
import { Link } from "react-router-dom";
import { useSession } from "../../hooks/useSession";

const Hello2 = () => {
  const user = useSession();
  return (
    <div>
      <h3>Hello {user.email}, you are on page2</h3>
      <Link to="hello">Go to Hello 1</Link>
    </div>
  );
};

export default Hello2;
