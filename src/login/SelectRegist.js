import NaviDefault from "../Navi/NaviDefault";
import '../css/login.css';

const SelectRegist = ({history}) => {

    // 사용자 회원가입
    const handlerSelectUserRegist = e => { history.push('/selectuserregist') };
    
    // 개발자 회원가입
    const handlerDevRegist = e => {history.push('/devRegist')}

    return (
        <>
            <div id="my-container">
                <NaviDefault history={history}/>
                <div className='select-register-bg' />
                <div className='select-register-container'>
                    <div className="select-register-box">
                        <div className="login-header">
                            <div className="round1" />
                            <div className="round2" />
                            <div className="round3" />
                        </div>

                        <div className='select-register-body'>
                            <p className='title'>Hello! Regist!!!^_____^</p>

                            <div className='dev-register-btn' onClick={handlerDevRegist} >
                                지금 바로 새로운 COM:ON의 <p className="select-btn-p">앱 개발자가</p> 되어보세요!
                            </div>
                            <div className='user-register-btn' onClick={handlerSelectUserRegist} >
                                지금 바로 다채로운 COM:ON의 <p className="select-btn-p">앱 사용자가</p> 되어보세요!
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SelectRegist;