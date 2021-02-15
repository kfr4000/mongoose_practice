import React from 'react';

function navBar(){
    return (
        <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">about</Link>
          </li>
          <li>
            <Link to="/dashboard">dashboard</Link>
          </li>
        </ul>

        <hr />

        </div>
    )
}

export default navBar;