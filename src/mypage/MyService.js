import { useState, useEffect } from "react";
import Navi from "../Navi/Navi";
import MyPageSide from "./MyPageSide";
import axios from "axios";
import { BsPencilFill } from 'react-icons/bs';
import jwt_decode from "jwt-decode";
import MyServiceEdit from "./MyServiceEdit";
import MyServiceRun from "./MyServiceRun";
import Swal from "sweetalert2";

const MyService = ({ history }) => {

    const [data, setData] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [userId, setUserId] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [port, setPort] = useState('');

    useEffect(() => {
        if (sessionStorage.getItem('token') === null) {
            Swal.fire({ text: `로그인 후 이용 가능합니다.` })
            history.push(`/login`);
        }

        const token = sessionStorage.getItem('token');
        const decode_token = jwt_decode(token);
        setUserId(decode_token.sub);
        let userId = decode_token.sub;

        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/myservice/${userId}`,
            { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
            .then(res => {
                setData(res.data.map((item) => ({ ...item, hover: false })));
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    // 앱 상자에 마우스 hover 됐을 때 hover 변수 변경
    const handlerMouseOver = (index) => {
        setData(prevState => {
            const newData = [...prevState];
            if (newData[index]) {
                newData[index].hover = true;
            }
            return newData;
        })
    };

    const handlerMouseOut = (index) => {
        setData(prevState => {
            const newData = [...prevState];
            if (newData[index]) {
                newData[index].hover = false;
            }
            return newData;
        })
    };

    // 앱 실행 핸들러
    const handlerClick = (index) => {
        console.log('>>>>>>>>>>> 클릭');
        setModalIsOpen(true);
        handlerRunApp(index);
    };

    async function handlerRunApp(index) {
        try {
            setIsLoading(true);
            const result = await axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/runapp/${userId}/${index}`, {
                headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` }
            });

            console.log("exitCode", result.data.exitCode);

            if (result.data.exitCode != '0') {
                setTimeout(() => handlerRunApp(index), 10000);
            } else {
                setPort(result.data.endpointPort);
                setTimeout(() => checkServerHealth(result.data.endpointPort), 10000);
            }
        } catch (err) {
            console.log(err);
            return;
        }
    }

    function checkServerHealth(endpointPort) {
        fetch(`http://${process.env.REACT_APP_IP}:${endpointPort}`, { mode: 'no-cors' })
            .then(response => {
                if (response) {
                    setIsLoading(false);
                } else {
                    console.error('Server is not healthy');
                }
            })
            .catch(error => {
                console.error('error:', error);
                setTimeout(() => checkServerHealth(endpointPort), 10000);
            });
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    // 삭제 버튼 
    const handlerClickDelete = (e) => {
        setIsEditing(prevIsEditing => !prevIsEditing);
    };

    // 각각 앱 삭제 버튼
    const handlerClickDeleteEach = (e) => {
        Swal.fire({
            text: '서비스를 정말로 삭제하시겠습니까?😱',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: '삭제',
            cancelButtonText: '취소',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/mypage/${e}/${userId}`,
                    { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
                    .then(res => {
                        Swal.fire({
                            text: '삭제가 완료되었습니다😱',
                            showConfirmButton: false,
                            timer: 800
                        }).then(() => {
                            window.location.reload();
                        })
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        })
    };

    return (
        <>
            <div id="mypage-container">
                <Navi history={history} />
                <MyPageSide />
                <div className='my-service-body'>
                    <div className='my-service-header'>사용 중인 서비스</div>
                    <BsPencilFill title="사용중인 앱 설정"
                        className='my-service-delete-button'
                        onClick={handlerClickDelete} />
                    {
                        isEditing
                            ?
                            <div className="edit-box">
                                <MyServiceEdit data={data}
                                    handlerMouseOver={handlerMouseOver}
                                    handlerMouseOut={handlerMouseOut}
                                    userId={userId}
                                    handlerClickDeleteEach={handlerClickDeleteEach}
                                    isEditing={isEditing} />
                            </div>
                            :
                            <div className="edit-box">
                                <MyServiceRun data={data}
                                    handlerMouseOver={handlerMouseOver}
                                    handlerMouseOut={handlerMouseOut}
                                    handlerClick={handlerClick}
                                    userId={userId}
                                    closeModal={closeModal}
                                    handlerRunApp={handlerRunApp}
                                    isEditing={isEditing}
                                    modalIsOpen={modalIsOpen}
                                    port={port}
                                    isLoading={isLoading} />
                            </div>
                    }
                </div>
            </div>
        </>
    );
};
export default MyService;