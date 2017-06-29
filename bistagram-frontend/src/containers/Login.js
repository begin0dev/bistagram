import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as form from '../actions/form';
import * as ui from '../actions/ui';

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
    componentDidMount() {
      const {setLoading, setLoadingInitial} = this.props;
      setLoading({name:"main", value:true});

      setTimeout(()=>{ setLoadingInitial() }, 700);
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
      this.props.formDataReset();
      this.setState({
        isRegi: !this.state.isRegi
      });
    }
    render() {
      const {form, ui} = this.props;
      return(
        <main className="login_main" role="main" style={{display:`${ui.loading.main?'none':''}`}}>
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
              form={form}
              panelChange={this.handlePanelChange}
              changeFormData={this.props.changeFormData}
              checkUserName={this.props.checkUserName}
              checkNickName={this.props.checkNickName}
              changeCheck={this.props.changeCheck}
              signUp={this.props.signUp}
              setSubmitStatus={this.props.setSubmitStatus}
              setErrorMessage={this.props.setErrorMessage}
              /> :
              <Signin
              form={form}
              panelChange={this.handlePanelChange}
              changeFormData={this.props.changeFormData}
              signIn={this.props.signIn}
              setSubmitStatus={this.props.setSubmitStatus}
              setErrorMessage={this.props.setErrorMessage}
              />
            }

          </article>
        </main>
      );
    }
}

const mapStateToProps = (state) => ({
  form: state.form,
  ui: state.ui
});

const mapDispatchToProps = (dispatch) => ({
  changeFormData: (formname, name, value) => dispatch(form.changeFormData(formname, name, value)),
  checkUserName: (username) => dispatch(form.checkUserName(username)),
  checkNickName: (nickname) => dispatch(form.checkNickName(nickname)),
  changeCheck: (name, value) => dispatch(form.changeCheck(name, value)),
  formDataReset: () => dispatch(form.formDataReset()),
  setSubmitStatus: (name, value) => dispatch(form.setSubmitStatus(name, value)),
  setErrorMessage: (name, msg) => dispatch(form.setErrorMessage(name, msg)),
  signUp: (params) => dispatch(form.signUp(params)),
  signIn: (params) => dispatch(form.signIn(params)),

  setLoadingInitial: () => dispatch(ui.setLoadingInitial()),
  setLoading: (params) => dispatch(ui.setLoading(params))
})


Login = connect(mapStateToProps, mapDispatchToProps)(Login)
export default Login;
