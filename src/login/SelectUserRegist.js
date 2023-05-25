import KakaoLogin from "./KakaoLogin";
import NaverLogin from "./NaverLogin";
import NaviDefault from "../Navi/NaviDefault";
import { SiNaver } from "react-icons/si";
import { RiKakaoTalkFill } from "react-icons/ri";

const SelectUserRegist = ({ history }) => {

    // 사용자 회원가입
    const handlerUserRegist = e => { history.push('/userregist') };

    return (
        <>
            <div id="my-container">
                <NaviDefault history={history} />
                <div className='select-register-bg' />
                <div className='select-register-container'>
                    <div className="select-register-box">
                        <div className="login-header">
                            <div className="round1" />
                            <div className="round2" />
                            <div className="round3" />
                        </div>

                        <div className='select-user-register-body'>
                            <div className='title'>
                                <p>Hello! Regist!!!^_____^</p>
                                <p>COM:ON USER</p>
                            </div>

                            <div className='user-register-btn' onClick={handlerUserRegist} >사용자 회원가입</div>

                            <div className="register-naver-btn-box">
                                <div className="select-naver-btn"><NaverLogin /></div>
                                <div className="select-naver-tag">
                                    <SiNaver className="select-naver-icon" />
                                    <span>네이버 회원가입</span>
                                </div>
                            </div>

                            <div className="register-kakao-btn-box">
                                <div className="select-kakao-btn"><KakaoLogin /></div>
                                <div className="select-kakao-tag">
                                    <RiKakaoTalkFill className="select-kakao-icon" />
                                    <span>카카오 회원가입</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SelectUserRegist;