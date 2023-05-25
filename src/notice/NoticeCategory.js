import { useEffect, useState, useRef } from "react";
import "../css/notice.css";

const NoticeCategory = ({ visibility, setVisibility, children }) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        // 클릭 이벤트가 컴포넌트 외부에서 발생하고, 클릭된 요소가 드롭다운 내부에 없는 경우
        setVisibility(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [setVisibility]);

  const visibilityClass = visibility ? "slide-fade-in-dropdown" : "slide-fade-out-dropdown";

  return (
    <article ref={dropdownRef} className={`components-dropdown ${visibilityClass}`}>
      {children}
    </article>
  );
};


export default NoticeCategory;
