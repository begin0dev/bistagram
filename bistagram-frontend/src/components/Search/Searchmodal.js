import React, { Component } from 'react';

import Modalheader from './Modalheader';
import Modalmedia from './Modalmedia';
import Modalfooter from './Modalfooter';

class Searchmodal extends Component {
    constructor(props) {
        super(props);
        this.state={
          index: 0,
          play: false,
          style: {paddingBottom : '100%'}
        }
    }
    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }
    handleClickOutside = (e) =>{
      const {handleSearchModal} = this.props;
      if (this.modaldiv && !this.modaldiv.contains(e.target)) {
          handleSearchModal(-1);
      }
    }
    handleAftBfClick = (e) => {
      if(e.target === this.bfbtn){
        this.setState(prevState => ({
          ...this.state,
          index:prevState.index-1,
          play: false
        }));
      }
      if(e.target === this.aftbtn){
        this.setState(prevState => ({
          ...this.state,
          index:prevState.index+1,
          play: false
        }));
      }
    }
    playVideo = () => {
      let video=this.videoRef;
      video.paused ? video.play() : video.pause();
      this.setState({
        ...this.state,
        play: !this.state.play
      });
    }
    handleImgLoad = ({target:img}) =>{
      let width = img.naturalWidth;
      let height = img.naturalHeight;
      let heightper = height*100/width;
      if(heightper<75){	heightper ='75'	}
      else if(heightper>123){	heightper ='123'}
      this.setState({
        ...this.state,
        style:{
          ...this.state.style,
          paddingBottom:`${heightper}%`
        }
      });
    }
    render() {
        const modalstyle={
          position: 'relative',
          zIndex: 2
        }
        const {search} = this.props;
        const {index, play} = this.state;
        return(
          <div style={modalstyle}>
            <div className="modal_root" role="dialog" onClick={this.handleClickOutside}>

              <div className="search_modal_bfafbtn_body">
                <div className="search_modal_bfafbtn_position">
                  <div className="search_modal_bfafbtn_wrap">
                    <a className="imgs search_modal_bfbtn search_modal_bfbtn_img"
                    role="button">이전</a>
                    <a className="imgs search_modal_afbtn search_modal_afbtn_img"
                    role="button">다음</a>
                  </div>
                </div>
              </div>

              <div className="modal_post_body">
                <div className="modal_post_position modal_post_style"
                  ref={(div) => { this.modaldiv = div }}
                  style={{maxWidth: "815px"}}
                >
                  <article className="modal_article">

                    <Modalheader
                      search={search}
                    />

                    <Modalmedia
                      search={search}
                      index={index}
                      play={play}
                      playVideo={this.playVideo}
                      handleImgLoad={this.handleImgLoad}
                    />

                    <Modalfooter
                      search={search}
                    />
                    <div className="modal_more_div">
                      <button className="imgs more_btn more_btn_img more_btn_display">
                        옵션 더 보기
                      </button>
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </div>
        );
    }
}
export default Searchmodal;
