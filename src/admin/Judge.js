import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import NaviAdmin from '../Navi/NaviAdmin';
import '../css/dev.css';
import jwtDecode from 'jwt-decode';
import Auth from './Auth';

const Judge = ({ history }) => {

    const [data, setData] = useState([{}, {}, {}]);
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

        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/admin/applist/regist`,
            { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
            .then(res => {
                setData(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    const createTable = () => {
        return data && data.map((d, index) => {
            let categoryName = '';
            if (d.categoryIdx == '1') {
                categoryName = 'Life:On'
            } else if (d.categoryIdx == '2') {
                categoryName = 'Work:On'
            }
            return (
                <tr key={index}
                    onClick={() => handlerClickImage(d.imageIdx)}>
                    <td>
                        <img src={`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/getimage/icon/${d.iconImage}`} style={{ width: '80px', height: '80px' }} />
                    </td>
                    <td>{d.imageName}</td>
                    <td>{categoryName}</td>
                    <td>{d.userName}</td>
                </tr>
            )
        })
    };

    const handlerClickImage = (e) => {
        history.push(`/admin/judge/${e}`);
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
                                <li><Link to='/admin'>모든 앱</Link></li>
                                <li id='admin-setting'><Link to='/admin/judge'>심사</Link></li>
                                <li><Link to='/admin/chart'>통계</Link></li>
                            </ul>
                        </div>

                        <div className='body'>
                            <p className='body_title'>심사 요청</p>
                            <p className='body_subtitle'>심사 요청 앱 리스트</p>
                            <table className='AppTable'>
                                <colgroup>
                                    <col width="10%" />
                                    <col width="30%" />
                                    <col width="30%" />
                                    <col width="20%" />

                                </colgroup>
                                <thead>
                                    <tr>
                                        <th>아이콘</th>
                                        <th>앱 이름</th>
                                        <th>카테고리</th>
                                        <th>개발자 정보</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {createTable()}
                                </tbody>

                            </table>
                        </div>
                    </div>
            }
        </>
    )
}
export default Judge;