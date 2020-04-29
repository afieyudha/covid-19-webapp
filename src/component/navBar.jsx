import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import coronavirusIcon from '../Images/home.png';
import globeIcon from '../Images/globe.png';
import chartBarIcon from '../Images/chart-bar.png';
import resumeIcon from '../Images/resume.png';

const NavBar = () => {
  const [currNav, setCurrNav] = useState({
    summary: '',
    rank: '',
    chart: '',
    about: ''
  });

  let history = useHistory();

  const { pathname } = history.location;

  useEffect(() => {
    handleActiveNav(pathname);
  }, [pathname])

  const handleNav = (destination) => {
    history.push(destination);
  }

  const handleActiveNav = (current) => {
    switch (current) {
      case '/':
        setCurrNav({
          summary: 'active'
        })
        break;

      case '/rank':
        setCurrNav({
          rank: 'active'
        })
        break;

      case '/chart':
        setCurrNav({
          chart: 'active'
        })
        break;

      case '/about':
        setCurrNav({
          about: 'active'
        })
        break;

      default:
        break;
    }
  }

  const { summary, rank, chart, about } = currNav;

  return (

    <nav className="navbar">
      <button className={summary} onClick={() => {handleNav('/')}}>
        <img src={coronavirusIcon} alt="globe icon"/>
        <p>Home</p>
      </button>

      <button className={rank} onClick={() => {handleNav('/rank')}}>
        <img src={globeIcon} alt="chart bar icon"/>
        <p>Rank</p>
      </button>

      <button className={chart} onClick={() => {handleNav('/chart')}}>
        <img src={chartBarIcon} alt="chart bar icon"/>
        <p>Chart</p>
      </button>
      
      <button className={about} onClick={() => {handleNav('/about')}}>
        <img src={resumeIcon} alt="resume icon"/>
        <p>About</p>
      </button>
    </nav>
  )
}

export default NavBar;
