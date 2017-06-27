import React from 'react';
import { Link } from 'react-router-dom';

import Historymodal from './Historymodal';

const TopInfoPart = ({ui, history, userinfo, handleLogout, handleHeaderModal}) => {
  return (
		<div className="top_menuwrapper">
			<div className="top_menu">
				<div className="top_items">
					<Link to="/explore" className="clickscimg top_menuimgsize imgblock top_menuimg1">사람 찾기</Link>
				</div>
				<div className="top_items">
					<a className="clickscimg top_menuimgsize imgblock top_menuimg2 point" onClick={handleHeaderModal}>
            {userinfo.hiscount > 0 && <span className="span_alert">활동 피드</span>}
          </a>

          {ui.headerModal&&
            <Historymodal
            userinfo={userinfo}
            history={history}/>
          }

				</div>
				<div className="top_items">
					<a className="clickscimg top_menuimgsize imgblock top_menuimg3" onClick={handleLogout}>프로필</a>
				</div>
			</div>
		</div>
  );
}

export default TopInfoPart;
