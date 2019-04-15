import React from "react";
import Header from "../components/Header.js";
import ResourceList from "../components/ResourceList";
import TabNavforSubView from "../components/TabNavforSubView";

const SubCategoryList = props => {
  return (
    <div>
      <Header />
      <TabNavforSubView props={props} />
      <h1>TabNavforSubView</h1>
      <ResourceList props={props} />
    </div>
  );
};

export default SubCategoryList;
