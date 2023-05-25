import { RiUser5Line, RiUser5Fill, RiLogoutCircleFill } from 'react-icons/ri'
import '../css/dev.css';
import '../css/navi.css';
import * as React from 'react'
import { Reset } from 'styled-reset'
import { useEffect, useState } from "react";
import jwtDecode from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NaviMain = (props) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        if (sessionStorage.getItem('token') != null) {
            const token = sessionStorage.getItem('token');
            const decode_token = jwtDecode(token);
            setIsLoggedIn(true);
            setUserName(decode_token.name);
        } else if (window.localStorage.getItem('userName') != null) {
            setIsLoggedIn(true);
            setUserName(window.localStorage.getItem('userName'));
        } else {
            setIsLoggedIn(false);
        }
    }, [])

    const handlerClickComon = () => {
        props.history.push(`/`);
    };

    const handlerClickAppList = () => {
        props.history.push(`/user/applist`);
    };

    const handlerGoMypage = () => {
        props.history.push(`/mypage`);
    };

    const handlerGoLogin = () => {
        props.history.push(`/login`)
    };

    const handlerGoRegist = () => {
        props.history.push(`/regist`)
    };

    const handlerClickNotice = () => {
        props.history.push(`/notice`)
    };

    const handlerClickLogout = () => {
        setIsLoggedIn(false);
        sessionStorage.clear();
        localStorage.clear();
        props.history.push('/');
        showToastMessage();
    };

    const showToastMessage = () => {
        toast('Bye Bye~ 👋', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };

    return (
        <>
            <ToastContainer />
            <Reset />
            <div className='main-navi'>
                {
                    isLoggedIn
                        ?
                        <div className='loginButton'>
                            <div className='login-msg'>{userName}님 환영합니다.💞</div>
                            <button onClick={handlerClickLogout} className='login-btn' type='button'>로그아웃</button>
                            <button onClick={handlerGoMypage} className='login-btn' type='button'>마이페이지</button>
                        </div>
                        :
                        <div className='loginButton'>
                            <button onClick={handlerGoLogin} className='login-btn' type='button'>로그인</button>
                            <button onClick={handlerGoRegist} className='login-btn' type='button'>회원가입</button>
                        </div>
                }

                <h1 onClick={handlerClickComon} className='main-home'>COM:ON</h1>
                <ul className='main-link'>
                    <li>About us</li>
                    <li onClick={handlerClickAppList}>Application</li>
                    <li onClick={handlerClickNotice}>Notice</li>
                </ul>
            </div>
        </>
    );
}

export default NaviMain;