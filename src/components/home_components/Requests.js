import React, { useContext, useState } from "react";
import { RequestsContext } from "../../state/contexts/RequestsContext";
import axios from "axios";
import { getToken } from "../../api/index";
import Responses from "./Responses";
import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";

const Requests = props => {
  const { requestsList } = useContext(RequestsContext);

  const displayDate = date => {
    let res = date.slice(0, 10);
    return res;
  };

  return (
    <>
      {requestsList ? (
        requestsList.map(item => (
          <div
            onClick={() => {
              props.getResponseList(item.id);
              // props.resetThreadList();
            }}
          >
            <h3>Created: {displayDate(item.created_at)}</h3>
            {/* <h3>{getUserProfile(item.id)}</h3> */}
          </div>
        ))
      ) : (
        <p>There is no Responses made for this topic</p>
      )}
    </>
  );
};

export default Requests;

// const menu = (
//   <Menu>
//       {requestsList.map(item => {
//           return(<Menu.item>
//             <p
//             onClick={() => {
//               props.getResponseList(item.id)
//               // props.resetThreadList();
//             }}
//             >
//               Created: {item.created_at} </p>
//           </Menu.item>)
//         })}
//   </Menu>)

//   return (
//     <>
//       {requestsList.length > 0 ?
//       (<Dropdown overlay = {menu}>
//         <Button onClick={e=> e.preventDefault()}>Select a survey request <DownOutlined/></Button>
//       </Dropdown>)
//       :(
//         <p>There are no survey requests submitted for this topic</p>
//       )}
//     </>
//   );
