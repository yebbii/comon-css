import { Router, withRouter } from 'react-router-dom';
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import NaviDefault from '../Navi/NaviDefault';
import '../css/login.css';
import Swal from 'sweetalert2';
import $ from 'jquery';
import { ToastContainer, toast } from 'react-toastify';

const DevRegist = ({ history }) => {

    // 변수 선언
    const [userId, setUserId] = useState('');                            // 아이디
    const [userPassword, setUserPassword] = useState('');                // 비밀번호 및 비밀번호 확인
    const [userPasswordCheck, setUserPasswordCheck] = useState('');
    const [userName, setUserName] = useState('');                        // 이름
    const [userEmail, setUserEmail] = useState('');                      // 이메일
    const [userPhoneNumber, setUserPhoneNumber] = useState('');           // 전화번호
    const authIdx = useState('2');

    // 오류 메시지 상태 저장
    const [userEmailMessage, setUserEmailMessage] = useState('');                 // 이메일 메시지
    const [userPasswordCheckMessage, setUserPasswordCheckMessage] = useState(''); // 비밀번호 확인 메시지

    //유효성 검사
    const [isEmail, setIsEmail] = useState(false);                   // 이메일
    const [isPasswordCheck, setIsPasswordCheck] = useState(false);   // 비밀번호 확인
    const [passwordOption, setPasswordOption] = useState(false);     // 비밀번호 옵션

    // 비밀번호 옵션 설정
    const [passwordInputType, setPasswordInputType] = useState({
        type: "password",
        autoComplete: "current-password",
    });

    //아이디 중복 확인
    let isValidId = false; // 중복확인 여부를 나타내는 상태값
    //이름 중복 확인
    // let isValidName = false;

    useEffect(() => {
        if (passwordOption === false)
            setPasswordInputType({
                type: "password",
                autoComplete: "current-password",
            });
        else
            setPasswordInputType({
                type: "text",
                autoComplete: "off"
            });
    }, [passwordOption])

    // 핸들러
    const handlerChangeUserId = e => setUserId(e.target.value);

    // 이름 핸들러 정의
    const handlerChangeUserName = e => setUserName(e.target.value);

    // 이메일 핸들러 정의
    const handlerChangeUserEmail = useCallback((e) => {
        const emailRegex =
            /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
        const emailCurrent = e.target.value
        setUserEmail(emailCurrent)
        if (!emailRegex.test(emailCurrent)) {
            setUserEmailMessage('이메일 형식이 올바르지 않습니다. 다시 확인해주세요.')
            setIsEmail(false)
        } else {
            setUserEmailMessage('올바른 이메일 형식입니다.')
            setIsEmail(true)
        }
    }, [])

    // 비밀번호 핸들러 정의
    const handlerChangeUserPassword = e => setUserPassword(e.target.value);

    // 비밀번호 확인 핸들러 정의
    const handlerChangeUserPasswordCheck = useCallback((e) => {
        const passwordCheckCurrent = e.target.value
        setUserPasswordCheck(passwordCheckCurrent)
        if (userPassword === passwordCheckCurrent) {
            setUserPasswordCheckMessage('비밀번호가 일치합니다.')
            setIsPasswordCheck(true)
        } else {
            setUserPasswordCheckMessage('비밀번호가 일치하지 않습니다. 다시 확인해주세요.')
            setIsPasswordCheck(false)
        }
    }, [userPassword])

    // 전화번호 핸들러 정의
    const handlerChangeUserPhoneNumber = e => {
        const before = e.target.value.replaceAll('-', '');

        // 숫자 여부 체크
        let numberFormat = before.replace(/[^0-9]/g, '');

        // 길이에 따라서 짤라서 포맷팅 
        if (numberFormat.length < 3) {
            numberFormat = numberFormat.substr(0, 3);
        } else if (numberFormat.length > 4 && numberFormat.length < 8) {
            numberFormat = numberFormat.substr(0, 3) + '-' + numberFormat.substr(3, 4);
        } else if (numberFormat.length >= 8) {
            numberFormat = numberFormat.substr(0, 3) + '-' + numberFormat.substr(3, 4) + '-' + numberFormat.substr(7, 4);
        }

        setUserPhoneNumber(numberFormat);
    }

    // 아이디 중복 확인
    function checkId() {
        var id = $('#id').val(); //id값이 "id"인 입력란의 값을 저장

        if (id.trim() === '') {
            toast.error('아이디를 입력해주세요.', {
                position: "top-center",
                autoClose: 500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        };
        $.ajax({
            url: `http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/idCheck`, //Controller에서 요청 받을 주소
            type: 'post', //POST 방식으로 전달
            data: { id: id },
            success: function (cnt) { //컨트롤러에서 넘어온 cnt값을 받는다 
                if (cnt == 0) { //cnt가 1이 아니면(=0일 경우) -> 사용 가능한 아이디 
                    $('.id_ok').css("display", "inline-block");
                    $('.id_already').css("display", "none");
                    toast.success('👌 사용가능한 아이디입니다.', {
                        position: "top-center",
                        autoClose: 500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    isValidId = true; //사용가능한 아이디로 확인이 되면 true값으로 바뀜면서 회원가입 가능
                } else { // cnt가 1일 경우 -> 이미 존재하는 아이디
                    $('.id_already').css("display", "inline-block");
                    $('.id_ok').css("display", "none");
                    toast.error('❌이미 사용중인 아이디입니다.', {
                        position: "top-center",
                        autoClose: 500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    $('#id').val('');
                    isValidId = false; // 중복확인을 실패한 경우에는 isValidId 값을 false로 변경
                }
            },

            error: function () {
                alert("에러입니다");
            }
        });
    };


    // 이름 중복 확인
    // function checkName() {
    //     var name = $('#name').val(); //name값이 "name"인 입력란의 값을 저장
    //     if (name.trim() === '') {
    //         toast.error('이름을 입력해주세요.', {
    //             position: "top-center",
    //             autoClose: 500,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             progress: undefined,
    //             theme: "light",
    //             });
    //         return;
    //     };
    //     $.ajax({
    //         url: `http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/nameCheck`, //Controller에서 요청 받을 주소
    //         type: 'post', //POST 방식으로 전달
    //         data: { name:name },
    //         success: function (cntN) { //컨트롤러에서 넘어온 cntN값을 받는다 
    //             if (cntN === 0) { //cntN가 0일 경우 -> 사용 가능한 이름
    //                 $('.name_ok').css("display", "inline-block");
    //                 $('.name_already').css("display", "none");
    //                 toast.success('👌 사용가능한 이름입니다.', {
    //                     position: "top-center",
    //                     autoClose: 500,
    //                     hideProgressBar: false,
    //                     closeOnClick: true,
    //                     pauseOnHover: true,
    //                     draggable: true,
    //                     progress: undefined,
    //                     theme: "light",
    //                 });
    //                 isValidName = true; //사용가능한 이름으로 확인이 되면 true값으로 바뀜면서 회원가입 가능
    //             } else { // cntN가 1일 경우 -> 이미 존재하는 이름
    //                 $('.name_already').css("display", "inline-block");
    //                 $('.name_ok').css("display", "none");
    //                 toast.error('❌이미 사용중인 이름입니다.', {
    //                     position: "top-center",
    //                     autoClose: 500,
    //                     hideProgressBar: false,
    //                     closeOnClick: true,
    //                     pauseOnHover: true,
    //                     draggable: true,
    //                     progress: undefined,
    //                     theme: "light",
    //                 });
    //                 $('#name').val('');
    //                 isValidName = false; // 중복확인을 실패한 경우에는 isValidId 값을 false로 변경
    //             }
    //         },
    //         error: function () {
    //             alert("에러입니다");
    //         }
    //     });
    // }


    // 회원가입 값 푸쉬 버튼
    const handlerOnClick = e => {
        e.preventDefault();

        // 아이디 중복 확인을 수행하지 않은 경우
        if (!isValidId) {
            Swal.fire({ text: '아이디 중복확인을 해주세요.' });
            return;
        }
        // 이름 중복 확인을 수행하지 않은 경우
        // if(!isValidName){
        //     Swal.fire({text : '이름 중복확인을 해주세요.' });
        //     return;
        // }

        axios.post(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/regist`,
            { userId, userName, userPassword, userPhoneNumber: userPhoneNumber.replaceAll('-', ''), userEmail, authIdx: 2 })
            .then(response => {
                if (response.data) {
                    Swal.fire({ text: `정상적으로 가입 되었습니다. 로그인 페이지로 이동합니다.` });
                    history.push('/devlogin');
                }
            })
            .catch(error => {
                console.log(error);
                Swal.fire({ text: `확인 후 다시 시도해주세요.` });
                sessionStorage.clear();
            });
    };

    return (
        <>
            <div id="my-container">
                <NaviDefault history={history} />
                <div className='dev-register-bg' />
                <div className='register-container'>
                    <div className='register-box'>
                        <div className="dev-login-header">
                            <div className="round1" />
                            <div className="round2" />
                            <div className="round3" />
                        </div>

                        <div className='register-body'>
                            <div className='title'>
                                <p>Hello! Regist!!!^_____^</p>
                                <p>Developer</p>
                            </div>

                            <div className='input-register-id'>
                                <label><span style={{ color: 'red' }}>*</span> 아이디</label>
                                <input type="text" id="id" value={userId} onChange={handlerChangeUserId}
                                    placeholder="아이디를 입력하고 중복확인을 해주세요." />
                                <button id='doublecheck-btn' onClick={checkId}>중복 확인</button>
                            </div>

                            <div className='input-register'>
                                <label><span style={{ color: 'red' }}>*</span> 비밀번호</label>
                                <input type={passwordInputType.type} onChange={handlerChangeUserPassword}
                                    id="password"
                                    password="비밀번호 (숫자+영문자+특수문자 조합으로 8자리 이상)"
                                    title="비밀번호"
                                    placeholder="비밀번호를 입력하세요"
                                    value={userPassword}
                                    autoComplete={passwordInputType.autoComplete}
                                />
                            </div>

                            <div className='checked-box'>
                                <div className='input-pwdChecked'>
                                    <label><span style={{ color: 'red' }}>*</span> 비밀번호 확인</label>
                                    <input type={passwordInputType.type}
                                        onChange={handlerChangeUserPasswordCheck}
                                        title="비밀번호 확인"
                                        placeholder="비밀번호를 한번 더 입력하세요."
                                        value={userPasswordCheck}
                                        autoComplete={passwordInputType.autoComplete}
                                    />
                                    {userPasswordCheck.length > 0 && (
                                        <p className={`message ${isPasswordCheck ? 'success' : 'error'}`}>{userPasswordCheckMessage}</p>
                                    )}
                                </div>
                                <p className="checkbox-item">
                                    <input id="showPwd-check"
                                        type="checkbox"
                                        checked={passwordOption}
                                        onChange={() => setPasswordOption(!passwordOption)}
                                    />
                                    <label><span>비밀번호 표시</span></label>
                                </p>
                            </div>

                            <div className='input-register'>
                                <label><span style={{ color: 'red' }}>*</span> 이름</label>
                                <input type="text" text="이름" id="name" value={userName}
                                    onChange={handlerChangeUserName}
                                    placeholder="이름을 입력하세요." />
                                {/* <button id='doublecheck-btn' onClick={checkName }>중복 확인</button> */}
                            </div>

                            <div className='input-email'>
                                <label><span style={{ color: 'red' }}>*</span> 이메일</label>
                                <input type="email" text="이메일" value={userEmail} onChange={handlerChangeUserEmail}
                                    placeholder="이메일을 입력하세요." />
                                {userEmail.length > 0 && <span className={`message ${isEmail ? 'success' : 'error'}`}>{userEmailMessage}</span>
                                }
                            </div>

                            <div className='input-register'>
                                <label><span style={{ color: 'red' }}>*</span> 전화번호</label>
                                <input type="text" text="전화번호" value={userPhoneNumber} onChange={handlerChangeUserPhoneNumber}
                                    placeholder="전화번호를 입력하세요." />
                            </div>

                            <section>
                                <button className="dev-registerCheck-btn"
                                    onClick={handlerOnClick}
                                    type="submit"
                                    disabled={!(userId && userPassword && isPasswordCheck && isEmail && userName && userPhoneNumber)}>
                                    개발자 회원가입
                                </button>
                            </section>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};

export default DevRegist;