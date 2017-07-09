import React from 'react';

import noimg from '../../img/noimg.jpg';

const imgsize = {
  width: '34px',
  height: '34px'
}

const DayTitle = (date) => {
  let actiondate = new Date(date);
  date = actiondate.getFullYear()+'년 '+(actiondate.getMonth()+1)+'월 '+actiondate.getDate()+'일';
  return date;
}
const DayView = (date) => {
  let actiondate = new Date(date);
  let today = new Date();
  if(today.getDate() === actiondate.getDate() && today.getMonth() === actiondate.getMonth() && today.getYear() === actiondate.getYear()){
      let hourssince = today.getHours() - actiondate.getHours();
      let minutessince = today.getMinutes() - actiondate.getMinutes();
      let secondssince = today.getSeconds() - actiondate.getSeconds();
      if(hourssince > 0){
          date = hourssince+'시간 전';
      }else if(minutessince > 0){
          date = minutessince+'분 전';
      }else{
          date = secondssince+'초 전';
      }
    }else{
      let oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
      let diffDays = Math.round(Math.abs((today.getTime() - actiondate.getTime())/(oneDay)));
      if(diffDays >= 7){
          date = (actiondate.getMonth()+1)+'월 '+actiondate.getDate()+'일';
      }else{
          if(diffDays === '0'){
              diffDays = '1';
          }
          date = diffDays+'일 전';
      }
    }
  return date;
}
const changeFileName = (filename) =>{
  let _lastDot = filename.lastIndexOf('.');
  let imgfilename = filename.substring(0, _lastDot)
  return imgfilename;
}

const changeTag = (text) =>{
  text=text.replace(/#([a-z0-9가-힣][a-z0-9가-힣\-_]*)/ig,'<a href="search/#$1">#$1</a>');
  text=text.replace(/@([a-z0-9][a-z0-9\-_]*)/ig,'<a href="search/@$1">@$1</a>');
  return text;
}

const Historyli = ({history, auth, handleFollowClick}) => {
  return (
    <li className="history_li point">
  		<div className="history_img_div">
        <div className="inlineblock">
          <a href={`/search/${history.nickname}`} className="history_img_a" style={imgsize}>
            <img src={noimg} className="img_100" alt=""></img>
          </a>
        </div>
  		</div>
      <div className="history_message_div">
        <a href={`/search/${history.nickname}`} className="history_id_size history_id_bold">
          {history.nickname}
        </a>
        {`${history.type==='follow'?'님이 회원님을 팔로우하기 시작했습니다':''}`}
        {`${history.type==='call'?'님이 댓글에서 회원님을 언급했습니다: ':''}`}
        {`${history.type==='atclike'&&!history.mediatype?'님이 회원님의 게시물을 좋아합니다.':''}`}
        {`${history.type==='reply'?'님이 댓글을 남겼습니다:':''}`}
        {history.type==='call' || history.type==='reply'?
          <span dangerouslySetInnerHTML={{__html: changeTag(history.content)}}></span>:
        ''}
        {`${history.type==='atclike'&&history.mediatype&&history.mediatype.match('video')?'님이 회원님의 동영상을 좋아합니다.':''}`}
        {`${history.type==='atclike'&&history.mediatype&&history.mediatype.match('image')?'님이 회원님의 사진을 좋아합니다.':''}`}
        <time className="history_time history_time_media"
        dateTime={new Date(history.updateday)}
        title={DayTitle(history.updateday)}>
        {DayView(history.updateday)}
        </time>
      </div>
      <div className="history_right_div">
        {history.type==='follow'?
          <span className="history_button_span">
            {auth.userinfo.followInfo.follower.indexOf(history.who)!==-1 ?
              <button className="whitebtn btnstyle point"
                disabled={history.who===auth.recommend.clickUser ?true:''}
                onClick={(e)=>handleFollowClick(history.who)}>
                팔로잉
              </button>:
              <button className={`bluebtn btnstyle point ${history.who===auth.recommend.clickUser ? 'bluebtn_disable':''}`}
                disabled={history.who===auth.recommend.clickUser ?true:''}
                onClick={(e)=>handleFollowClick(history.who)}>
              팔로우
              </button>
            }
            {history.who===auth.recommend.clickUser &&
              <div className='loding_div loding_img'></div>
            }
          </span>
        :
          <a className="inlineblock">
            {history.mediatype&&history.mediatype.match("image")&&
            <img className="history_imgsize" src={`/upload/thumb/${changeFileName(history.medianame)}.png`} alt=""></img>}
            {history.mediatype&&history.mediatype.match("video")&&
            <img className="history_imgsize" src={`/upload/thumb/${changeFileName(history.medianame)}.png`} alt=""></img>
            }
          </a>
        }
      </div>
    </li>
  );
}

export default Historyli;
