import axios from "axios";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { ImStarFull } from "react-icons/im";
import '../css/scoreCount.css';
import MyPageSide from "./MyPageSide";
import Navi from "../Navi/Navi";
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2";

const WriteReview = ({ history }) => {
    const location = useLocation();
    const [scoreCount, setScoreCount] = useState(0);
    const [reviewContent, setReviewContent] = useState('');
    const imageIdx = location.state.imageIdx;
    const userId = location.state.userId;
    const imageName = location.state.imageName;

    //별점 찍기
    const [clicked, setClicked] = useState([false, false, false, false, false]);
    const array = [0, 1, 2, 3, 4];

    const handleStarClick = index => {
        let clickState = [...clicked];
        for (let i = 0; i < 5; i++) {
            clickState[i] = i <= index ? true : false;
        }
        setClicked(clickState);
        setScoreCount(clickState.filter(Boolean).length);
    }

    //리뷰 등록
    const handlerChange = e => setReviewContent(e.target.value);
    const handlerSubmit = () => {
        const token = sessionStorage.getItem('token');
        const decode_token = jwt_decode(token);
        let userId = decode_token.sub;

        axios.post(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/user/writereview/${imageIdx}`,
            {
                imageIdx: imageIdx,
                reviewContent: reviewContent,
                userId: userId,
                scoreCount: scoreCount,
                showConfirmButton: false,
            },
            {
                headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` }
            })
            .then(response => {
                Swal.fire({
                    text: '정상적으로 등록되었습니다📂',
                    showConfirmButton: false,
                    timer: 1000
                }).then(() => {
                    window.location.replace('/mypage/review');
                });
            })
            .catch(error => {
                console.log(error);
                Swal.fire({ text: `리뷰 등록에 실패했습니다☠️` })
                return;
            })
    }

    return (
        <>
            <Navi history={history} />
            <MyPageSide />
            <div className='my-reviewWrite-body'>
                <div className="my-service-container">
                    <div className='my-review-top'>
                        <div className='app-header-round'></div>
                        <div className='app-header-round'></div>
                        <div className='app-header-round'></div>
                    </div>
                    <div className="my-service-bodybox">
                        <div className='my-review-header'>
                            <p className='my-review-titleName'>'{imageName}'</p>
                            <p className='my-review-titleName2'>애플리케이션을 추천하시겠어요?</p>
                        </div>
                        <div className='my-writeReview-box'>
                            <div className="Stars">
                                {array.map((el, idx) => {
                                    return (
                                        <ImStarFull
                                            key={idx}
                                            size="50"
                                            onClick={() => handleStarClick(el)}
                                            className={clicked[el] && 'Pick'}
                                        />
                                    );
                                })}
                            </div>
                            <div className="ReviewContent">
                                <textarea className="ReviewContentInput" placeholder="리뷰를 작성해 주세요." value={reviewContent} onChange={handlerChange} required />
                            </div>
                            <button className='ReviewSubmit' onClick={handlerSubmit}>리뷰 등록</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default WriteReview;



