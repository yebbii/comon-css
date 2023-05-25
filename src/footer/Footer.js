import { useState, useEffect } from "react";
import '../css/footer.css'
import axios from "axios";
import { MdEmail, MdHeadphones } from "react-icons/md";
import { BsMegaphone, BsTelephoneFill } from "react-icons/bs";


const Footer = (props) => {

    const [noticeList, setNoticeList] = useState([]);

    const handlerClickNotice = () => {
        props.history.push(`/notice`);
    }

    useEffect(() => {
        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/notice/main`)
            .then(res => {
                setNoticeList(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    return (
        <>
            <div className="footer-top" />
            <div className="footer">
                <div className="footer-logo">
                    <div className="footer-logo-img"></div>
                </div>
                <div className="footer1">
                    <h2 className="title1"><MdHeadphones className="footer-icon" />고객센터</h2>
                    <p className="phone"><BsTelephoneFill className="footer-icon" />1664-2000</p>
                    <p className="email"><MdEmail className="footer-icon" />comon@com0n.com</p>
                    <p className="num"><span>상담전화</span> : 09:00 ~ 18:00 (평일)</p>
                    <p className="chat"><span>상담 톡</span> : 09:00 ~ 18:00 (평일)</p>
                </div>
                <div className="footer2">
                    <h2 className="title1"><BsMegaphone className="footer-icon" />공지사항</h2>
                    <div className='footer-notice-container'>
                        {
                            noticeList
                            &&
                            noticeList.map((notice, index) => (
                                <>
                                    <div className='notice'
                                        onClick={handlerClickNotice}
                                        key={index}>
                                        <span className='footer-notice-content'>{notice.registDt.substring(0, 10)}</span>
                                        <span className='footer-notice-category'>[{notice.noticeCategoryName}]</span>
                                        <span className='footer-notice-content'>{notice.noticeTitle}</span>
                                    </div>
                                </>
                            ))
                        }
                    </div>

                    <span className="grey">서울 종로구 인사동길12, 7층 </span>
                    <span className="grey">상호명 :주식회사 컴온 코리아</span>
                    <span className="grey">대표이사:윤주영</span>
                </div>
                <div className="copyright">2023 © COMON.CO.LTD.ALL RIGHTS RESERVED.</div>
            </div>
        </>
    );
}

export default Footer;