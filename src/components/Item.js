import React from "react";

export default function Item({ data, onClick }) {
    return <button onClick={() => onClick(data.dbn)}>
        <h4>{data.school_name}</h4>
        <p>{data.location.split('(')[0]}</p>
    </button>
}
