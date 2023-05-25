import { useEffect, useState } from "react";
import axios from 'axios';
import './adminChart.css';
import jwtDecode from "jwt-decode";

const AppRankingList = ({ history }) => {

    const [appRankingList, setAppRankingList] = useState([]);
    const [authYn, setAuthYn] = useState(false);
    const handlerClick = (e) => {
        history.push(`/admin/chart/${e}`);
    }

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

        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/admin/chart/rankcount`,
            { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
            .then(res => {
                setAppRankingList(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);


    return (
        <div className="AppRankBox">
            <p className="AppRankBoxTitle">앱 인기 차트</p>
            <div className="AppRackContent">
                {appRankingList && appRankingList.map((data) => (
                    <div className="AppRankEach" onClick={() => handlerClick(data.imageIdx)}>
                        <div className="appRank-icon">
                            <img className='appRank-thumbnail'
                                src={`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/getimage/icon/${data.iconImage}`} />
                        </div>
                        
                        <div className="appRankEach-content-container">
                            <p className='appRank-imageName'>{data.imageName}</p>
                            <p className='appRank-devName'>{data.userName}</p>
                            <div className='appRank-downloadCount'>
                                <span className="appRank-dowbloadData">{data.downloadCount}</span>
                                <span className="appRank-dowbloadData2">건</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default AppRankingList;