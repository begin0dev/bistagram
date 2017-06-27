import React, { Component } from 'react';

import noimg from '../../img/noimg.jpg';

const imgsize ={
  width: '30px',
  height: '30px'
}

class Header extends Component {

    handleResigerDayTitle = (date) => {
  		let actiondate = new Date(date);
     	date = actiondate.getFullYear()+'년 '+(actiondate.getMonth()+1)+'월 '+actiondate.getDate()+'일';
  		return date;
  	}
  	handleResigerDayView = (date) => {
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
     			if(diffDays === '0'){
        			diffDays = '1';
     			}
     			date = diffDays+'일 전';
    		}
  		return date;
  	}

    render() {
      const {post} =this.props;
      return(
        <header className="postview_head">
          <a className="profile_img_a profile_img_circle" style={imgsize}>
            <img src={noimg} className="postview_profileimg img_100" alt=""></img>
          </a>
          <div className="postview_iddiv">
            <a className="postview_id_a postview_idwrap">{post.userinfo.nickname}</a>
          </div>
            <a className="postview_day_a">
              <time dateTime={new Date(post.registerday)}
              title={this.handleResigerDayTitle(post.registerday)}>
              {this.handleResigerDayView(post.registerday)}
              </time>
            </a>
        </header>
      );
    }
}

export default Header;
