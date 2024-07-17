import React, { useEffect, useState } from 'react'
import client from '../lib/api/client';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { KeyboardReturn } from '@mui/icons-material';

function SignUp(){
  const history = useNavigate();
  const location = useLocation(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (location.state && location.state.flashMessage) {
      setError(location.state.flashMessage);
    }
  }, [history]);

  const handleSignUp = async () => {
    const userData = {
      user: {
        name: name,
        email: email,
        password: password,
        password_confirmation: password_confirmation,
      },
    };

    client.post('/signup', userData)
    .then((response) => {
      history('/login');
    })
    .catch((error) => {
      console.error('SignUp Faild', error.response);
      setError('サインアップに失敗しました');
    });
  };

  return (
    <div className='container'>
      <Link to="/" >
        <KeyboardReturn/>
      </Link>
      <div className='content'>
        <h1>SignUp</h1>
        <div className='flash-message'>{error && <div>{error}</div>}</div>
        <div className='login-form'>
          <form>
            <p>名前</p>
            <input type='text' placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <p>メールアドレス</p>
            <input type='email' placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <p>パスワード</p>
            <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <p>パスワード（確認用）</p>
            <input type='password' placeholder='PasswordConfirmation' value={password_confirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />
            <button type='button' className="button" onClick={handleSignUp}>SignUp</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;