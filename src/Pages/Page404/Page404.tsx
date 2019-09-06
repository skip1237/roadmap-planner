import React from "react";
import { Result } from "antd";

interface Page404Props {
  someProp?: any;
}

const Page404: React.FC<Page404Props> = props => {
  return <Result status="404" title="404 Page not found" />;
};

export default Page404;
