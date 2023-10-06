import React from 'react';

const Footer = () => {
    return (
        <footer>
            <p>&copy; {new Date(Date.now()).getFullYear()} reserved by <a href="https://rguktsklm.ac.in" target="_blank" rel="noopener noreferrer">RGUKT SKLM</a> CSE Dept. | <a href="/tpc-technical-team" target="_blank" rel="noopener noreferrer">TPC Technical Team</a></p>
        </footer>
    )
}

export default Footer