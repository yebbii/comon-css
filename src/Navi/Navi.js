import { RiUser5Line, RiUser5Fill, RiLogoutCircleFill } from 'react-icons/ri'
import '../css/navi.css';
import '../css/dev.css';
import * as React from 'react'
import { Reset } from 'styled-reset'
import { useEffect, useState } from "react";
import jwtDecode from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navi = (props) => {

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
        props.history.push(`/mypage`);
    };

    const handlerClickNotice = () => {
        props.history.push(`/notice`)
    };

    const handlerClickLogin = () => {
        props.history.push(`/login`)
    }

    const handlerClickLogout = () => {
        setIsLoggedIn(false);
        localStorage.clear();
        sessionStorage.clear();
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
            <div id="navi">
                <div className='user-navi'>
                    <h1 onClick={handlerClickComon} className='user-home'>COM:ON</h1>
                    <ul className='user-link'>
                        <li>About us</li>
                        <li onClick={handlerClickAppList}>Application</li>
                        <li onClick={handlerClickNotice}>Notice</li>
                    </ul>
                    {
                        isLoggedIn
                            ?
                            <div id="user-button">
                                < RiLogoutCircleFill className='logout-navi-icon'
                                    title='로그아웃'
                                    onClick={handlerClickLogout} />
                                < RiUser5Fill className='mypage-navi-icon'
                                    title='마이페이지'
                                    onClick={handlerGoMypage} />
                            </div>
                            :
                            <div id="user-button">
                                < RiUser5Line className='login-navi-icon'
                                    title='로그인'
                                    onClick={handlerClickLogin}
                                />
                            </div>
                    }



                </div>
            </div>
        </>
    );
}

export default Navi;