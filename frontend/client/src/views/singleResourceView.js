import React from "react";
import Header from "../components/Header.js";
import TabNavforSubView from "../components/TabNavforSubView";
import SingleResource from "../components/SingleResource";
import styled from "styled-components";

const SingleResourceContainer = styled.div`
  max-width: 1366px;
  width: 94%;
  display: flex;
  margin: 0 auto;
`;

const SingleResourceView = props => {
  return (
    <div>
      <Header />
      <TabNavforSubView props={props} />
      <SingleResourceContainer>
        <SingleResource props={props} />
      </SingleResourceContainer>
    </div>
  );
};

export default SingleResourceView;
