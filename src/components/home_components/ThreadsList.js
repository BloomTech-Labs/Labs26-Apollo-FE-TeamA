import React, { useContext, useState } from "react";
import { ThreadsContext } from "../../state/contexts/ThreadsContext";
import axios from "axios";

const ThreadsList = props => {
  const { threads } = useContext(ThreadsContext);

  return (
    <>
      {threads
        ? threads.map(item => (
            <div>
              <p>{item.replies}</p>
            </div>
          ))
        : null}
    </>
  );
};
export default ThreadsList;
