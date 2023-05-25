import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import NoticeCategory from "./NoticeCategory";
import "../css/notice.css";
import notice1 from "./notice1.png";
import Navi from '../Navi/Navi';
import jwtDecode from 'jwt-decode';
import { FaAngleDown } from "react-icons/fa";
import { TbSpeakerphone } from "react-icons/tb";

const NoticeList = ({ history }) => {
    const [noticeList, setNoticeList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [categoryList, setCategoryList] = useState([]);
    const [authYn, setAuthYn] = useState(false);
    const [categoryName, setCategoyName] = useState('전체');

    useEffect(() => {
        if (sessionStorage.getItem('token') == null) {
            setAuthYn(false);
        } else {
            const token = sessionStorage.getItem('token');
            const decode_token = jwtDecode(token);
            let authIdx = decode_token.authIdx;

            if (authIdx == '3') {
                setAuthYn(true);
            } else {
                setAuthYn(false);
            }
        }
        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/notice?currentPage=${currentPage}`)
            .then((response) => {
                setNoticeList(response.data.list);
                setTotalPages(response.data.pageCount);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [currentPage]);

    useEffect(() => {
        axios
            .get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/notice/category`)
            .then((response) => {
                const newData = [{ noticeCategoryIdx: 0, noticeCategoryName: '전체' }, ...response.data];
                setCategoryList(newData);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handlePageClick = (e) => {
        const page = Number(e.target.getAttribute("data-page"));
        setCurrentPage(page);
    };

    const handleCategorySelect = (e) => {
        setSelectedCategory(e.target.value);
        setCategoyName(e.target.outerText);
        toggleDropdownVisibility();
        if (e.target.value == '0') {
            axios
                .get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/notice?currentPage=${currentPage}`)
                .then((response) => {
                    setNoticeList(response.data.list);
                    setTotalPages(response.data.pageCount);
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            axios
                .get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/notice/category/${e.target.value}`)
                .then((res) => {
                    setNoticeList(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    const toggleDropdownVisibility = () => {
        setIsDropdownVisible((prevState) => !prevState);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <span
                    className={currentPage === i ? "active" : ""}
                    key={i}
                    data-page={i}
                    onClick={handlePageClick}
                >
                    {i}
                </span>
            );
        }
        return <div className="paging-numbers">{pageNumbers}</div>;
    };

    const createCategoryList = () => {
        return categoryList &&
            categoryList.map((cat, index) => {
                return (
                    <li type='text'
                        key={index}
                        value={cat.noticeCategoryIdx}
                        onClick={handleCategorySelect}
                        readOnly>{cat.noticeCategoryName}</li>
                );
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

                    <div className="notice-dropdown">
                        <div className="notice-drop-container">
                            <input id="dropdown" type="checkbox" />
                            <label className="notice-dropdownLabel" htmlFor="dropdown"
                                onClick={() => setIsDropdownVisible(true)}
                            >
                                <div>{categoryName}</div>
                                <FaAngleDown className="caretIcon" />
                            </label>
                            <div className="content">
                                {isDropdownVisible &&
                                    <ul>
                                        {createCategoryList()}
                                    </ul>
                                }
                            </div>
                        </div>
                    </div>

                    <div>
                        {
                            authYn
                            &&
                            <Link to={"/notice/write"} className="list-btn">
                                <TbSpeakerphone className="wirte-icon" /> 공지 등록
                            </Link>
                        }
                    </div>
                </div>

                <table className="notice-list">
                    <colgroup>
                        <col width="10%" />
                        <col width="*" />
                        <col width="20%" />
                    </colgroup>

                    <thead>
                        <tr>
                            <th scope="col">카테고리</th>
                            <th scope="col">제목</th>
                            <th scope="col">작성일</th>
                        </tr>
                    </thead>

                    <tbody>
                        {noticeList &&
                            noticeList.map((notice) => (
                                <tr key={notice.noticeIdx}>
                                    <td> {notice.noticeCategoryName} </td>
                                    <td>
                                        <p>
                                            <Link to={`/notice/detail/${notice.noticeIdx}`}>
                                                {notice.noticeTitle}
                                            </Link>
                                        </p>
                                    </td>
                                    <td>{moment(notice.registDt).format("YYYY-MM-DD")}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>

                <div className="paging"> {renderPageNumbers()} </div>
            </div>
        </div>
    );
};

export default NoticeList;
