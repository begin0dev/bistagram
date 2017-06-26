import React from 'react';
import { Link } from 'react-router-dom';

const TopInfoPart = ({ui, userinfo, handleLogout, handleHeaderModal}) => {
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
          <div style={{display:`${ui.headerModal?'':'none'}`}}>
            <div className="alert_triangle"></div>
            <div className="alert_triangle_link"></div>
            <div className="alert_body">
              <ul>
                <li className="alert_li point">
                </li>
              </ul>
            </div>
          </div>
				</div>
				<div className="top_items">
					<a className="clickscimg top_menuimgsize imgblock top_menuimg3" onClick={handleLogout}>프로필</a>
				</div>
			</div>
		</div>
  );
}

export default TopInfoPart;
