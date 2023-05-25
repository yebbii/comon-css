import { useEffect, useRef } from "react";

import icon from "./kakao.png";

function Kakao() {
    const refKakao = useRef(null);
    const JAVASCRIPT_APP_KEY = '3e1ad5ae10b08ada57408832fc522327';

    useEffect(() => {
        const script = document.createElement('script');
        script.async = true;
        try {
            if (window.Kakao) {
                const kakao = window.Kakao;
                if (!kakao.isInitialized()) {
                    kakao.init(JAVASCRIPT_APP_KEY);
                }
            }
            document.body.appendChild(script);
            return () => {
                document.body.removeChild(script);
            };
        } catch (err) { }
    }, []);

    const handleChatChannel = () => {
        if (window.Kakao && window.Kakao.Channel) {
            window.Kakao.Channel.chat({
                channelPublicId: '_sdsHxj',
            });
        }
    };

    return (
        <>
            <div className="side-chat" ref={refKakao} id="chat-channel-button" onClick={handleChatChannel}>
                <img className='chat-img' src={icon} alt="" />
            </div>
        </>
    );
}

export default Kakao;
