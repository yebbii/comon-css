import { Link } from 'react-router-dom';
import NaviAdmin from '../Navi/NaviAdmin';
import '../css/dev.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FcSettings } from 'react-icons/fc';
import jwtDecode from 'jwt-decode';
import Auth from './Auth';
import { MdSettingsSuggest } from "react-icons/md";


const AdminSetting = ({ history }) => {

    const [userData, setUserData] = useState([]);
    const [devData, setDevData] = useState([]);
    const [filterActive, setFilterActive] = useState(1);
    const [authYn, setAuthYn] = useState(true);

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

        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/admin/setting`,
            { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
            .then(res => {
                setUserData(res.data.userList);
                setDevData(res.data.devList);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    const filterList = ['', '전체', '사용자', '개발자'];

    const filterButton = () => {
        const result = [];
        for (let i = 1; i < filterList.length; i++) {
            result.push(
                <>
                    <button className={filterActive == i ? 'filterActive' : 'filterUnActive'}
                        onClick={toggleFilterButton}
                        id={i} >{filterList[i]}</button>
                </>
            )
        } return result;
    };

    const toggleFilterButton = (e) => {

        setFilterActive(e.target.id);

        if (e.target.id == 1) {
            axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/admin/setting`,
                { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
                .then(res => {
                    setUserData(res.data.userList);
                    setDevData(res.data.devList);
                })
                .catch(err => {
                    console.log(err);
                })
        } else if (e.target.id == 2) {
            setUserData(null);
            setDevData(null);
            axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/admin/setting`,
                { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
                .then(res => {
                    setUserData(res.data.userList);
                })
                .catch(err => {
                    console.log(err);
                })
        } else if (e.target.id == 3) {
            setUserData(null);
            setDevData(null);
            axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/admin/setting`,
                { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
                .then(res => {
                    setDevData(res.data.devList);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    };

    const handlerClickUserDetail = (e) => {
        history.push(`/admin/userdetail/${e}`);
    };

    const handlerClickDevDetail = (e) => {
        history.push(`/admin/devdetail/${e}`);
    };

    return (
        <>
            {
                !authYn
                    ?
                    <Auth history={history} />
                    :
                    <div className='dev-container'>
                        <NaviAdmin history={history} />
                        <div className='sidemenu_admin-box'>
                            <div className='admin_logo'></div>
                            <ul className='sidemenu_admin'>
                                <li id='admin-setting'><Link to='/admin/setting'>회원 관리</Link></li>
                                <li><Link to='/admin'>모든 앱</Link></li>
                                <li><Link to='/admin/judge'>심사</Link></li>
                                <li><Link to='/admin/chart'>통계</Link></li>
                            </ul>
                        </div>

                        <div className='body'>
                            <p className='body_title'>회원 관리</p>
                            <div className='filterSetButton'>
                                {filterButton()}

                            </div>
                            <table className='AppTable'>
                                <colgroup>
                                    <col width="21%" />
                                    <col width="21%" />
                                    <col width="21%" />
                                    <col width="21%" />
                                    <col width="15%" />
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <td>NAME</td>
                                        <td>E-MAIL</td>
                                        <td>AUTH</td>
                                        <td>SET</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        userData &&
                                        userData.map(data => {
                                            return (
                                                <tr key={data.userIdx}>
                                                    <td>{data.userId}</td>
                                                    <td>{data.userName}</td>
                                                    <td>{data.userEmail}</td>
                                                    <td>
                                                        {data.authIdx === 1 ? (
                                                            <p>Admin</p>)
                                                            :
                                                            (<p>사용자</p>
                                                            )}
                                                    </td>
                                                    <td><MdSettingsSuggest onClick={() => handlerClickUserDetail(data.userId)}
                                                        className='admin-auth-seticon' /></td>
                                                </tr>
                                            )
                                        })
                                    }
                                    {
                                        devData &&
                                        devData.map(data => {
                                            return (
                                                <tr key={data.userIdx}>
                                                    <td>{data.userId}</td>
                                                    <td>{data.userName}</td>
                                                    <td>{data.userEmail}</td>
                                                    <td>개발자</td>
                                                    <td><MdSettingsSuggest onClick={() => handlerClickDevDetail(data.userId)}
                                                        className='admin-auth-seticon' /></td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
            }
        </>
    )
}
export default AdminSetting;