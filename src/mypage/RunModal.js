import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai"
import { useEffect } from "react";
import '../css/modal.css';
import loading from '../img/loading.gif';
import loading2 from '../img/loading2.gif';

const RunModal = (props) => {

    useEffect(() => {
        document.body.style.cssText = `
          position: fixed; 
          top: -${window.scrollY}px;
          overflow-y: scroll;
          height: 200px;
          width: 100%;`;
        return () => {
            const scrollY = document.body.style.top;
            document.body.style.cssText = '';
            window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
        };
    }, []);

    const handlerClickGo = () => {
        window.open(`http://${process.env.REACT_APP_IP}:${props.port}/`);
        props.closeModal();
    };

    return (
        <>
            <div className="Modal">
                <div className="modalBody" onClick={(e) => e.stopPropagation()}>
                    <AiOutlineClose id="modalCloseBtn"
                        onClick={props.closeModal} />

                    {
                        props.isLoading
                            ?
                            <>
                                <img src={loading2} className="run-loading-img" />
                                <p className="run-loading-text">잠시 기다려 주세요</p>
                            </>
                            :
                            <>
                                <p className="run-ok-text">🎠 준비 끝 {props.port} 🎠</p>
                                <button type='button'
                                    className="run_modalBtn"
                                    onClick={handlerClickGo} >이동하기</button>
                            </>
                    }
                </div>
            </div>
        </>
    );
}
export default RunModal;