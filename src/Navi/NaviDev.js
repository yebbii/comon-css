import { RiUser5Line, RiUser5Fill, RiLogoutCircleFill } from 'react-icons/ri'
import '../css/navi.css';
import '../css/dev.css';
import * as React from 'react'
import { Reset } from 'styled-reset'
import { useEffect, useState } from "react";
import jwtDecode from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NaviDev = (props) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (sessionStorage.getItem('token') != null) {
            setIsLoggedIn(true);
        } else if (window.localStorage.getItem('userName') != null) {
            setIsLoggedIn(true);
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
        props.history.push(`/dev/setting`);
    };

    const handlerClickLogin = () => {
        props.history.push(`/login`)
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
            autoClose: 500,
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
            <div className='dev-menu'>
                <h1 onClick={handlerClickComon} className='dev-home'>COM:ON</h1>
                <ul className='dev-link'>
                    <li>About us</li>
                    <li onClick={handlerClickAppList}>Application</li>
                    <li>Notice</li>
                </ul>
                {
                    isLoggedIn
                        ?
                        <>
                            <div id="user-button">
                                < RiLogoutCircleFill className='logout-navi-icon'
                                    title='로그아웃'
                                    onClick={handlerClickLogout}
                                    style={{ color: '#ff9600' }} />
                                < RiUser5Fill className='mypage-navi-icon'
                                    title='마이페이지'
                                    onClick={handlerGoMypage}
                                    style={{ color: '#ff9600' }} />
                            </div>
                        </>
                        :
                        <>
                            <div id="user-button">
                                < RiUser5Line className='login-navi-icon'
                                    title='로그인'
                                    onClick={handlerClickLogin}
                                    style={{ color: '#ff9600' }} />
                            </div></>

                }
            </div>
        </>
    );
}

export default NaviDev;