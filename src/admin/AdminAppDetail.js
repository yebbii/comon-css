import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import NaviAdmin from '../Navi/NaviAdmin';
import '../css/dev.css';
import jwtDecode from 'jwt-decode';
import Auth from './Auth';
import Swal from "sweetalert2";

const AdminAppDetail = ({ match, history }) => {

    const { imageidx } = match.params;

    const [data, setData] = useState({});
    const [authYn, setAuthYn] = useState(false);

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

        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/admin/applist/${imageidx}`,
            { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
            .then(res => {
                setData(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    // 카테고리 이름 설정
    const handlerSetCategoryName = () => {
        if (data.categoryIdx == 1) {
            return (
                <input type='text'
                    className='detailtext-inputbox'
                    value='LifeOn'
                    readOnly />
            );
        } else {
            return (
                <input type='text'
                    className='detailtext-inputbox'
                    value='WorkOn'
                    readOnly />
            );
        }
    };

    // icon 이미지 출력
    const iconImage = `http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/getimage/icon/${data.iconImage}`;

    // thumbnail 이미지 출력
    const thumbnailImage = `http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/getimage/thumbnail/${data.thumbnailImage}`;


    // 스크린샷 개수에 맞춰 이미지 출력
    const getScreenshotImage = () => {

        const img1 = data.screenshotImage1;
        const img2 = data.screenshotImage2;
        const img3 = data.screenshotImage3;
        const img4 = data.screenshotImage4;
        const img5 = data.screenshotImage5;
        const img6 = data.screenshotImage6;

        const imgArr = [img1, img2, img3, img4, img5, img6];

        return imgArr.map((img, index) =>
            img && <img className='screenshotImg' src={`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/getimage/screenshot/${img}`} key={index} />
        );
    };

    // 개발자가 등록한 yaml 파일 다운로드
    const handlerClickDownload = (filename) => {
        const url = `http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/download/${data.yamlFile}`
        const download = document.createElement('a');

        download.href = url;
        download.setAttribute('download', filename);
        download.setAttribute('type', 'application/json');
        download.click();
    };

    const handlerClickDelete = () => {

        new Swal({
            title: "정말 삭제하시겠습니까?",
            text: "한 번 삭제하면 복구가 불가능합니다.",
            showCancelButton: true,
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            dangerMode: true,
            reverseButtons: true
        })

            .then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/admin/registdelete/${imageidx}`,
                        { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
                        .then(res => {
                            Swal.fire({
                                text: `삭제 처리가 완료되었습니다.`,
                                showConfirmButton: false,
                                timer: 800
                            });
                            history.push('/admin');

                        })
                        .catch(err => {
                            console.log(err);
                            Swal.fire({
                                text: `삭제 처리 중 오류가 발생했습니다.`,
                                showConfirmButton: false,
                                timer: 800
                            });
                        })
                }
            })
    };

    return (
        <>
            {
                !authYn
                    ?
                    <Auth history={history} />
                    :
                    <div>
                        <NaviAdmin history={history} />
                        <div className='sidemenu_admin-box'>
                            <div className='admin_logo'></div>
                            <ul className='sidemenu_admin'>
                                <li><Link to='/admin/setting'>회원 관리</Link></li>
                                <li id='admin-setting'><Link to='/admin'>모든 앱</Link></li>
                                <li><Link to='/admin/judge'>심사</Link></li>
                                <li><Link to='/admin/chart'>통계</Link></li>
                            </ul>
                        </div>
                        <div className='body'>
                            <p className='body_title'>앱 관리</p>
                            <p className='body_subtitle'>앱 세부 정보</p>
                            <div className='detailform'>
                                <ol>
                                    <li className='detailform-each'>
                                        <p className='detailform-title'>카테고리</p>
                                        {handlerSetCategoryName()}
                                    </li>
                                    <li className='detailform-each'>
                                        <p className='detailform-title'>앱 이름</p>
                                        <input type='text'
                                            className='detailtext-inputbox'
                                            value={data.imageName}
                                            readOnly />
                                    </li>
                                    <li className='detailform-each'>
                                        <p className='detailform-title'>간단한 앱 설명</p>
                                        <input type='text'
                                            className='detailtext-inputbox'
                                            value={data.imageDescription}
                                            readOnly />
                                    </li>
                                    <li className='detailform-each'>
                                        <p className='detailform-title'>자세한 설명</p>
                                        <textarea type='text'
                                            className='detailtext-inputbox-description'
                                            value={data.imageDetail}
                                            readOnly />
                                    </li>
                                    <div className='img-container'>
                                        <div id='img-box'>
                                            <li className='imgform-each'>
                                                <p className='imgform-title1'>앱 아이콘 이미지 </p>
                                                <div className='icon-img-box'>
                                                    <img className='iconImg' src={iconImage} />
                                                </div>

                                            </li>
                                            <li className='imgform-each'>
                                                <p className='imgform-title1'>썸네일 이미지 </p>
                                                <div className='icon-img-box'>
                                                    <img className='thumbnailImg' src={thumbnailImage} />
                                                </div>
                                            </li>
                                        </div>
                                        <li className='sh-imgform-each'>
                                            <p className='imgform-title2'>스크린샷 이미지</p>
                                            <div className='sh-img-box'>
                                                <div className='screenshot-detail'>
                                                    {getScreenshotImage()}
                                                </div>
                                            </div>
                                        </li>
                                    </div>
                                    <li className='detailform-each'>
                                        <p className='fileform-title'>실행 파일 다운로드</p>
                                        <button className='file-button' type='button'
                                            onClick={handlerClickDownload}>다운로드</button>
                                    </li>
                                </ol>
                                <div className='button-box'>
                                    <button id="blackButton" type='button' onClick={handlerClickDelete}>삭제 처리</button>
                                </div>
                            </div>
                        </div>
                    </div>

            }
        </>

    )

}
export default AdminAppDetail;