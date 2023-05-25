import Weather from './Weather';
import ScrollBox from './ScrollBox';
import Kakao from './Kakao';
import '../css/sidebox.css';

function MainSide() {

  return (
    <>
      <div className='side-box'>
        <Weather />
        <Kakao />
        <ScrollBox />
      </div>
    </>
  );
}

export default MainSide;
