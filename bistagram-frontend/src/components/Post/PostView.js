import React from 'react';

import Header from './Header';

import Reply from './Reply';

class PostView extends React.Component{

  render(){
		return(
      <div>
        {this.state.atcs.map((contact, i) => {
          return(
            <article className="postview_wrapper postview_bt60px" key={"atc"+i}>
              <Header atc={contact} />
              <Mediapart atc={contact} />
              <Reply atc={contact} />
            </article>
          );
        })}
      </div>
		);
	}
};

export default PostView;
