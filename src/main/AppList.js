import Navi from "../Navi/Navi";
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { AiFillStar } from 'react-icons/ai';
import '../css/appList.css';

const AppList = ({ history }) => {

    const [categoryActive, setCategoryActive] = useState(0);
    const [data, setData] = useState([]);
    const [starAverage, setStarAverage] = useState({});
    const [orderActive, setOrderActive] = useState(0);

    useEffect(() => {
        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/user/applist`)
            .then(res => {
                setData(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    useEffect(() => {
        data.forEach((item) => {
            starAvg(item.imageIdx);
        });
    }, [data]);

    // 카테고리 버튼 출력 및 토글 기능
    const categoryList = ['ALL', 'Life:ON', 'Work:ON'];

    const categoryButton = () => {
        const result = [];

        for (let i = 0; i < categoryList.length; i++) {
            result.push(
                <>
                    <button className={categoryActive == i ? 'categoryActive' : 'categoryUnActive'}
                        onClick={toggleCategoryButton}
                        id={i}
                        key={i}>{categoryList[i]}</button>
                </>
            )
        } return result;
    };

    // 카테고리 버튼 선택에 따른 리스트 변경
    const toggleCategoryButton = (e) => {
        setCategoryActive(e.target.id);

        if (e.target.id == 0) {
            axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/user/applist`)
                .then(res => {
                    setData(res.data);
                })
                .catch(err => {
                    console.log(err);
                })
        } else if (e.target.id == 1) {
            axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/user/applist/1`)
                .then(res => {
                    setData(res.data);
                })
                .catch(err => {
                    console.log(err);
                })
        } else if (e.target.id == 2) {
            axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/user/applist/2`)
                .then(res => {
                    setData(res.data);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    };

    // 앱별 별점 출력 기능
    const starAvg = (e) => {
        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/user/applist/average/${e}`)
            .then(res => {
                setStarAverage((prev) => ({ ...prev, [e]: res.data }));
            })
            .catch(err => {
                console.log(err);
            })
    };

    const handlerClickAppDetail = (e) => {
        history.push(`/user/appdetail/${e}`)
    };

    // 앱 정렬 리스트
    const orderList = ['인기순', '최신순', '가나다순'];

    // 앱 정렬 버튼 출력
    const orderButton = () => {
        const result = [];

        for (let i = 0; i < orderList.length; i++) {
            result.push(
                <>
                    <div className="radioInput">
                        <input
                            id={orderList[i]}
                            value={i}
                            type='radio'
                            checked={orderActive == i}
                            onChange={handleChangeOrderButton}
                            key={i}
                        />
                        {orderList[i]}
                    </div>
                </>
            )
        } return result;
    };

    const handleChangeOrderButton = (e) => {
        e.preventDefault();
        setOrderActive(e.target.value);

        if (e.target.value == 0) {
            axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/user/applist/count`)
                .then(res => {
                    setData(res.data);
                })
                .catch(err => {
                    console.log(err);
                })
        } else if (e.target.value == 1) {
            axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/user/applist/registdt`)
                .then(res => {
                    setData(res.data);
                })
                .catch(err => {
                    console.log(err);
                })
        } else {
            axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/user/applist/order`)
                .then(res => {
                    setData(res.data);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    };

    return (
        <>
            <Navi history={history} />
            <div className='applist-back'>
                <div className='applist-header'>
                    <div className='applist-thumbnail'>
                        <div className="ani-logo">
                            <div className="ani-logo-move" />
                        </div>
                        <div className="applist-header-container">
                            <div className="applist-title-box1" />
                            <div className="applist-title-box2" />
                            <div className="applist-title-box3" />
                            <div className="applist-title-box4">
                                <p><span>COM:ON</span>의 앱 스토어를 만나 보세요!</p>
                            </div>
                        </div>
                    </div>
                    <div className='categoryButton'>
                        {categoryButton()}
                    </div>
                </div>
                <div className='order-radio'>
                    {orderButton()}
                </div>
                <div className='applist'>
                    {
                        data
                        &&
                        data.map(((data, index) =>
                            <>
                                <div className='applist-each'
                                    onClick={() => handlerClickAppDetail(data.imageIdx)}
                                    key={index}>
                                    <div className='applist-image-box'>
                                        <img className='applist-each-thumbnail'
                                            src={`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/getimage/thumbnail/${data.thumbnailImage}`} />
                                    </div>
                                    <div className='applist-description'>
                                        <div id="applist-description-box">
                                            <img className='applist-each-icon'
                                                src={`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/getimage/icon/${data.iconImage}`} />
                                            <div className='applist-description-text'>
                                                <p className='applist-description-name'>{data.imageName}</p>
                                                <p className='applist-description-detail'>{data.imageDescription}</p>
                                            </div>
                                            <div className='star'>
                                                {starAverage[data.imageIdx] && (
                                                    <p className='star-avg'>
                                                        <AiFillStar className='star-logo' />{starAverage[data.imageIdx].toFixed(1)}
                                                    </p>

                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>))
                    }
                </div>
            </div>
        </>);
}

export default AppList;