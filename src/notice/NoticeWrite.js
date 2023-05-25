import axios from "axios";
import { useEffect, useState } from "react";
import notice1 from "./notice1.png";
import "../css/notice.css";
import { Link } from "react-router-dom";
import Auth from "../admin/Auth";
import jwtDecode from 'jwt-decode';
import Navi from "../Navi/Navi";
import Swal from "sweetalert2";

const NoticeWrite = ({ history }) => {
  const [category, setCategory] = useState([]);
  const [noticeCategoryIdx, setNoticeCategoryIdx] = useState(1);
  const [noticeTitle, setNoticeTitle] = useState("");
  const [noticeContent, setNoticeContent] = useState("");
  const [authYn, setAuthYn] = useState(false);

  const handleChangeCategory = (e) => setNoticeCategoryIdx(e.target.value);
  const handlerChangeTitle = (e) => setNoticeTitle(e.target.value);
  const handlerChangeContent = (e) => setNoticeContent(e.target.value);

  useEffect(() => {

    const token = sessionStorage.getItem('token');
    const decode_token = jwtDecode(token);
    let authIdx = decode_token.authIdx;
    console.log(authIdx);

    if (authIdx == '3') {
      setAuthYn(true);
    } else {
      setAuthYn(false);
    }

    axios
      .get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/notice/category`)
      .then((res) => {
        setCategory(res.data);
        setNoticeCategoryIdx(1);
      })
      .catch((error) => console.log(error));
  }, []);

  const handlerSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/notice/write`, {
        noticeCategoryIdx, noticeTitle, noticeContent
      })
      .then((res) => {
        if (res.data === '정상처리') {
          Swal.fire({
            title: '게시글 등록',
            text: '📢 게시글이 정상적으로\n등록되었습니다.',
            showConfirmButton: false,
            timer: 800
          }).then(() => {
            history.push('/notice');
          });
        } else {
          Swal.fire({
            text: '게시글 등록 실패☠️',
            showConfirmButton: false,
            timer: 800
          });
        }
      })
      .catch((err) => {
        alert(`게시글 등록에 실패했습니다☠️ (${err.message})`);
        return;
      });
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
            <p> COM:ON의 소식을 만나보세요 </p>
          </div>
        </div>

        {
          authYn
            ?
            <div className="write">
              <div className="write-top">

                <div className="write-category">
                  <p className='write-header-title'>카테고리</p>
                  <select className="select-category" id="category" name="category" onChange={handleChangeCategory}>
                    {category &&
                      category.map((category, index) => (
                        <option className="option-category" key={index} value={category.noticeCategoryIdx}>
                          {category.noticeCategoryName}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="write-title">
                  <div>
                    <p className='write-header-title'>제목</p>
                    <input className="input-title" type="text" value={noticeTitle} onChange={handlerChangeTitle} placeholder="제목을 입력해주세요" />
                  </div>
                </div>
              </div>

              <div>
                <textarea className="write-content" value={noticeContent} onChange={handlerChangeContent}></textarea>
              </div>

              <div className="write-btn">
                <input type="submit" className="save-btn" value="제출" onClick={handlerSubmit} />
              </div>
            </div>
            :
            <Auth />
        }
      </div>
    </div>

  )

}
export default NoticeWrite;