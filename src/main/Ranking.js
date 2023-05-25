const Ranking = ({ rankingList, history }) => {

    const handlerClickDetail = (e) => {
        history.push(`/user/appdetail/${e}`)
    };

    return (
        <div className='rank'>
            {rankingList
                &&
                rankingList.map((data, index) => (
                    <>
                        <div className='rank-each'
                            onClick={() => handlerClickDetail(data.imageIdx)}
                            key={index}>
                            <div className='rank-header'>
                                <div id='clearfix'>
                                    <div className='rank-header-round-left'></div>
                                    <div className='rank-header-round-right'></div>
                                </div>
                            </div>
                            <img src={`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/getimage/thumbnail/${data.thumbnailImage}`} />
                            <div className='rank-image-description'>
                                <p className='rank-imagename'>{data.imageName}</p>
                                <p className='rank-devname'>{data.userName}</p>
                                <p className='rank-description'>{data.imageDescription}</p>
                            </div>
                            <div className="rank-detail">
                                <button className="rank-detailBtn">상세보기</button>
                            </div>
                        </div>
                    </>
                ))}
        </div>
    );
}
export default Ranking;