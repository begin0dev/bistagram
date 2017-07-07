import React from 'react';
import { Link } from 'react-router-dom';

import Historymodal from './Historymodal';

const TopInfoPart = ({ui, auth, handleFollowClick, handleHeaderModal}) => {
  return (
		<div className="top_menuwrapper">
      {!auth.userinfo.user.username ?
        <div className="top_menu">
          <Link to="/" className="login_Link">로그인</Link>
        </div>
        :
  			<div className="top_menu">
  				<div className="top_items">
  					<Link to="/explore" className="clickscimg top_menuimgsize imgblock top_menuimg1">사람 찾기</Link>
  				</div>
  				<div className="top_items">
  					<a className="clickscimg top_menuimgsize imgblock top_menuimg2 point" onClick={handleHeaderModal}>
              {auth.userinfo.hiscount > 0 && <span className="span_alert">활동 피드</span>}
            </a>

            {ui.headerModal&&
              <Historymodal
                ui={ui}
                auth={auth}
                handleFollowClick={handleFollowClick}
              />
            }

  				</div>
  				<div className="top_items">
  					<a href={`/search/${auth.userinfo.user.nickname}`}
              className="clickscimg top_menuimgsize imgblock top_menuimg3">
              프로필
            </a>
  				</div>
  			</div>
      }
		</div>
  );
}

export default TopInfoPart;
