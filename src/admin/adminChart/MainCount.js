import axios from "axios";
import { useState, useEffect } from "react";
import AnimatedNumber from "./AnimatedNumber";
import jwtDecode from "jwt-decode";

function MainCount() {
  const [allList, setAllList] = useState([]);
  const [countAllUser, setCountAllUser] = useState(0);
  const [authYn, setAuthYn] = useState(false);

  useEffect(() => {

    if (sessionStorage.getItem('token') == null) {
      setAuthYn(false);
    } else {
      const token = sessionStorage.getItem('token');
      const decode_token = jwtDecode(token);
      let authIdx = decode_token.authIdx;
      if (authIdx === 3) {
        setAuthYn(true);
      } else {
        setAuthYn(false);
      }
    }

    axios
      .get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/admin/chart/totalcount`,
        { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
      .then((res) => {
        setAllList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/admin/chart/countalluseranddev`,
        { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
      .then((response) => {
        const { countAllUser } = response.data;
        setCountAllUser(countAllUser);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
   
      <div className="total-Container">
        <div className="totalUser-Box">
          <p className="totalUser-P">전체 사용자</p>
          {/* <div className="totalUser-P"> */}

          {/* </div> */}
          <div className="totalUser-Data">
            {countAllUser && (
              <AnimatedNumber value={countAllUser} duration={1000} formatValue={(value) => value.toFixed(0)} />
            )}
            <p>명</p>
          </div>
        </div>
        {allList && allList.map((data) => (
          <>
            <div className="totalDownloadCount-Box">
              <div className="totalDownloadCount-P">
                <p>누적 앱 다운로드</p>
              </div>
              <div className="totalDownloadCount-Data">
                {data.totalDownloadCount && (
                  <AnimatedNumber value={data.totalDownloadCount} duration={1000} formatValue={(value) => value.toFixed(0)} />
                )}
                <p>회</p>
              </div>
            </div>

            <div className="totalOpenApp-Box">
              <div className="totalOpenApp-P">
                <p>출시 된 앱</p>
              </div>
              <div className="totalOpenApp-Data">
                {data.totalOpenApp && (
                  <AnimatedNumber value={data.totalOpenApp} duration={1000} formatValue={(value) => value.toFixed(0)} />
                )}
                <p>건</p>
              </div>
            </div>
          </>
        ))}
      </div>

  )
};

export default MainCount;
