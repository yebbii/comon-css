import axios from 'axios';
import { useEffect, useState } from 'react';

function ImageDetail({ match, history }) {
    console.log(">>>>>>>>>>" + match)
    const {id} = match.params;
    console.log(id)

    const [datas, setDatas] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/docker/${id}`)
            .then(response => {
                console.log(response);
                setDatas(response.data);
            })
            .catch(error => console.log(error));
    }, []);

    const handlerClickList = () => {
        history.push('/board');
    };

    return (
        <>
            <div className="container">
                <h2>웹 서버 상세</h2>
                <form action="" method="POST" id="frm" name="frm">
                    <table className="board_detail">
                    <tbody>
                    <tr>
                        <td>
                            <pre>
                            {
                                datas.map(data => {
                                    console.log(data);
                                    return data + "\n";
                                })
                            }
                            </pre>
                        </td>
                    </tr>
                    </tbody>
                    </table>
                </form>
                
                <input type="button" id="list"   className="btn" value="목록으로" onClick={handlerClickList} />
            </div>
        </>
    );
}

export default ImageDetail;