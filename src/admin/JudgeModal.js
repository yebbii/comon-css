import { useEffect } from "react";
import styled from "styled-components";
import '../css/modal.css'
import { FaAngleDown } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

const JudgeModal = (props) => {

    const denyList = [
        { denyIdx: '1', denyName: '이미지 규격이 맞지 않음.' },
        { denyIdx: '2', denyName: '볼륨 설정이 옳지 않음.' },
        { denyIdx: '3', denyName: '실행을 위한 이미지가 존재하지 않음.' },
        { denyIdx: '4', denyName: '실행 파일(docker-compose.yaml) 형식이 맞지 않음.' },
        { denyIdx: '5', denyName: '실행 포트가 올바르게 설정되지 않음.' },
    ];

    useEffect(() => {
        document.body.style.cssText = `
          position: fixed; 
          top: -${window.scrollY}px;
          overflow-y: scroll;
          width: 100%;`;
        return () => {
            const scrollY = document.body.style.top;
            document.body.style.cssText = '';
            window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
        };
    }, []);

    const ModalBg = styled.div`
        display: flex;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9999;
        align-items: center;
        justify-content: center;
        width: 100vw;
        height: 100vh;
        background-color: #00000080;
    `;

    const ModalBox = styled.div`
    width: 25rem;
    background-color: white;
    `;

    // 서버에서 온 denyList를 사용해 드롭다운 메뉴 생성
    const createReasonList = () => {
        return denyList.map((d, index) => {
            return (
                <li type='text'
                    key={index}
                    value={d.denyIdx}
                    onClick={props.handlerClickReason}
                    readOnly>{d.denyName}</li>
            );
        })
    };

    return (
        <ModalBg>
            <ModalBox>
                <div className="Modal">
                    <div className="modalBody">
                        <AiOutlineClose id="modalCloseBtn"
                            onClick={() => props.setModalIsOpen(false)} />
                        <p>심사 거절 사유를 선택해 주세요.</p>
                        <div class="dropdown">
                            <div className="container">
                                <input id="dropdown" type="checkbox" />
                                <label className="dropdownLabel" for="dropdown">
                                    <div>{props.reason}</div>
                                    <FaAngleDown className="caretIcon" />
                                </label>
                                <div className="content">
                                    <ul>
                                        {createReasonList()}
                                    </ul>
                                </div>
                            </div>
                            <button className="modalButton"
                                onClick={props.handlerSubmitDeny}>제출</button>
                        </div>
                    </div>
                </div>
            </ModalBox>
        </ModalBg >
    );
}
export default JudgeModal;