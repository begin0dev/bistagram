import React from 'react';
import { Link } from 'react-router-dom';

import ScInput from './ScInput';
import HeaderNavi from './HeaderNavi';

const Header = ({headDisplay, handleLogout}) => {
  return (
		<nav className="topNavi">
      <div className="topframe"></div>
			<div>
				<div className={`top_wrapper ${headDisplay?'tap_animation':''}`}>
					<div className="top_center">
						<div className="top_titlewrapper">
							<div className="top_title">
								<Link to="/" className="top_titleimg imgblock" title="Bistagram">Bistagram</Link>
							</div>
						</div>
						<ScInput />
						<HeaderNavi handleLogout={handleLogout}/>
					</div>
				</div>
			</div>
		</nav>
  );
}

export default Header;
