import { useState, useEffect } from "react";
import Navi from "../Navi/Navi";
import MyPageSide from "./MyPageSide";
import axios from "axios";
import ReviewCheckButton from "./ReviewCheckButton";
import { RiUserSmileFill } from 'react-icons/ri';
import jwt_decode from "jwt-decode";

const MyReview = ({ history }) => {
    const [data, setData] = useState([]);
    const [userId, setUserId] = useState('');

    useEffect(() => {

        const token = sessionStorage.getItem('token');
        const decode_token = jwt_decode(token);
        let userId = decode_token.sub;
        setUserId(decode_token.sub);

        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/myservice/${userId}`,
            { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
            .then(res => {
                setData(res.data.map((item) => ({ ...item, hover: false })));
            })
            .catch(err => {
                console.log(err);
            })
        // axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/qna/${userId}`,
        //     { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
        //     .then(res => {
        //         const userIdx = res.data;
        //         setUserIdx(userIdx);
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     })
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

    return (
        <>
            <div id="my-container">
                <Navi history={history} />
                <MyPageSide />
                <div className='my-service-body'>
                    <div className='my-service-header'>
                        <p className='my-service-title'>리뷰 작성</p>
                    </div>

                    <div className='my-review-box'>
                        {data
                            &&
                            data.map((data, index) => (
                                <>
                                    <div className="my-review-each" key={index}>
                                        <div className='my-app-header'>
                                            <div className='app-header-round'></div>
                                            <div className='app-header-round'></div>
                                            <div className='app-header-round'></div>
                                        </div>
                                        <img className='my-app-image'
                                            src={`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/getimage/thumbnail/${data.thumbnailImage}`} />
                                        <div className='my-review-description'>
                                            <p className='my-review-imagename'>{data.imageName}</p>
                                            <p className='my-review-devname'>
                                                <RiUserSmileFill className="my-review-devicon" />
                                                {data.userName}
                                            </p>
                                            {/* <p className='my-review-description-description'>{data.imageDescription}</p> */}
                                            {/* 리뷰 작성했는지 여부에 따라 노출 다르게 하는 버튼 컴포넌트를 ReviewCheckButton으로 분리 */}
                                            <ReviewCheckButton imageIdx={data.imageIdx} userId={userId} imageName={data.imageName} />
                                        </div>
                                    </div>
                                </>
                            ))}
                    </div>
                </div>
            </div>
            {/* </div> */}
        </>
    );
}

export default MyReview;