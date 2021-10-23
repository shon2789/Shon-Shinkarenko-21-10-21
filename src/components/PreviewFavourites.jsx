import React from 'react'
import { Link } from 'react-router-dom'

export const PreviewFavourites = ({ cityDetails }) => {
    return (
        <Link to={`/${cityDetails[0]}?name=${cityDetails[1]}`}><div >
            <h2>{cityDetails[1]}</h2>
        </div></Link>
    )
}
