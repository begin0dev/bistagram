import React from 'react';

export default class ScInput extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			keyword :'',
			isEdit: false
		};
		this.setInputRef = this.setInputRef.bind(this);
	}
	componentDidMount() {
		document.addEventListener('mousedown', this.handleClickOutside);
	}
	componentWillUnmount() {
		document.removeEventListener('mousedown', this.handleClickOutside);
	}
	setInputRef(node) {
    this.InputRef = node;
  }
	handleEditable=()=>{
		this.setState({
      isEdit: !this.state.isEdit
    });
		this.inputKeyword.focus();
	}
  handleChange=(e)=> {
    this.setState({
      keyword: e.target.value
    });
  }
	handleClickOutside=(e)=> {
		if (this.InputRef && !this.InputRef.contains(e.target)) {
			this.setState({
				isEdit: false
			});
		}
	}
	handleClear() {
		this.setState({
			keyword : '',
			isEdit: !this.state.isEdit
		});
	}
	render(){
		const mask=(
				<div className="inputmask_div inputmask_position boxing100" onClick={this.handleEditable}>
					<div className="inputmask_wrapper">
						<span className="clickscimg inputmask_img"></span>
						<span className="inputmask_txt">{this.state.keyword ===''? '검색' : this.state.keyword}</span>
					</div>
				</div>
		);
		const clear=(<div className="SearchClear_position SearchClear_img" onClick={this.handleClear}></div>);
		return(
			<div className="top_inputwrapper" ref={this.setInputRef}>
				<input type="text" className="top_scinput boxing100"
					placeholder="검색"
					ref={(ref) => { this.inputKeyword = ref }}
					value={this.state.keyword}
					onChange={this.handleChange}/>
				<span className="clickscimg clickscimg_position"></span>
				{!this.state.isEdit ? mask : clear}
			</div>
		);
	}
};
