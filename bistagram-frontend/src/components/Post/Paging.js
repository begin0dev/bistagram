import React from 'react';

const Paging = ({index, media}) => {
    return (
      <div className="postview_imgpaging_div">
				<table className="postview_imgpaging_tb">
					<tbody>
						<tr>
							{media.map((contact, i) => {
								return(
								<td key={i}>
									{i === index ?
										(<div className="postview_imgpaging_radiusdiv paging_color_blue"></div>):
										(<div className="postview_imgpaging_radiusdiv paging_color_gray"></div>)
									}
								</td>
								);
							})}
						</tr>
					</tbody>
				</table>
			</div>
    )
}

export default Paging;
