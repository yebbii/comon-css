import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import '../css/mypage.css';

const ReviewCheckButton = (props) => {

    const [count, setCount] = useState(0);
    const [imageIdx, setImageIdx] = useState(props.imageIdx);
    const [userId, setUserId] = useState(props.userId);
    const [imageName, setimageName] = useState(props.imageName);

    useEffect(() => {
        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/myservice/${imageIdx}/${userId}`,
            { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
            .then(res => {
                setCount(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    })

    //리뷰 작성 했는지 확인해서 버튼값 다르게 노출
    return (
        <>
            {count == 0 ?
                <Link to={{
                    pathname: '/mypage/writereview',
                    state: {
                        imageIdx: imageIdx,
                        userId: userId,
                        imageName: imageName
                    }
                }}><button className="WriteReviewButton">리뷰 작성</button></Link>
                :
                <Link to='/mypage/reviewlist'>
                    <button className="CompleteReviewButton">작성한 리뷰 보기</button></Link>
            }

        </>
    );
}

export default ReviewCheckButton;