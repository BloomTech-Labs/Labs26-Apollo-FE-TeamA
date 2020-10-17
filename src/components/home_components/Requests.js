import React, { useContext } from "react";
import { RequestsContext } from "../../state/contexts/RequestsContext";
import Moment from "react-moment";
import { Select } from "antd";

const Requests = props => {
  const { requestsList } = useContext(RequestsContext);
  const { Option } = Select;

  const handleChange = id => {
    props.getResponseList(id);
  };

  return (
    <>
      <Select defaultValue="Select a request" onChange={handleChange}>
        {requestsList.map(request => {
          return (
            <Option value={request.id}>
              <Moment format="MM/DD/YYYY">{request.created_at}</Moment>
            </Option>
          );
        })}
      </Select>
    </>
  );
};

export default Requests;
