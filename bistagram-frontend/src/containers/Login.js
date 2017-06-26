import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as auth from '../actions/auth';

import '../css/login.css';

import Signin from '../components/Account/Signin';
import Signup from '../components/Account/Signup';

let imgPath=[require('../img/img_1.jpg'),require('../img/img_2.jpg'),require('../img/img_3.jpg'),require('../img/img_4.jpg'),require('../img/img_5.jpg')];

class Login extends Component {
    constructor(props) {
        super(props);
        this.state={
          imgNum: 0,
          isRegi: true
        };
    }
    componentWillMount(){
      this.timerID = setInterval(
        () => this.imgAnimation(), 5000
      );
    }
    imgAnimation =(e)=> {
      if(this.refs.imgdiv){
        this.setState({imgNum: this.state.imgNum===4?0:this.state.imgNum+1});
      }
    }
    handlePanelChange =(e)=> {
      this.props.authDataReset();
      this.setState({
        isRegi: !this.state.isRegi
      });
    }
    render() {
      const {auth} = this.props;
      return(
        <main className="login_main" role="main" style={{display:`${this.props.ui.loading?'none':''}`}}>
          <article className="center_wrap">
            <div className="imgtotal_div">
              <div className="imgmargin_div" ref="imgdiv">
                <img className={'screenimg_style '+(this.state.imgNum===0?'screanimg-enter':'')+(this.state.imgNum===1?'screanimg-leave':'')} src={imgPath[0]} alt="screan_img"/>
                <img className={'screenimg_style '+(this.state.imgNum===1?'screanimg-enter':'')+(this.state.imgNum===2?'screanimg-leave':'')} src={imgPath[1]} alt="screan_img"/>
                <img className={'screenimg_style '+(this.state.imgNum===2?'screanimg-enter':'')+(this.state.imgNum===3?'screanimg-leave':'')} src={imgPath[2]} alt="screan_img"/>
                <img className={'screenimg_style '+(this.state.imgNum===3?'screanimg-enter':'')+(this.state.imgNum===4?'screanimg-leave':'')} src={imgPath[3]} alt="screan_img"/>
                <img className={'screenimg_style '+(this.state.imgNum===4?'screanimg-enter':'')+(this.state.imgNum===0?'screanimg-leave':'')} src={imgPath[4]} alt="screan_img"/>
              </div>
            </div>
            {this.state.isRegi ?
              <Signup
              auth={auth}
              panelChange={this.handlePanelChange}
              changeUserData={this.props.changeUserData}
              checkUserName={this.props.checkUserName}
              checkNickName={this.props.checkNickName}
              changeCheck={this.props.changeCheck}
              signUp={this.props.signUp}
              setSubmitStatus={this.props.setSubmitStatus}
              setErrorMessage={this.props.setErrorMessage}
              /> :
              <Signin
              auth={auth}
              panelChange={this.handlePanelChange}
              changeUserData={this.props.changeUserData}
              signIn={this.props.signIn}
              setSubmitStatus={this.props.setSubmitStatus}
              setErrorMessage={this.props.setErrorMessage}
              />}
          </article>
        </main>
      );
    }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  ui: state.ui
});

const mapDispatchToProps = (dispatch) => ({
  changeUserData: (formname, name, value) => dispatch(auth.changeUserData(formname, name, value)),

  checkUserName: (username) => dispatch(auth.checkUserName(username)),
  checkNickName: (nickname) => dispatch(auth.checkNickName(nickname)),
  changeCheck: (name, value) => dispatch(auth.changeCheck(name, value)),

  authDataReset: () => dispatch(auth.authDataReset()),
  setSubmitStatus: (name, value) => dispatch(auth.setSubmitStatus(name, value)),
  setErrorMessage: (name, msg) => dispatch(auth.setErrorMessage(name, msg)),

  signUp: (params) => dispatch(auth.signUp(params)),
  signIn: (params) => dispatch(auth.signIn(params)),
})


Login = connect(mapStateToProps, mapDispatchToProps)(Login)
export default Login;
