import { Link } from "react-router-dom/cjs/react-router-dom.min";
import '../css/dev.css';
import { Reset } from "styled-reset";

const Auth = ({ history }) => {
    return (
        <>
            <Reset />
            <div className='auth_body'>
                <div className='auth-content'>
                    <p className='auth-title'>⛔접근 권한이 없습니다.⛔</p>
                    <button type='button'
                        onClick={() => history.push('/')}
                        className='auth-btn'>메인으로</button>
                </div>
            </div>
        </>
    );
}
export default Auth;