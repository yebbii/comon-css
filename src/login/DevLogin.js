import { useState, useEffect } from "react";
import axios from "axios";
import NaviDefault from "../Navi/NaviDefault";
import '../css/login.css'
import { BiShowAlt, BiHide } from "react-icons/bi";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";

const DevLogin = ({ history }) => {

    useEffect(() => {
        if (sessionStorage.getItem('token') != null) {
            history.push('/');
            showToastMessage(`already Logined`);
        }
    }, [])

    // 변수 선언 
    const [userId, setUserId] = useState('');
    const [userPassword, setUserPassword] = useState('');

    // 핸들러 정의
    const handlerChangeUserId = e => setUserId(e.target.value);
    const handlerChangeUserPassword = e => setUserPassword(e.target.value);
    const handlerRegist = () => { history.push('/devregist'); };

    //  비밀번호 옵션 설정
    const [hidePassword, setHidePassword] = useState(true);
    const toggleHidePassword = () => {
        setHidePassword(!hidePassword);
    };

    const handlerOnClick = e => {
        axios.post(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/login`, { userId, userPassword })
            .then(response => {
                if (response.data) {
                    sessionStorage.setItem("token", response.data);
                    // showToastMessage(`🦄 환영합니다!`);
                    history.push('/dev/applist');
                } else {
                    Swal.fire({ text: `ID, PW가 일치하지 않습니다. 확인 후 다시 시도해주세요.` });
                    sessionStorage.clear();
                }
            })
            .catch(error => {
                console.log(error);
                Swal.fire({ text: `ID, PW가 일치하지 않습니다. 확인 후 다시 시도해주세요.` });
                sessionStorage.clear();
            });
    };

    const showToastMessage = (msg) => {
        toast(msg, {
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
            <div id="my-container">
                <NaviDefault history={history} />
                <div className="dev-login-bg">
                    <div className="login-container">
                        <div className="login-box">
                            <div className="dev-login-header">
                                <div className="round1" />
                                <div className="round2" />
                                <div className="round3" />
                            </div>

                            <div className="login-body">
                                <div className="rotate-box">
                                    <div className="rotation-text" />
                                    <div className="login-logo" />
                                </div>

                                <div className="dev-login-content">
                                    <div className="login-content-title">
                                        <p>Hello! COM:ON!!</p>
                                        <p>Developer</p>
                                    </div>
                                    <input className='login-id'
                                        type="text"
                                        value={userId}
                                        placeholder="아이디를 입력하세요."
                                        onChange={handlerChangeUserId} />
                                    <br />
                                    <div className='login-pwd-input'>
                                        <input className='login-pwd'
                                            type={hidePassword ? "password" : "text"}
                                            placeholder="비밀번호를 입력하세요."
                                            value={userPassword}
                                            onChange={handlerChangeUserPassword} />
                                        <div className="login-pwd-show">
                                            {hidePassword ? (
                                                <BiShowAlt onClick={toggleHidePassword} />
                                            ) : (
                                                <BiHide onClick={toggleHidePassword} />
                                            )}
                                        </div>
                                    </div>

                                    {/* 아이디, 비밀번호 두개다 입력했을 때 색깔 변화 */}
                                    <section>
                                        <button className="loginBtn"
                                            onClick={handlerOnClick}
                                            type="submit"
                                            // buttonType={buttonType.ACTIVATION}
                                            // disabled가 버튼 활성화를 설정 - 2개의 값이 다 들어가야 함
                                            disabled={!(userId && userPassword)}>
                                            개발자 로그인
                                        </button>
                                    </section>

                                    <button className='register-btn' onClick={handlerRegist}>개발자 계정이 없으신가요?</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DevLogin;
