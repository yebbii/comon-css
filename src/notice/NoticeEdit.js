import axios from "axios";
import { useEffect, useState } from "react";
import "../css/notice.css";
import Navi from "../Navi/Navi";
import { Link } from "react-router-dom";
import notice1 from "./notice1.png";
import Swal from "sweetalert2";

const NoticeEdit = ({ match, history }) => {
    const { noticeIdx } = match.params;

    const [category, setCategory] = useState([]);
    const [noticeTitle, setNoticeTitle] = useState('');
    const [noticeContent, setNoticeContent] = useState('');
    const [noticeCategoryIdx, setNoticeCategoryIdx] = useState('');
    const [noticeCategoryName, setNoticeCategoryName] = useState('');

    const handlerChangeNoticeCategory = e => {
        setNoticeCategoryIdx(e.target.value);
    }
    const handlerChangeTitle = e => setNoticeTitle(e.target.value);
    const handlerChangeContent = e => setNoticeContent(e.target.value);

    useEffect(() => {
        axios
            .get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/notice/detail/${noticeIdx}`)
            .then(res => {
                setNoticeTitle(res.data.noticeTitle);
                setNoticeContent(res.data.noticeContent);
                setNoticeCategoryIdx(res.data.noticeCategoryIdx);
                setNoticeCategoryName(res.data.noticeCategoryName);
                console.log(res.data);
            })
            .catch(err => console.log(err));
        axios
            .get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/notice/category`)
            .then(res => {
                setCategory(res.data);
            })
            .catch(err => console.log(err));
    }, [noticeIdx]);

    const handlerClickList = () => {
        history.push('/notice');
    };


    const handlerClickEdit = (e) => {
        e.preventDefault();
        console.log(noticeCategoryIdx);

        new Swal({
            title: "수정하시겠습니까?",
            text: "🚨 주의: 수정 시 현재 내용이 변경되며, 이전 내용은 복구할 수 없습니다.\n수정하시겠습니까?",
            showCancelButton: true,
            confirmButtonText: '수정',
            cancelButtonText: '취소',
            dangerMode: true,
            reverseButtons: true,
            width: 500
        })
            .then((result) => {
                if (result.isConfirmed) {
                    axios.put(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/notice/edit/${noticeIdx}`, {
                        noticeCategoryIdx, noticeTitle, noticeContent
                    })
                        .then(res => {
                            if (res.data === 1) {
                                Swal.fire({
                                    title: "📢 정상적으로\n수정되었습니다!",
                                    showConfirmButton: false,
                                    timer: 800
                                }).then(() => {
                                    history.push(`/notice/detail/${noticeIdx}`);
                                });
                            } else {
                                Swal.fire({
                                    text: "등록이 취소되었습니다☠️",
                                    showConfirmButton: false,
                                    timer: 800
                                });
                                return;
                            }
                        })
                        .catch(err => {
                            console.log(err);
                            Swal.fire("수정에 실패했습니다☠️")
                            return;
                        });
                }
            })
    };

    return (
        <div className="all">
            <Navi history={history} />
            <div className="notice-container">
                <div className="notice-header">
                    <div className="notice-main">
                        <div className="notice-logo">
                            <Link to={"/notice"}>
                                <img className="notice-img" src={notice1} alt="notice logo" />
                            </Link>
                        </div>
                        <p>COM:ON의 소식을 만나보세요</p>
                    </div>
                </div>

                <div className="edit-notice">
                    <form action="" method="POST" id="frm" name="frm">
                        <input type="hidden" name="noticeIdx" />
                        <div className="edit-top">
                            <div className="edit-category">
                                <div>
                                    <p className='write-header-title'>카테고리</p>
                                    <select className="select-category"
                                        id="category" name="category"
                                        value={noticeCategoryIdx}
                                        onChange={handlerChangeNoticeCategory}
                                    >
                                        {category &&
                                            category.map((category, index) => (
                                                <option key={index} value={category.noticeCategoryIdx}>
                                                    {category.noticeCategoryName}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                            </div>

                            <div className="edit-title">
                                <div>
                                    <p className='write-header-title'>제목</p>
                                    <input className="input-title"
                                        type="text" id="title" name="title" value={noticeTitle}
                                        onChange={handlerChangeTitle} />
                                </div>
                            </div>
                        </div>

                        <div>
                            <textarea className="edit-content" title="내용" id="contents" name="contents"
                                style={{ whiteSpace: "pre-line" }}
                                value={noticeContent}
                                onChange={handlerChangeContent}>
                            </textarea>
                        </div>

                        <div className="bottom-btn">
                            <input type="button" id="edit" value="수정"
                                className="edit-btn"
                                onClick={handlerClickEdit} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default NoticeEdit;
