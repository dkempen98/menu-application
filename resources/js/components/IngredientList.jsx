import React, { useState } from "react";


export default function IngredientList({ingredients, amounts, bartenderMode = false, batch = 1, flOzs = 0}) {
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
                <div>
                    <h4>
                        Makes: {batch}
                        <br/>
                        Volume: { flOzs } fl oz
                    </h4>
                </div>
            )}
            {list}
        </div>
    )
}