import React from 'react'
import Link from 'next/link'

function NavBar() {
  return (
    <header className="navbar">
        <div className="brand">
            <div className="brand-link">
                <img src="/Astra/assets/Logo1.png" width="80" alt="SocialMedia Logo" className="logo-icon"/>
                <h1 className="site-name">ASTRA</h1>
            </div>
        </div>
        <nav className="nav" id="navBar">
            <ul className="nav-links" id="navList">
                <li><Link href="/Astra/home.html">Home</Link></li>
                <li><Link href="/Astra/profile.html" id="profilebtn">Profile</Link></li>
                <li><Link href="/stats" id="statsbtn">Stats</Link></li>
                <li><button type="button" id="logoutBtn">Logout</button></li>
            </ul>
        </nav>
    </header>   
  )
}

export default NavBar