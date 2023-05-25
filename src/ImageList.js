import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IconName, MdDeleteOutline, MdOutlineArticle, MdOutlinePlayCircle, MdOutlineStopCircle } from "react-icons/md";

const ImageList = ({ history }) => {

    const [datas, setDatas] = useState([]);
    const styles = {width: 24, height: 24, cursor: 'pointer'};
    
    // 최초 마운트 시 컨테이너 목록 조회 결과를 상태 변수의 값으로 설정
    useEffect(() => {
        axios.get('http://localhost:8080/api/docker')
            .then(response => {
                console.log(response);
                setDatas(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    // 새 창(탭)에서 컨테이너에 바인딩된 호스트 포트로 요청
    const handlerViewPage = (port) => {
        window.open(`http://localhost:${port}`)
    };

    // 삭제할 컨테이너의 이름을 파라미터로 전달
    const handlerDelete = (name) => {
        axios.delete(`http://localhost:8080/api/docker/${name}`)
        .then(response => {
            if (response.data.length == 0)
                return;

            alert(`${response.data} 이름의 웹 서버를 정상적으로 삭제했습니다.`);
            const newDatas = datas.filter(data => {
                data = JSON.parse(data);
                return data.Names != response.data;
            });
            setDatas(newDatas);
        })
        .catch(error => {
            console.log(error);
        });
    };

    return (
        <>
            <div className="container">
                <h2>웹 서버 목록</h2>
                <table className="board_list">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">IMAGE</th>
                            <th scope="col">COMMAND</th>
                            <th scope="col">CREATED</th>
                            <th scope="col">STATUS</th>
                            <th scope="col">PORTS</th>
                            <th scope="col">NAMES</th>
                            <th scope="col"></th>
                            
                            {/* 상세 내용 (필요 시 사용)
                            <th scope="col">Labels</th>
                            <th scope="col">LocalVolumes</th>
                            <th scope="col">Mounts</th>
                            <th scope="col">Networks</th>
                            <th scope="col">RunningFor</th>
                            <th scope="col">Size</th>
                            <th scope="col">State</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            datas.length === 0 && (
                                <tr>
                                    <td colSpan="14">웹 서버가 존재하지 않습니다.</td>
                                </tr>
                            )
                        }
                        {
                            datas && datas.map(data => {
                                const c = JSON.parse(data);
                                const port = c.Ports.split('-')[0].split(':')[1];
                                { console.log(c.Labels.includes("테스트 이름-yamlfile-1-docker-compose-chochocho"))}
                                return (
                                <tr key={c.ID}>
                                    <td>
                                        <Link to={`/image/detail/${c.ID}`}>{c.ID}</Link>
                                    </td>
                                    <td>{c.Image}</td>
                                    <td>{c.Command}</td>
                                    <td>{c.CreatedAt}</td>
                                    <td>{c.Status}</td>
                                    <td>{c.Ports}</td>
                                    <td>{c.Names}</td>
                                    <td>
                                        {/* 새창에서 웹 페이지 보기, 웹 서버 삭제 버튼 */}
                                        <MdOutlineArticle style={styles} onClick={() => handlerViewPage(port)} title="웹 페이지 보기" />
                                        <MdDeleteOutline style={styles} onClick={() => handlerDelete(c.Names)} title="웹 서버 삭제" />
                                    </td>
                                    
                                    {/* 상세 내용 (필요 시 사용)
                                    <td>{c.Labels}</td>
                                    <td>{c.LocalVolumes}</td>
                                    <td>{c.Mounts}</td>
                                    <td>{c.Networks}</td>
                                    <td>{c.RunningFor}</td>
                                    <td>{c.Size}</td>
                                    <td>{c.State}</td>*/}
                                </tr>
                            )
                            })
                        }
                    </tbody>
                </table>
                <Link to="/image/write" className="btn">웹 서버 생성</Link>
            </div>
        </>
    );
};

export default ImageList;