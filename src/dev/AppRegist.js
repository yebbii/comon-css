import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/dev.css';
import NaviDev from '../Navi/NaviDev';
import Auth from '../admin/Auth';
import Swal from "sweetalert2";

const AppRegist = ({ history }) => {

    const [imageFiles, setImageFiles] = useState([]);
    const [imageName, setImageName] = useState('');
    const [imageDescription, setImageDescription] = useState('');
    const [imageDetail, setImageDetail] = useState('');
    const [yamlFile, setYamlFile] = useState([]);
    const [screenshotImgs, setScreenshotImgs] = useState('');
    const [iconImage, setIconImage] = useState('');
    const [thumbnailImage, setThumbnailImage] = useState('');
    const [userIdx, setUserIdx] = useState('');
    const [categoryIdx, setCategoryIdx] = useState(1);
    const [categoryActive, setCategoryActive] = useState(1);
    const [authYn, setAuthYn] = useState(false);

    // 제한할 파일의 크기
    const MAX_FILE_SIZE = 1 * 1024 * 1024; //1MB
    // 제한할 파일의 개수
    const MAX_FILE_COUNT = 6;

    // 앱 등록을 시도하기 전 devIdx값 조회
    useEffect(() => {
        const token = sessionStorage.getItem('token');
        const decode_token = jwtDecode(token)
        let userId = decode_token.sub;
        let authIdx = decode_token.authIdx;

        if (authIdx === 3 || authIdx === 2) {
            setAuthYn(true);
        } else {
            setAuthYn(false);
        }

        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/dev/getidx/${userId}`,
            { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
            .then(res => {
                setUserIdx(res.data);
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    const handlerChangeImageName = e => setImageName(e.target.value);
    const handlerChangeImageDescription = e => setImageDescription(e.target.value);
    const handlerChangeImageDetail = e => setImageDetail(e.target.value);

    const categoryList = ['', 'Life:On', 'Work:On'];

    // 카테고리 토글 버튼
    const categoryButton = () => {
        console.log(categoryList);

        const result = [];
        for (let i = 1; i < categoryList.length; i++) {
            result.push(
                <>
                    <button className={categoryActive == i ? 'categoryActive' : 'categoryUnActive'}
                        onClick={toggleCategoryButton}
                        id={i}>{categoryList[i]}</button>
                </>
            )
        } return result;
    };

    const toggleCategoryButton = (e) => {
        console.log(e.target.id);
        e.preventDefault();
        setCategoryActive(e.target.id);
        setCategoryIdx(e.target.id);
        console.log(categoryActive);
    };

    const inputFiles1 = useRef();
    const inputFiles2 = useRef();
    const inputFiles3 = useRef();
    const inputFiles4 = useRef();

    const invalidFile = msg => {
        alert(msg);
        inputFiles1.current.value = '';
        inputFiles2.current.value = '';
        inputFiles3.current.value = '';
        setImageFiles([]);
    };

    // 아이콘, 썸네일, 스크린샷 이미지 변경 이벤트 핸들러
    const handleChangeFile = e => {
        console.log(e.target.name);
        const name = e.target.name;
        // input type file에서 name에 해당
        const files = e.target.files;
        // input type file에서 선택된 file 정보

        // 이미지 미리보기를 위한 로직
        // 스크린샷에만 적용됨
        if (e.target.name == 'iconimage') {
            const imageArr = e.target.files;
            let imageURLs = [];
            let image;
            let imagesLength = imageArr.length > 6 ? 6 : imageArr.length;

            for (let i = 0; i < imagesLength; i++) {
                image = imageArr[i];

                const reader = new FileReader();
                reader.onload = () => {
                    console.log(reader.result);
                    imageURLs[i] = reader.result;
                    setIconImage([...imageURLs]);
                };
                reader.readAsDataURL(image);
            }
            console.log(imageArr);
        }

        if (e.target.name == 'thumbnailimage') {
            const imageArr = e.target.files;
            let imageURLs = [];
            let image;
            let imagesLength = imageArr.length > 6 ? 6 : imageArr.length;

            for (let i = 0; i < imagesLength; i++) {
                image = imageArr[i];

                const reader = new FileReader();
                reader.onload = () => {
                    console.log(reader.result);
                    imageURLs[i] = reader.result;
                    setThumbnailImage([...imageURLs]);
                };
                reader.readAsDataURL(image);
            }
            console.log(imageArr);
        }

        if (e.target.name == 'screenshotimage') {
            const imageArr = e.target.files;
            let imageURLs = [];
            let image;
            let imagesLength = imageArr.length > 6 ? 6 : imageArr.length;

            for (let i = 0; i < imagesLength; i++) {
                image = imageArr[i];

                const reader = new FileReader();
                reader.onload = () => {
                    console.log(reader.result);
                    imageURLs[i] = reader.result;
                    setScreenshotImgs([...imageURLs]);
                };
                reader.readAsDataURL(image);
            }
            console.log(imageArr);
        }

        if (files.length > MAX_FILE_COUNT) {
            Swal.fire({ text: "이미지는 최대 6개 까지 업로드가 가능합니다." });
            return;
        }
        for (let i = 0; i < files.length; i++) {
            if (!files[i].type.match("image/.*")) {
                Swal.fire({ text: "이미지 파일만 업로드 가능합니다." });
                return;
            } else if (files[i].size > MAX_FILE_SIZE) {
                Swal.fire({ text: "이미지 크기는 1MB를 초과할 수 없습니다." });
                return;
            }
        }

        // 변경되지 않은 {이름, 파일 정보}를 담고 있는 변수
        const unchangedImageFiles = imageFiles.filter(file => file.name !== name)
        setImageFiles([...unchangedImageFiles, { name, files }]);
    };

    // yaml 파일 변경 이벤트 핸들러
    const handleChangeYamlFile = e => {
        const name = e.target.name;
        const files = e.target.files;
        console.log(files);
        setYamlFile(e.target.files);

        if (files.length > 1) {
            Swal.fire({ text: '실행 파일은 1개만 등록할 수 있습니다.' });
            inputFiles4.current.value = '';
            setYamlFile([]);
        }
    };

    let datas = {
        imageName,
        imageDescription,
        imageDetail,
        categoryIdx,
        userIdx
    };

    const formData = new FormData();
    formData.append(
        'data',
        new Blob([JSON.stringify(datas)], { type: 'application/json' })
    );
    Object.values(imageFiles).forEach(
        file => Object.values(file.files).forEach(
            f => formData.append(file.name, f)));
    Object.values(yamlFile).forEach(file => formData.append('yamlFile', file));

    const handlerOnSubmit = () => {
        axios({
            method: 'POST',
            url: `http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/dev/registapp`,
            headers: {
                'Content-Type': 'multipart/form-data;',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
            data: formData
        })
            .then(res => {
                res.data.split('\n').forEach(data => console.log(data));
                Swal.fire({
                    text: `정상적으로 신청이 완료되었습니다.`,
                    showConfirmButton: false,
                    timer: 800
                });
                history.push('/dev/applist');
            })
            
            .catch(err => {
                console.log(err);
                Swal.fire({
                    text: '업로드 중 오류가 발생했습니다.',
                    showConfirmButton: false,
                    timer: 800
                });
            })
    };

    return (
        <>
            {
                authYn
                    ?
                    <div>
                        <NaviDev history={history} />
                        <div className='sidemenu_dev-box'>
                            <div className='dev_logo'></div>
                            <ul className='sidemenu_dev'>
                                <li id='dev-setting'><Link to='/dev/appregist'>앱 등록</Link></li>
                                <li><Link to='/dev/applist'>앱 관리</Link></li>
                                <li><Link to='/dev/setting'>설정</Link></li>
                            </ul>
                        </div>
                        <div className='body'>
                            <p className='body_title'>앱 등록</p>
                            <p className='body_subtitle'>앱 세부 정보</p>
                            <div className='form'>
                                <ol>
                                    <li className='form-each'>
                                        <p className='form-title'>카테고리 선택</p>
                                        {categoryButton()}
                                    </li>
                                    <li className='form-each'>
                                        <p className='form-title'>앱 이름</p>
                                        <input type="text"
                                            className='text-inputbox'
                                            value={imageName}
                                            onChange={handlerChangeImageName}
                                            placeholder="앱 이름을 입력해 주세요." />
                                        <p className='description'>COM:ON에 표시되는 앱 이름입니다. 기호를 포함하지 않고 간결하게 작성해야 합니다.</p>
                                    </li>
                                    <li className='form-each'>
                                        <p className='form-title'>간단한 앱 설명</p>
                                        <input type="text"
                                            className='text-inputbox'
                                            value={imageDescription}
                                            onChange={handlerChangeImageDescription}
                                            placeholder="한 줄 정도로 앱을 설명해 주세요." />
                                    </li>
                                    <li className='form-each'>
                                        <p className='form-title'>자세한 설명</p>
                                        <textarea
                                            className='text-inputbox-description'
                                            value={imageDetail}
                                            onChange={handlerChangeImageDetail}
                                            placeholder="앱의 기능 및 특징에 대해 자세히 설명해 주세요." />
                                    </li>
                                    <div className='registerImg-box'>
                                        <li className='form-each'>
                                            <p className='form-title'>앱 아이콘 이미지 등록<span>(512 px * 512 px)</span></p>
                                            <div >
                                                {iconImage &&
                                                    iconImage.map((image, id) => (
                                                        <div className='registerImg-submit' key={id}>
                                                            <img src={image} style={{ width: '100px', objectFit: 'cover', borderRadius: '20px', border: '1px solid #e6e6e6', verticalAlign: 'middle' }} />
                                                        </div>
                                                    ))}
                                                <input className='registerImg-submit-button'
                                                    type="file"
                                                    name="iconimage"
                                                    ref={inputFiles1}
                                                    onChange={handleChangeFile}
                                                    accept="image/*" />
                                            </div>
                                            <p className='description'>PNG 또는 JPEG, 최대 1MB</p>
                                        </li>
                                        <li className='form-each'>
                                            <p className='form-title'>썸네일 이미지 등록<span>(1024 px * 500 px)</span></p>
                                            <div>
                                                {thumbnailImage &&
                                                    thumbnailImage.map((image, id) => (
                                                        <div className='registerImg-submit' key={id}>
                                                            <img src={image} style={{ width: '100px', objectFit: 'contain', border: '1px solid #e6e6e6', verticalAlign: 'middle' }} />
                                                        </div>
                                                    ))}
                                                <input className='registerImg-submit-button'
                                                    type="file"
                                                    name="thumbnailimage"
                                                    ref={inputFiles2}
                                                    onChange={handleChangeFile}
                                                    accept="image/*" />
                                            </div>
                                            <p className='description'>PNG 또는 JPEG, 최대 1MB</p>
                                        </li>
                                        <li className='form-each'>
                                            <p className='form-title'>스크린샷 이미지<span>(1024 px * 500 px)</span></p>
                                            <div>
                                                <div>
                                                    {screenshotImgs &&
                                                        <div className='thumbnailImg-submit'>
                                                            {screenshotImgs.map((image, id) => (
                                                                <div key={id}>
                                                                    <img className='register-thumbnail' src={image} />
                                                                </div>
                                                            ))}
                                                        </div>}
                                                </div>
                                                <input className='registerImg-submit-button'
                                                    type="file"
                                                    name="screenshotimage"
                                                    ref={inputFiles3}
                                                    onChange={handleChangeFile}
                                                    multiple
                                                    accept="image/*" />
                                            </div>
                                            <p className='description'>PNG 또는 JPEG, 스크린 샷당 최대 1MB</p>
                                        </li>
                                    </div>
                                    <div className='registerFile-box'>
                                        <li className='form-each'>
                                            <p className='form-title'>실행 파일 등록</p>
                                            <div>
                                                <input className='registerImg-submit-button'
                                                    type="file"
                                                    name="yamlFile"
                                                    ref={inputFiles4}
                                                    onChange={handleChangeYamlFile} />
                                            </div>
                                            <ul className='registerFile-yaml'>
                                                <li>
                                                    실행되야 하는 컨테이너가 1개더라도 yaml 파일 형식으로 등록되어야 합니다.
                                                </li>
                                                <li>
                                                    데이터 서버의 경우, 영속적인 데이터 저장이 필요하다면 볼륨 설정을 해 주시기 바랍니다.
                                                </li>
                                                <li>
                                                    사용자의 디렉터리 형식은 <span>[c\comon\OUR_APP_USER_ID\STATIC_NUM]</span> 의 형식으로 작성해 주시기 바랍니다.
                                                </li>
                                                <li>
                                                    등록 전 실행되어야 하는 포트를 확인해 주시기 바랍니다.
                                                </li>
                                            </ul>
                                        </li>
                                    </div>
                                </ol>
                                <div className='button-box'>
                                    <button id='blackButton' type='button' onClick={handlerOnSubmit}> 등록 </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <Auth history={history} />
            }
        </>

    )
}

export default AppRegist;