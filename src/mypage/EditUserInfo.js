import { useEffect, useState } from "react";
import Navi from "../Navi/Navi";
import MyPageSide from "./MyPageSide";
import axios from "axios";
import { RiUserSettingsFill, RiPhoneFill } from "react-icons/ri";
import { MdMarkEmailRead } from "react-icons/md";
import jwtDecode from 'jwt-decode';
import Swal from "sweetalert2";

const EditUserInfo = ({ history }) => {
    const [data, setData] = useState('');
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPhoneNumber, setUserPhoneNumber] = useState(0);
    const [userId, setUserId] = useState(0);

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        const decode_token = jwtDecode(token)
        let userId = decode_token.sub;

        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/mypage/edit/${userId}`,
            { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
            .then(res => {
                setUserId(userId);
                setData(res.data);
                setUserName(res.data.userName);
                setUserEmail(res.data.userEmail);
                setUserPhoneNumber(res.data.userPhoneNumber.substr(0, 3) + '-' + res.data.userPhoneNumber.substr(3, 4) + '-' + res.data.userPhoneNumber.substr(7, 4));
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    const handlerChangePhoneNumber = (e) => {
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
    };

    const handlerChangeName = (e) => { setUserName(e.target.value) };
    const handlerChangeEmail = (e) => { setUserEmail(e.target.value) };

    const handlerClickEdit = () => {
        console.log(userId);
        axios.post(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/mypage/edit`,
            { userId, userName, userEmail, userPhoneNumber: userPhoneNumber.replaceAll('-', '') },
            { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
            .then(res => {
                Swal.fire({
                    text: `회원 정보 수정이 완료되었습니다.`,
                    showConfirmButton: false,
                    timer: 800
                });
                history.push('/mypage');
            })
            .catch(err => {
                console.log(err);
            })
    };

    return (
        <>
            <div id='my-container'>
                <Navi history={history} />
                <MyPageSide />
                <div className='edit-user-info-body'>
                    <div className='edit-user-info-header'>
                        <p className='edit-user-info-title'>회원 정보 변경</p>
                    </div>
                    <div className='edit-user-info-form'>

                        <div className='edit-user-info-name'>
                            <RiUserSettingsFill className="user-info-icon" />
                            <div className="edit-user-info">
                                <p className='edit-user-info-form-title'><span>*</span> 이름</p>
                                <input type='text'
                                    onChange={handlerChangeName}
                                    value={userName}
                                    className='edit-user-info-form-input' />
                            </div>
                        </div>

                        <div className='edit-user-info-phone'>
                            <RiPhoneFill className="user-info-icon" />
                            <div className="edit-user-info">
                                <p className='edit-user-info-form-title'><span>*</span> 휴대전화</p>
                                <input type="text"
                                    onChange={handlerChangePhoneNumber}
                                    maxLength={13}
                                    value={userPhoneNumber}
                                    className='edit-user-info-form-input'></input>
                            </div>
                        </div>

                        <div className='edit-user-info-email'>
                            <MdMarkEmailRead className="user-info-icon" />
                            <div className="edit-user-info">
                                <p className='edit-user-info-form-title'><span>*</span> 이메일</p>
                                <input type='text'
                                    onChange={handlerChangeEmail}
                                    value={userEmail}
                                    className='edit-user-info-form-input' />
                            </div>
                            
                            <button type='button'
                                onClick={handlerClickEdit}
                                className='edit-user-info-submit-button'>회원 정보 변경</button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}
export default EditUserInfo;