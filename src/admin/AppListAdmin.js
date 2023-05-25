import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import NaviAdmin from '../Navi/NaviAdmin';
import '../css/dev.css';
import { BiSearchAlt } from "react-icons/bi";
import jwtDecode from 'jwt-decode';
import Auth from './Auth';


const AppListAdmin = ({ history }) => {

    const [data, setData] = useState([]);
    const [filterActive, setFilterActive] = useState(1);
    const [search, setSearch] = useState('');
    const [authYn, setAuthYn] = useState(false);

    useEffect(() => {
        if (sessionStorage.getItem('token') == null) {
            setAuthYn(false);
        } else {
            const token = sessionStorage.getItem('token');
            const decode_token = jwtDecode(token);
            let authIdx = decode_token.authIdx;
            console.log(authIdx);
            if (authIdx === 3) {
                setAuthYn(true);
            } else {
                setAuthYn(false);
            }
        }

        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/admin/applist`,
            { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
            .then(res => {
                setData(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    const filterList = ['', '전체 보기', '서비스 중', '삭제 신청', '서비스 종료'];

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

    const createTable = () => {
        if (!Array.isArray(data)) {
            return null;
        }
        return data.map((d, index) => {
            let statusName = '';
            if (d.statusIdx == '1') {
                statusName = '등록';
            } else if (d.statusIdx == '2') {
                statusName = '심사 중';
            } else if (d.statusIdx == '3') {
                statusName = '심사 거절';
            } else if (d.statusIdx == '4') {
                statusName = '출시';
            } else if (d.statusIdx == '5') {
                statusName = '삭제 요청'
            } else if (d.statusIdx == '6') {
                statusName = '서비스 종료'
            }

            let denyName = '';
            if (d.denyIdx == '1') {
                denyName = '이미지 규격이 맞지 않음';
            } else if (d.denyIdx == '2') {
                denyName = '볼륨 설정이 옳지 않음.';
            } else if (d.denyIdx == '3') {
                denyName = '실행을 위한 이미지가 존재하지 않음.';
            } else if (d.denyIdx == '4') {
                denyName = '실행 파일(docker-compose.yaml) 형식이 맞지 않음.';
            } else if (d.denyIdx == '5') {
                denyName = '실행 포트가 올바르게 설정되지 않음.'
            } else if (d.denyIdx == '0') {
                denyName = '';
            }

            const registDt = () => {
                let appRegistDt = '';
                if (d.registDt != null) {
                    appRegistDt = d.registDt.substring(0, 10);
                }
                return <td>{appRegistDt}</td>
            }

            return (
                <tr key={index}
                    onClick={() => handlerClickImage(d.imageIdx)}>
                    <td><img src={`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/getimage/icon/${d.iconImage}`} /></td>
                    <td>{d.imageName}</td>
                    <td>
                        {statusName} <br />
                        <p className="denyCode">{denyName}</p>
                    </td>
                    <td>{d.userName}</td>
                    {registDt()}
                    <td>
                        {d.statusIdx === 5 ?
                            <p>삭제 요청 접수됨</p>
                            : null}
                    </td>
                </tr>
            )
        })
    };

    const handlerClickImage = (e) => {
        history.push(`/admin/appdetail/${e}`);
    };

    const toggleFilterButton = (e) => {

        setFilterActive(e.target.id);

        if (e.target.id == 1) {
            axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/admin/applist`,
                { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
                .then(res => {
                    setData(res.data);
                })
                .catch(err => {
                    console.log(err);
                })
        } else if (e.target.id == 2) {
            axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/admin/applist/onservice`,
                { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
                .then(res => {
                    setData(res.data);
                })
                .catch(err => {
                    console.log(err);
                })
        } else if (e.target.id == 3) {
            axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/admin/applist/registdelete`,
                { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
                .then(res => {
                    setData(res.data);
                })
                .catch(err => {
                    console.log(err);
                })
        } else if (e.target.id == 4) {
            axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/admin/applist/delete`,
                { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
                .then(res => {
                    setData(res.data);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }
    // 앱 검색 기능
    const onChangeSearch = (e) => {
        e.preventDefault();
        setSearch(e.target.value);
    };

    const onSearch = e => {
        e.preventDefault();
        if (search === null || search === '') {
            axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/admin/applist`,
                { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
                .then(res => {
                    setData(res.data);
                })
        } else {
            const filterData = data.filter((row) => row.imageName.includes(search));
            setData(filterData);
        }
        setSearch('')
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
                            <p className='body_title'>모든 앱</p>
                            <div className='AppSerch'>
                                <div className='filterAppButton'>
                                    {filterButton()}
                                </div>
                                <form id='serch-container' onSubmit={e => onSearch(e)}>
                                    <input className='serch-box'
                                        type='text'
                                        value={search}
                                        placeholder='앱 이름을 검색하세요.'
                                        onChange={onChangeSearch} />
                                    <button id="serch-button" type='submit'><BiSearchAlt className='search-icon' /></button>
                                </form>
                            </div>
                            <table className='AppTable'>
                                <thead>
                                    <tr>
                                        <th>아이콘</th>
                                        <th>앱 이름</th>
                                        <th>상태</th>
                                        <th>서비스 제공사</th>
                                        <th>출시일</th>
                                        <th>삭제 요청</th>
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

export default AppListAdmin;