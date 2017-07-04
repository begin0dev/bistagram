import React from 'react';

const Modalpaging = ({search, index}) => {
    return (
      <div className="modal_paging_div">
        <table className="modal_paging_table">
          <tbody>
            <tr>
              {search.modalpost.media.map((contact, i) => {
                return(
                  <td key={i}>
                    <div className={`modal_paging_circle ${index===i&&"modal_paging_selete"}`}></div>
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
    )
}

export default Modalpaging;
