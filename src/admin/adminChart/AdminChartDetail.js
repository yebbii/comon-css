import axios from "axios";
import { useEffect, useState } from "react";
import NaviAdmin from "../../Navi/NaviAdmin";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "../adminChart/chartDetail.css";
import AppDownload from "./AppDownload";
import { FaUserAstronaut } from "react-icons/fa";
import { BiCalendarExclamation } from "react-icons/bi";
import { MdDownload } from "react-icons/md";
import Paging from "./Paging";
import { RiUser5Line } from "react-icons/ri";
import { MdOutlineDescription } from "react-icons/md";
import { AiOutlineTags } from "react-icons/ai";
import jwtDecode from "jwt-decode";

function AdminChartDetail({ match }) {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [registDt, setRegistDt] = useState('');
    const [description, setDescription] = useState('');
    const { imageIdx } = match.params;
    const [detail, setDetail] = useState('');
    const [reviewList, setReviewList] = useState('');
    const [downloadCount, setDownloadCount] = useState('');
    const [page, setPage] = useState(1);
    const [authYn, setAuthYn] = useState(false);

    const handleChange = (value) => {
        setPage(value);
    };

    useEffect(() => {

        if (sessionStorage.getItem('token') == null) {
            setAuthYn(false);
        } else {
            const token = sessionStorage.getItem('token');
            const decode_token = jwtDecode(token);
            let authIdx = decode_token.authIdx;
            if (authIdx === 3) {
                setAuthYn(true);
            } else {
                setAuthYn(false);
            }
        }

        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/user/applist/detail/${imageIdx}`)
            .then(response => {
                console.log(response.data.reviewList);
                setName(response.data.imageDto.imageName);
                setUsername(response.data.imageDto.userName);
                setRegistDt(response.data.imageDto.registDt.substring(0, 10))
                setDescription(response.data.imageDto.imageDescription);
                setDetail(response.data.imageDto.imageDetail);
                setDownloadCount(response.data.imageDto.downloadCount);
                setReviewList(response.data.reviewList);
            })
            .catch(error => {
                console.log(error);
            })
    }, [page]);

    return (
        <>
            <div>
                <NaviAdmin />
                <div className='sidemenu_admin-box'>
                    <div className='admin_logo'></div>
                    <ul className='sidemenu_admin'>
                        <li><Link to='/admin/setting'>회원 관리</Link></li>
                        <li><Link to='/admin'>모든 앱</Link></li>
                        <li><Link to='/admin/judge'>심사</Link></li>
                        <li id='admin-setting'><Link to='/admin/chart'>통계</Link></li>
                    </ul>
                </div>

                <div className="chartDetail-content">
                    <p className="app-name"><AiOutlineTags className="app-name-icon" />&nbsp;{name}</p>
                    <div className="app-content-1">
                        <p> <FaUserAstronaut className="user-Icon-1" title="개발자" /> &nbsp;{username} &emsp;
                            <BiCalendarExclamation className="regist-Icon" size='40px' /> &nbsp;출시일 : {registDt}
                        </p>
                    </div>
                    <div className="app-content-2">
                        <p className="app-downloadChart">
                            <AppDownload match={match} name={name} />
                        </p>
                        <div className="total-container">
                            <p className="total-box"><MdDownload className="total-Icon" /> &nbsp;총 다운로드 수 : {downloadCount} (건)</p>
                        </div>
                    </div>
                    <div className="appDetail-content">
                        <p className="appDetail-title">상세 설명</p>
                        <p className="app-description"><MdOutlineDescription className="description-Icon" />&nbsp;{description}</p>
                        <p className="app-detail">
                            <p className="app-detail-content">{detail}</p>
                        </p>
                    </div>

                    <div className="appReviews-content">평가 및 리뷰</div>
                    {/*아이디 및 리뷰 리스트*/}
                    <div className="review-box">
                        {
                            reviewList.length > 0
                                ?
                                reviewList.slice((page - 1) * 5, page * 5).map((review, index) =>
                                    <div className="review-line">
                                        <div className='app-reviews-box'>
                                            <div className='app-userName'><RiUser5Line className="user-Icon-2" />&nbsp;{review.userName}</div>
                                            <div className='app-review'>{review.reviewContent}</div>
                                        </div>
                                    </div>
                                )
                                :
                                <>
                                    <div className='app-no-reviews-box'>
                                        <p> 아직 작성된 후기가 없습니다</p>
                                    </div>
                                </>
                        }
                        <Paging page={page} count={reviewList.length} setPage={handleChange} />
                    </div>
                </div>
            </div>


        </>
    );
}
export default AdminChartDetail;