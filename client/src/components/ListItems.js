import React, { useState } from "react";


export default function ListItems({items, currentPageRoute}) {
    if(! items) {
        return <div>Loading...</div>
    }

    function generateSlug(name) {
        return name.toLowerCase().split(' ').join('-')
    }
    
    const list = items.map((item) => {
        const slug = generateSlug(item)
        return (
            <li key={slug} className={slug}>
                <a href={currentPageRoute + "/" + slug}>{item}</a>
            </li>
        )
    })
    console.log(list)
    return (
        <div className="list-items">
            {list}
        </div>
    )
}











// const list = players.allPlayers.map((player) => {
//     const avg = percentageStats(player.stats)
//     const counting = countingStats(player.stats)

//     return (
//     <div key={player._id} className="card col-11 p-0 mb-5 ml-3 mr-3">
//       <div className="card-body bg-dark text-primary">
//         <div className='d-flex flex-row justify-content-between'>
//             <h5 className="card-title">{player.last_name}</h5>
//             <h5 style={{width: '30px', height: '30px'}} className="card-title bg-primary text-light rounded-circle text-center">{player.number}</h5>
//         </div>
//         <div className='d-flex flex-row justify-content-between'>
//             <p className="card-text">{player.first_name}</p>
//             {player.position.map((position) => <p key={player._id + position}>{position}</p>)}
//         </div>
//       </div>
//       <ul className="list-group list-group-flush">
//         {avg}
//         {counting}
//       </ul>
//     </div>
// )})