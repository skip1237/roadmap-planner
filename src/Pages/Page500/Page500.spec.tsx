import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";

import { Page500 } from "../index";

Enzyme.configure({ adapter: new Adapter() });

describe("Page500", () => {
  const ShallowPage500 = shallow(<Page500 />);

  it("should be defined", () => {
    expect(ShallowPage500).toBeDefined();
  });
});
