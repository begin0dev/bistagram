import React from 'react';
import { Link } from 'react-router-dom';

const TopInfoPart = ({handleLogout}) => {
  return (
		<div className="top_menuwrapper">
			<div className="top_menu">
				<div className="top_items">
					<Link to="/explore" className="clickscimg top_menuimgsize imgblock top_menuimg1">사람 찾기</Link>
				</div>
				<div className="top_items">
					<a className="clickscimg top_menuimgsize imgblock top_menuimg2">활동 피드</a>
				</div>
				<div className="top_items">
					<a className="clickscimg top_menuimgsize imgblock top_menuimg3" onClick={handleLogout}>프로필</a>
				</div>
			</div>
		</div>
  );
}

export default TopInfoPart;
