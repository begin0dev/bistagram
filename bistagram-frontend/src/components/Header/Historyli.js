import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

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

class Historyli extends Component {
    handleNotLink = (e) =>{
      const {history, modalHistory} = this.props;
      if(e.target.dataset.txt!=='link' && !this.circleImg.contains(e.target) && !this.followBtnRef.contains(e.target)){
        if(modalHistory.type==='follow'){
          history.push('/search/'+modalHistory.nickname);
        }else{
          history.push('/post/'+modalHistory.atcnum);
        }
      }
    }
    render() {
        const {modalHistory, auth, handleFollowClick} = this.props;
        return(
          <li className="history_li point" onClick={this.handleNotLink}>
            <div className="history_img_div" ref={(div) => { this.circleImg = div }}>
              <div className="inlineblock">
                <Link to={`/search/${modalHistory.nickname}`} className="history_img_a" style={imgsize}>
                  <img
                    src={!modalHistory.profileimgname ? noimg : '/upload/profile/'+modalHistory.profileimgname}
                    className="img_100" alt="">
                  </img>
                </Link>
              </div>
            </div>
            <div className="history_message_div">
              <Link to={`/search/${modalHistory.nickname}`}
                className="history_id_size history_id_bold" data-txt="link">
                {modalHistory.nickname}
              </Link>
              {`${modalHistory.type==='follow'?'님이 회원님을 팔로우하기 시작했습니다':''}`}
              {`${modalHistory.type==='call'?'님이 댓글에서 회원님을 언급했습니다: ':''}`}
              {`${modalHistory.type==='atclike'&&!modalHistory.mediatype?'님이 회원님의 게시물을 좋아합니다.':''}`}
              {`${modalHistory.type==='reply'?'님이 댓글을 남겼습니다:':''}`}
              {modalHistory.type==='call' || modalHistory.type==='reply'?
                <span dangerouslySetInnerHTML={{__html: changeTag(modalHistory.content)}}></span>:
              ''}
              {`${modalHistory.type==='atclike' && modalHistory.mediatype && modalHistory.mediatype.match('video')?'님이 회원님의 동영상을 좋아합니다.':''}`}
              {`${modalHistory.type==='atclike' && modalHistory.mediatype && modalHistory.mediatype.match('image')?'님이 회원님의 사진을 좋아합니다.':''}`}
              <time className="history_time history_time_media"
              dateTime={new Date(modalHistory.updateday)}
              title={DayTitle(modalHistory.updateday)}>
              {DayView(modalHistory.updateday)}
              </time>
            </div>
            <div className="history_right_div">
              {modalHistory.type==='follow'?
                <span className="history_button_span" ref={(span) => { this.followBtnRef = span }}>
                  {auth.userinfo.followInfo.following.indexOf(modalHistory.who)!==-1 ?
                    <button className="whitebtn btnstyle point"
                      disabled={modalHistory.who===auth.recommend.clickUser ?true:''}
                      onClick={(e)=>handleFollowClick(modalHistory.who)}>
                      팔로잉
                    </button>:
                    <button className={`bluebtn btnstyle point ${modalHistory.who===auth.recommend.clickUser ? 'bluebtn_disable':''}`}
                      disabled={modalHistory.who===auth.recommend.clickUser ?true:''}
                      onClick={(e)=>handleFollowClick(modalHistory.who)}>
                    팔로우
                    </button>
                  }
                  {modalHistory.who===auth.recommend.clickUser &&
                    <div className='loding_div loding_img'></div>
                  }
                </span>
              :
                <a className="inlineblock">
                  {modalHistory.mediatype&&modalHistory.mediatype.match("image")&&
                  <img className="history_imgsize" src={`/upload/thumb/${changeFileName(modalHistory.medianame)}.png`} alt=""></img>}
                  {modalHistory.mediatype&&modalHistory.mediatype.match("video")&&
                  <img className="history_imgsize" src={`/upload/thumb/${changeFileName(modalHistory.medianame)}.png`} alt=""></img>
                  }
                </a>
              }
            </div>
          </li>
        );
    }
}
export default withRouter(Historyli);
