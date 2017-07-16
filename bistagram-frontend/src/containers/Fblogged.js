import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link, Redirect } from 'react-router-dom';

import '../css/fblogged.css';

class Fblogged extends Component {
    constructor(props) {
        super(props);
        this.state={
          page: this.props.match.params.result
        }
    }
    handlePageChange = () =>{
      document.location.href = '/';
    }
    render() {
        return(
          <div className="fb_logged_body">
            <div className="fb_logged_wrap">
              <div>
                <Link to="/" className="bistatitle fb_title_mg"></Link>
              </div>
              <div className="fb_txt_pos">
                {this.state.page === 'register' || this.state.page === 'success'  ?
                  <p>
                    회원님의 Facebook 계정과 Bistagram이 연결에 성공하였습니다.
                  </p>
                  :null
                }
                {this.state.page === 'failure' &&
                  <p>
                    회원님의 Facebook 계정과 Bistagram이 연결에 실패하였습니다.
                  </p>
                }
                {this.state.page !== 'success' && this.state.page !== 'failure' && this.state.page !== 'register' &&
                  <Redirect to="/NotFound"/>
                }
                <div className="fb_logged_btn_pos">
                  <span className="fb_logged_btn_sp">
                    <button className="bluebtn btnstyle point" onClick={()=>this.handlePageChange()}>
                    {this.state.page === 'register' || this.state.page === 'success'  ?
                      '시작하기':
                      '가입하기'
                    }
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
    }
}

export default withRouter(Fblogged);
