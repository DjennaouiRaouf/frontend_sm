import * as React from "react";
import { shallow } from "enzyme";
import ListFacture from "./ListFacture";

describe("ListFacture", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<ListFacture />);
    expect(wrapper).toMatchSnapshot();
  });
});
