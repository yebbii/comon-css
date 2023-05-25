import '../../css/dev.css';
import jwtDecode from 'jwt-decode';
import Auth from '../Auth';
import NaviAdmin from '../../Navi/NaviAdmin';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useState } from 'react';
import MonthlyCount from './MonthlyCount';
import AppRankingList from './AppRankingList';
import PieChart from './PieChart';
import TotalAppDownload from './TotalAppDownload';
import MainCount from './MainCount';

const AdminChart = ({ match, history }) => {

    const [authYn, setAuthYn] = useState(false);

    return (
        <div id='adminChart-container' >
            <NaviAdmin history={history} />
            <div className='sidemenu_admin-box'>
                <div className='admin_logo'></div>
                <ul className='sidemenu_admin'>
                    <li><Link to='/admin/setting'>회원 관리</Link></li>
                    <li><Link to='/admin'>모든 앱</Link></li>
                    <li><Link to='/admin/judge'>심사</Link></li>
                    <li id='admin-setting'><Link to='/admin/chart'>통계</Link></li>
                </ul>
            </div>
            
            <div className='adminChart-box'>
                <p className='body_title'>통계</p>
                <p className='body_subtitle'></p>
                <div className='detailform'>
                    <span className='TotalAppCount'>
                        <MainCount />
                    </span>
                    <div className='chartBox'>
                        <div className='chartBox1'>
                            <TotalAppDownload />
                        </div>
                        <div className='chartBox2'>
                            <PieChart />
                            <AppRankingList history={history} />
                        </div>
                        <div className='chartBox1'>
                            <MonthlyCount />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default AdminChart;