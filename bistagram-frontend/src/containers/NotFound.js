import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../css/notfound.css';

class NotFound extends Component {

  render() {
		return(
        <main className="main_body">
          <div className="notfound_div">
            <h2 className="basic_h2">죄송합니다. 페이지를 사용할 수 없습니다.</h2>
            <p>
                클릭하신 링크가 잘못되었거나 페이지가 삭제되었습니다.
                <Link to="/">Bistagram으로 돌아가기.</Link>
            </p>
          </div>
        </main>
    );
	}
};

export default NotFound;
