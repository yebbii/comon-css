import { useEffect } from "react";
import naverIcon from '../img/naver.png'
import { useRef } from "react";
import '../css/login.css'
import axios from "axios";


const NaverLogin = ({ parent }) => {
    // window 객체로 부터 naver와 관련한 항목을 객체 비구조화로 추출
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // index.html 페이지에 추가한 <script>에 의해서 설정
    const naverRef = useRef();
    const { naver } = window;

    // 네이버 개발자 사이트에 등록한 애플리케이션의 ID와 Callback URL을 상수로 정의
    const NAVER_CLIENT_ID = `daRiyvSz9TsQgCdijHo3`;
    const NAVER_CALLBACK_URL = `http://localhost:3000/userlogin`;

    // 네이버 로그인에 필요한 #1 값 설정, #2 초기화, 
    // #3 로그인 결과를 반환하는 콜백 함수를 등록해 주는 함수
    const initializeNaverLogin = () => {
        // #1
        const naverLogin = new naver.LoginWithNaverId({
            clientId: NAVER_CLIENT_ID,
            callbackUrl: NAVER_CALLBACK_URL,
            isPopup: true,
            loginButton: { color: 'green', type: 3, height: 60 }
        });

        // #2
        naverLogin.init();

        // #3
        naverLogin.getLoginStatus(function (status) {
            // 로그인 성공 시 true를 값으로 가짐
            if (status) {
                // 로그인 성공 시 naverLogin의 user 객체에 있는 정보 중 
                // 필요한 정보를 로컬 스토리지에 저장

                localStorage.setItem('userName', naverLogin.user.name);
                localStorage.setItem('userNickname', naverLogin.user.nickname);
                localStorage.setItem('userPhoto', naverLogin.user.profile_image);

                // 부모 브라우저 창의 주소를 홈(/)으로 변경 후 
                // 팝업 브라우저 창을 닫음
                // window.opener.location.href = "/";
                // window.opener.location.href = "/regist";
                window.close();
                window.opener.location.reload();
                const userName = naverLogin.user.name; // 로그인하는 사용자의 이름으로 설정
                axios.post(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/checkUserExistence`, { userName })
                    .then(response => {
                        if (response.data.exists) {
                            axios.post(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/loginFromSocial`, { userName })
                                .then(response => {
                                    if (response.data) {

                                        window.opener.location.href = "/";

                                        // window.close();
                                    }
                                })
                                .catch(error => {
                                    console.log(error);
                                    sessionStorage.clear();
                                });
                        } else {
                            window.opener.location.href = "/userregist";
                            window.close();
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        sessionStorage.clear();
                        localStorage.clear();
                    });
            }
        });
    };

    // 최초 마운트 시 initializeNaverLogin 함수를 호출
    useEffect(() => {
        initializeNaverLogin();
    }, []);

    // handleClick 함수 onClick 이벤트 발생 시 useRef 를 통해 지정한 naverRef 항목이 클릭 된다.
    // current 를 통해 아래 div 태그의 ref={} 속성을 줄 수 있다. ( 자세한 내용은 공식문서를 확인하자. )
    const handleNaverLogin = () => {
        naverRef.current.children[0].click()
    }


    // 로그인 버튼을 출력(id는 고정된 값)
    return (
        <>
            <div ref={naverRef} id="naverIdLogin" />
            <div className="login-naver"
                onClick={handleNaverLogin}
                style={{ width: '100%', height: '100%', cursor: 'pointer' }} />
        </>
    );
};

export default NaverLogin;