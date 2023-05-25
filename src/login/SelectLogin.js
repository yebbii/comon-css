import NaviDefault from '../Navi/NaviDefault';
import { FaUserAstronaut, FaUserLock } from "react-icons/fa";
import '../css/login.css';
import { GrNext } from "react-icons/gr";

const SelectLogin = ({history}) => {
    
    const handlerDev = () => {history.push('/devlogin')};

    const handlerUser = () => {history.push('/userlogin')};

    const handlerRegister = () => { history.push('/regist') };

    return (
        <>
            <div id="my-container">
                <NaviDefault history={history} />
                <div className="select-login-bg">
                    <div className="login-container">
                        <div className="login-box">
                            <div className="login-header">
                                <div className="round1" />
                                <div className="round2" />
                                <div className="round3" />
                            </div>

                            <div className="select-login-body">
                                <div className="select-login-content">
                                    <p className='select-login-title'> HELLO! COM:ON!!:) </p>

                                    <div className='select-login-box'>
                                        <div className="select-dev-loginBtn" onClick={handlerDev} type="submit">
                                            <FaUserAstronaut id='dev-login-btn' />
                                            <p><span> 앱 개발자</span>로 로그인</p>
                                        </div>
                                        
                                        <div className="select-user-loginBtn" onClick={handlerUser} type="submit">
                                            <FaUserLock id='user-login-btn' />
                                            <p><span> 앱 사용자</span>로 로그인</p>
                                        </div>
                                    </div>

                                    <p className="select-go-register-btn" onClick={handlerRegister}>
                                        아직 계정이 없으신가요? 지금 바로 간단한 회원가입으로 로그인 해보세요!
                                        <span className='select-go-register-icon'><GrNext /><GrNext /><GrNext /></span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
};

export default SelectLogin;