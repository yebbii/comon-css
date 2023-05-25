import axios from 'axios';
import { useEffect, useState } from 'react';

function ImageWrite({ match, history }) {
    const {id} = match.params;

    const [datas, setDatas] = useState([]);
    const [imageName, setImageName] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:8080/api/docker/${id}`)
            .then(response => {
                console.log(response);
                setDatas(response.data);
            })
            .catch(error => console.log(error));
    }, []);

    const handlerClickSubmit = () => {
        axios.post(`http://localhost:8080/api/docker/write`, 
        {
            imageName: imageName
        })
        .then(response => {
            console.log(response);
            history.push('/list');
        })
        .catch(error => console.log(error));
    };

    const handlerChangeImageName = (e) => {
        setImageName(e.target.value);
    };



    return (
        <>
            <div className="container">
                <h2>웹 서버 상세</h2>
                <form action="" method="POST" id="frm" name="frm">
                    <textarea type="text" 
                            name="id" 
                            id="id" 
                            value={imageName}
                            onChange={handlerChangeImageName} />
                </form>
                
                <input type="button" id="list"   className="btn" value="등록" onClick={handlerClickSubmit} />
            </div>
        </>
    );
}

export default ImageWrite;