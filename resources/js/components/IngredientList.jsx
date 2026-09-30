import React, { useState } from "react";


export default function IngredientList({ingredients, amounts, bartenderMode = false, batch = 1}) {
    if(! ingredients) {
        return <div></div>
    }

    let i = -1;

    const list = ingredients.map((item) => {
        i++
        return (
            <div key={item} className='ingredient-item'>{item} <span>{amounts[i]}</span></div>
        )
    })
    return(
        <div className="ingredient-list">
            <h3>Ingredients</h3>
            {bartenderMode && (
                <h4>
                    Makes {batch}
                </h4>
            )}
            {list}
        </div>
    )
}