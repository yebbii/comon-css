import { RiUser5Line, RiUser5Fill, RiLogoutCircleFill } from 'react-icons/ri'
import '../css/navi.css';
import '../css/dev.css';
import * as React from 'react'
import { Reset } from 'styled-reset'
import { useEffect, useState } from "react";
import jwtDecode from 'jwt-decode';


const NaviDefault = (props) => {

    const handlerClickComon = () => {
        props.history.push(`/`);
    };

    const handlerClickAppList = () => {
        props.history.push(`/user/applist`);
    };

    const handlerGoMypage = () => {
        props.history.push(`/mypage`);
    };

    return (
        <>
            <Reset />
            <div id="navi">
                <div className='default-navi'>
                    <h1 onClick={handlerClickComon} className='default-home'>COM:ON</h1>
                    <ul className='default-link'>
                        <li>About us</li>
                        <li onClick={handlerClickAppList}>Application</li>
                        <li>Notice</li>
                    </ul>
                    <div id="default-button">
                        < RiLogoutCircleFill className='logout-navi-icon' title='로그아웃' />
                        {/* < RiUser5Fill className='mypage-navi-icon' title='마이페이지' onClick={handlerGoMypage}/> */}
                        < RiUser5Line className='login-navi-icon' title='로그인' />
                    </div>
                </div>
            </div>
        </>
    );
}

export default NaviDefault;