import React from "react";
import { mount } from "enzyme";
import Item from "./Item";

describe("Item", () => {
    let mockFunction;
    let item;
    let mockData;

    beforeEach(() => {
        mockFunction = jest.fn();
        mockData = { school_name: "School Name", location: "Maldives (10, 40)" };
        item = <Item data={mockData} onClick={mockFunction} />;
    });

    it("renders the ListItem with the correct content", () => {
        expect(mount(item).prop("data")).toEqual(mockData);
    });

    it("triggers the correct method on click", () => {
        mount(item).simulate("click");
        expect(mockFunction).toHaveBeenCalled();
    });
});
