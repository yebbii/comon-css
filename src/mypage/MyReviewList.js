import axios from "axios";
import { useState, useEffect } from "react";
import Navi from "../Navi/Navi";
import MyPageSide from "./MyPageSide";
import '../css/mypage.css';
import { AiOutlineClose } from "react-icons/ai";
import moment from "moment";
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2";

const MyReviewList = ({ history }) => {

    const [data, setData] = useState([]);

    useEffect(() => {

        const token = sessionStorage.getItem('token');
        const decode_token = jwt_decode(token);
        let userId = decode_token.sub;

        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/myservice/selectreview/${userId}`,
            { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
            .then(res => {
                setData(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    //리뷰 삭제
    const handlerDelete = (reviewIdx) => {
        Swal.fire({
            text: '정말로 삭제하시겠습니까?😱',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: '삭제',
            cancelButtonText: '취소',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/user/deletereview/${reviewIdx}`,
                    { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` }, })
                    .then((response) => {
                        console.log(response);
                        if (response.data === 1) {
                            Swal.fire({
                                text: '정상적으로 삭제되었습니다😱',
                                showConfirmButton: false,
                                timer: 800,
                            }).then(() => {
                                window.location.replace('/mypage/reviewlist');
                            });
                        } else {
                            Swal.fire({ text: '삭제에 실패했습니다☠️' });
                            return;
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        Swal.fire({ text: '삭제에 실패했습니다☠️' });
                        return;
                    });
            }
        });
    };

    return (
        <>
            <Navi history={history} />
            <MyPageSide />
            <div className='my-service-body'>
                <div className='my-service-header'>
                    <p className='my-service-title'>작성한 리뷰</p>
                </div>
                <div className="my-review-list-box">
                    {
                        data
                        &&
                        data.map(((data, index) =>
                            <div className="my-app-review-content" key={index}>
                                <div className="reviewlist-content-each">
                                    <div className="reviewlist-icon">
                                        <img className='reviewlist-thumbnail'
                                            src={`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/getimage/icon/${data.iconImage}`} />
                                        <p>{data.imageName}</p>
                                    </div>
                                    <div className="reviewlist-each-content-container">
                                        <pre className="reviewlist-each-content">{data.reviewContent}</pre>
                                        <p className="reviewlist-each-regisDt">{moment(data.registDt).format("YYYY-MM-DD")}</p>
                                    </div>
                                    <div className="delete-box">
                                        <AiOutlineClose className='ReviewDeleteButton' onClick={() => handlerDelete(data.reviewIdx)} />
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div >
        </>
    );
}

export default MyReviewList;