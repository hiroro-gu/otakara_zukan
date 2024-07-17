import { Box } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';
import { GuestLogin } from './GuestLogin';
import Write from "../images/7219.svg";
import Read from "../images/9406_color.svg";
import ex1 from "../images/ex_001.png";
import ex2 from "../images/ex_002.png";
import ex3 from "../images/ex_003.png";
import { HowToUse } from './modal/HowToUse';

function TopPage(){

  return (
    <div className='top-wrapper'>
    <div className='top-page'>
      <div className='header'>
        <p className='top-logo'>
          illustrated<br />
          book create
        </p>
        <nav className='top-nav'>
          <ul>
            <li>
              <Link className='top-link' to="/signup">SignUp</Link>
            </li>
            <li>
              <Link className='top-link' to="/login">Login</Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className='first-content'>
        <button className='button signup-button'>
          <Link className='top-link' to="/signup">はじめる</Link>
        </button>
        <Link className='terms-link' to="/terms">利用規約</Link>
      </div>

      <h1 className='introduction'>サービス紹介</h1>
      <div className='introduction-container'>
        <Box className='introduction-content'>
          <img alt='writing' src={Write} />
          <p>
            当サービスは出会った生き物を記録して <br/>
            自分だけの図鑑が作成できるサービスです。
          </p>
          <GuestLogin />
        </Box>
        <Box className='introduction-content'>
          <img alt='reading' src={Read} />
          <p>
            作成した図鑑は他のユーザーと <br />
            共有することができます。
          </p>
          <button className='button'>
            <Link className='top-link' to="/illustratedbooks">図鑑をみる</Link>
          </button>
        </Box>
      </div>
    </div>

    <h1>使い方</h1>
    <HowToUse />

    <div className='explanation'>
      <h1>書き方</h1>
      <Box className='explanation-content'>
        <h3>観察してみる</h3>
        <img alt='ex1' src={ex1} />
      </Box>

      <Box className='explanation-content'>
        <h3>調べてみる</h3>
        <img alt='ex2' src={ex2} />
      </Box>

      <Box className='explanation-content'>
        <h3>考えてみる</h3>
        <img alt='ex3' src={ex3} />
      </Box>
    </div>
  </div>
  );
}

export default TopPage;