import React from 'react';

export default class ScInput extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			isEdit: false
		};
	}
	componentDidMount() {
		document.addEventListener('mousedown', this.handleClickOutside);
	}
	componentWillUnmount() {
		document.removeEventListener('mousedown', this.handleClickOutside);
	}
	setInputRef = (node) =>{
    this.InputRef = node;
  }
	handleEditable = () =>{
		this.setState({
      isEdit: !this.state.isEdit
    });
		this.inputKeyword.focus();
	}
	handleClickOutside = e =>{
		if (this.InputRef && !this.InputRef.contains(e.target)) {
			this.setState({
				isEdit: false
			});
		}
	}
	handleChange = e =>{
		this.props.handleChangeSearch(e.target.value);
	}
	handleClear = () =>{
		this.props.handleChangeSearch('');
		this.setState({
			isEdit: !this.state.isEdit
		});
	}
	render(){
		const {form, handleSubmitSearch}=this.props;
		const mask=(
				<div className="inputmask_div inputmask_position boxing100" onClick={this.handleEditable}>
					<div className="inputmask_wrapper">
						<span className="clickscimg inputmask_img"></span>
						<span className="inputmask_txt">{form.search.keyword ===''? '검색' : form.search.keyword}</span>
					</div>
				</div>
		);
		const clear=(<div className="SearchClear_position SearchClear_img" onClick={this.handleClear}></div>);
		return(
			<div className="top_inputwrapper" ref={this.setInputRef}>
				<input type="text" className="top_scinput boxing100"
					placeholder="검색"
					ref={(ref) => { this.inputKeyword = ref }}
					value={form.search.keyword}
					onChange={this.handleChange}
					onKeyPress={handleSubmitSearch}
				/>
				<span className="clickscimg clickscimg_position"></span>
				{!this.state.isEdit ? mask : clear}
			</div>
		);
	}
};
