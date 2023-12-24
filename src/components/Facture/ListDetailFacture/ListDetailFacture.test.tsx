import * as React from "react";
import { shallow } from "enzyme";
import ListDetailFacture from "./ListDetailFacture";

describe("ListDetailFacture", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<ListDetailFacture />);
    expect(wrapper).toMatchSnapshot();
  });
});
