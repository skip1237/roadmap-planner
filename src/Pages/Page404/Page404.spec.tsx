import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";

import { Page404 } from "../index";

Enzyme.configure({ adapter: new Adapter() });

describe("Page404", () => {
  const ShallowPage404 = shallow(<Page404 />);

  it("should be defined", () => {
    expect(ShallowPage404).toBeDefined();
  });
});
