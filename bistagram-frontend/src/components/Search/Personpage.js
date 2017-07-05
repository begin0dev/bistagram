import React from 'react';
import NumberFormat from 'react-number-format';

import Loading from '../Loading';

import Searchbox from './Searchbox';

const Personpage = ({keyword, search, ui, addHashPost, handleSearchModal}) => {
    return (
      <article className="search_wrap search_wrap_pdtop">
        <header className="person_header">

          <span>
            게시물 <span className="search_count"><NumberFormat value={search.posts.atccount} displayType={'text'} thousandSeparator={true}/></span>
          </span>
        </header>
        {search.posts.atccount>9 &&
          <div>
            <div className="grid_wrap">
              {search.posts.recent.map((contact, i) => {
                return(
                  <Searchbox
                    post={contact}
                    handleSearchModal={handleSearchModal}
                    index={i+9}
                    key={i}
                  />
                );
              })}
            </div>
          </div>
        }
        {!search.posts.moreView && search.posts.isMore ? <a className="moreview_btn_style moreview_btn" onClick={addHashPost}>더 읽어들이기</a>:null}

        {search.posts.moreView && search.posts.isMore &&
        <div className="loading_position">
          <Loading />
        </div>
        }
      </article>
    )
}

export default Personpage;
