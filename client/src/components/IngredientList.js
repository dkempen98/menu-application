import React, { useState } from "react";


export default function IngredientList({ingredients}) {
    if(! ingredients) {
        return <div>Loading...</div>
    }
    const list = ingredients.map((item) => {
        return (
            <li key={item}>{item}</li>
        )
    })
    return(
        <ul className="ingredient-list">
            {list}
        </ul>
    )
}