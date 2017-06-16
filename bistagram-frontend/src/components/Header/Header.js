import React from 'react';
import { Link } from 'react-router-dom';

import ScInput from './ScInput';
import HeaderNavi from './HeaderNavi';

const Header = (props) => {
  return (
		<nav className="topNavi">
			<div>
				<div className="top_wrapper">
					<div className="top_center">
						<div className="top_titlewrapper">
							<div className="top_title">
								<Link to="/" className="top_titleimg imgblock" title="Bistagram">Bistagram</Link>
							</div>
						</div>
						<ScInput />
						<HeaderNavi />
					</div>
				</div>
			</div>
		</nav>
  );
}

export default Header;
