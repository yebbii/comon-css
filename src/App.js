import logo from './logo.svg';
import './App.css';
import ImageList from './ImageList';
import { Route } from 'react-router-dom';
import ImageDetail from './ImageDetail';
import ImageWrite from './ImageWrite';
import AppRegist from './dev/AppRegist';
import DevSetting from './dev/DevSetting';
import AppListDev from './dev/AppListDev';
import AppListAdmin from './admin/AppListAdmin';
import Judge from './admin/Judge';
import JudgeDetail from './admin/JudgeDetail';
import AdminAppDetail from './admin/AdminAppDetail';
import AdminSetting from './admin/AdminSetting';
import Main from './main/Main';
import AppList from './main/AppList';
import AppDetail from './main/AppDetail';
import MyService from './mypage/MyService';
import EditUserInfo from './mypage/EditUserInfo';
import Login from './login/Login';
import Regist from './login/Regist';
import DevRegist from './login/DevRegist';
import DevLogin from './login/DevLogin';
import KakaoLogin from './login/KakaoLogin';
import SelectLogin from './login/SelectLogin';
import SelectRegist from './login/SelectRegist';
import AdminUserDetail from './admin/AdminUserDetail';
import AdminDevDetail from './admin/AdminDevDetail';
import MyReview from './mypage/MyReview';
import WriteReview from './mypage/WriteReview';
import MyReviewList from './mypage/MyReviewList';
import NoticeDetail from './notice/NoticeDetail';
import NoticeEdit from './notice/NoticeEdit';
import NoticeList from './notice/NoticeList';
import NoticeWrite from './notice/NoticeWrite';
import SelectUserRegist from './login/SelectUserRegist';
import AdminChartDetail from './admin/adminChart/AdminChartDetail';
import AdminChart from './admin/adminChart/AdminChart';


function App() {
  return (
    <>


      {/* 관리자용 */}
      <Route path="/admin" render={(props) => <AppListAdmin {...props} />} exact={true} />
      <Route path="/admin/judge" render={(props) => <Judge {...props} />} exact={true} />
      <Route path="/admin/judge/:imageidx" render={(props) => <JudgeDetail {...props} />} exact={true} />
      <Route path="/admin/appdetail/:imageidx" render={(props) => <AdminAppDetail {...props} />} exact={true} />
      <Route path="/admin/setting" render={(props) => <AdminSetting {...props} />} exact={true} />
      <Route path="/admin/userdetail/:userId" render={(props) => <AdminUserDetail {...props} />} exact={true} />
      <Route path="/admin/devdetail/:userId" render={(props) => <AdminDevDetail {...props} />} exact={true} />
      <Route path='/notice/write' render={(props) => <NoticeWrite {...props} />} exact={true} />
      <Route path='/notice/edit/:noticeIdx' render={(props) => <NoticeEdit {...props} />} exact={true} />
      <Route path='/admin/chart' render={(props) => <AdminChart {...props} />} exact={true} />
      <Route path='/admin/chart/:imageIdx' render={(props) => <AdminChartDetail {...props} />} exact={true} />

      {/* 개발자용 */}
      <Route path='/dev/applist' render={(props) => <AppListDev {...props} />} exact={true} />
      <Route path='/dev/appregist' render={(props) => <AppRegist {...props} />} exact={true} />
      <Route path="/dev/setting" render={(props) => <DevSetting {...props} />} exact={true} />

      {/* 사용자용 - 메인 */}
      <Route path='/' render={(props) => <Main {...props} />} exact={true} />
      <Route path='/user/applist' render={(props) => <AppList {...props} />} exact={true} />
      <Route path='/user/appdetail/:imageIdx' render={(props) => <AppDetail {...props} />} exact={true} />

      {/* 사용자용 - 마이페이지 */}
      <Route path='/mypage' render={(props) => <MyService {...props} />} exact={true} />
      <Route path='/mypage/edit' render={(props) => <EditUserInfo {...props} />} exact={true} />
      <Route path='/mypage/review' render={(props) => <MyReview {...props} />} exact={true} />
      <Route path='/mypage/writereview' render={(props) => <WriteReview {...props} />} exact={true} />
      <Route path='/mypage/reviewlist' render={(props) => <MyReviewList {...props} />} exact={true} />

      {/* 사용자용 - notice */}
      <Route path='/notice' render={(props) => <NoticeList {...props} />} exact={true} />
      <Route path='/notice/detail/:noticeIdx' render={(props) => <NoticeDetail {...props} />} exact={true} />

      {/* 로그인 선택 */}
      <Route path='/login' render={(props) => <SelectLogin {...props} />} exact={true} />
      <Route path='/regist' render={(props) => <SelectRegist {...props} />} exact={true} />

      {/* 사용자용 로그인  */}
      <Route path='/userlogin' render={(props) => <Login {...props} />} exact={true} />
      <Route path='/userregist' render={(props) => <Regist {...props} />} exact={true} />
      <Route path="/kakaologin" component={KakaoLogin} exact={true} />
      <Route path='/selectuserregist' render={(props) => <SelectUserRegist {...props} />} exact={true} />

      {/* 개발자용 로그인 */}
      <Route path='/devregist' render={(props) => <DevRegist {...props} />} exact={true} />
      <Route path='/devlogin' render={(props) => <DevLogin {...props} />} exact={true} />
    </>
  );
}

export default App;
