import React from "react";
import Item from "./Item";
import "./List.scss";

export default function List({ items, selected, onClick }) {
    const list = items.map((school) => {
        const isSelected = (selected === school.dbn);
        return (
            <li key={school.dbn} className={(isSelected) ? 'selected' : ''}>
                <Item data={school}  onClick={onClick} />
            </li>
        );
    });

    return <ul className="list list-unstyled">{list}</ul>
}
