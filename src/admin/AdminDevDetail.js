import { useEffect, useState } from "react";
import NaviAdmin from "../Navi/NaviAdmin";
import axios from "axios";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { TbHomeMove } from "react-icons/tb";

const AdminDevDetail = ({ history, match }) => {

    const { userId } = match.params;
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/dev/applist/${userId}`,
            { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
            .then(res => {
                setData(res.data.list1);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    // 넘어온 데이터를 사용해 테이블 생성
    const createTable = () => {
        return data.map((d, index) => {
            let categoryName = '';
            if (d.categoryIdx == '1') {
                categoryName = 'Life:On'
            } else if (d.categoryIdx == '2') {
                categoryName = 'Work:On'
            }

            return (
                <>
                    <tr>
                        <td><img src={`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/getimage/icon/${d.iconImage}`}
                            style={{ width: '80px', height: '80px' }}
                            key={index} /></td>
                        <td>{d.imageName}</td>
                        <td>{categoryName}</td>
                        <td>{d.registDt.substring(0, 10)}</td>
                        <td>{d.downloadCount}</td>
                    </tr>
                </>
            )
        })
    };

    const handlerClickList = () => {
        history.push(`/admin/setting`);
    };

    return (
        <>
            <div>
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
                    <p className='body_title'>개발자 관리-{userId}
                        <TbHomeMove className="back-icon" onClick={handlerClickList} title="목록으로" />
                    </p>
                    <div className='AppSerch' />
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
                                <th>앱 아이콘</th>
                                <td>앱 이름</td>
                                <td>카테고리</td>
                                <td>출시일</td>
                                <td>다운로드 수</td>
                            </tr>
                        </thead>
                        <tbody>
                            {createTable()}
                        </tbody>
                    </table>
                </div>

            </div>

        </>
    );
}

export default AdminDevDetail;