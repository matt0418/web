import React from "react";
import { Link } from "react-router-dom";

// Dependencies for search
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, SearchBox, Hits } from "react-instantsearch-dom";

// Styles
import styled from "styled-components";
import "../App.css";

const searchClient = algoliasearch(
  "QD6TWFQZCN",
  "028bde3e8ce26fd3245e84b3807905b9"
);

const FakeSearchInput = styled.input`
  width: 43%;
  height: 60px;
  padding-left: 3%;
  font-size: .9rem;
  font-weight: lighter;
  border-radius: 2px;
  box-shadow: 1px 2px 4px 2px #00000050;
  color: #9B9B9B;

  @media (max-width: 1024px) {
    margin-right: 28%;
  }

  @media (max-width: 600px) {
    margin-right: 0;
    width: 100%;
    display: flex;
  }

  @media print {
    display: none;
  }
`;

const FakeSearchInputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

    @media (max-width: 600px) {
    width: 100%;
    display: flex;
    margin-bottom: 20px;
    margin-left: 0;
`;

const FakeSearchButton = styled.div`
  width: 125px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  background-color: #656176;
  border-radius: 2px;
  color: white;
  margin: 0 5% 0 2%;
  box-shadow: 1px 2px 4px 2px #00000050;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const InstantSearchContainer = styled.div`
  margin: 50px 0 0 0;
`;

const SearchBoxContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 75%;
  margin-left: 12.5%;

  @media (max-width: 600px) {
    margin-left: 5%;
  }
`;

const SearchResultsContainer = styled.div`
  padding: 5% 0 0 0;
  height: 83vh;
  width: 100vw;

  @media (max-width: 600px) {
    width: 70%;
  }
`;

const StyledHit = styled.div`
  margin-bottom: 2%;
  font-size: 1.4rem;
  color: white;

  @media (max-width: 1024px) {
    font-size: 1.2rem;
  }

  @media (max-width: 600px) {
    font-size: 1rem;
    display: flex;
    flex-wrap: wrap;
  }
`;

const Search = styled.div`
  width: 90%;
`;

const hitCom = props => {
  return (
    <Link to={`/home/shelters/all/${props.hit.linkId}`}>
      <div>
        <StyledHit>{props.hit.name}</StyledHit>
      </div>
    </Link>
  );
};

class SearchBar extends React.Component {
  constructor() {
    super();
    this.state = {
      // setting state to determing wether to display real search
      searchEnabled: false
    };
  }

  // functions for toggling state of search display
  enableSearch = e => {
    e.preventDefault();
    this.setState({
      searchEnabled: true
    });
  };

  disableSearch = e => {
    e.preventDefault();
    this.setState({
      searchEnabled: false
    });
  };

  render() {
    return (
      <Search>
        <Modal show={this.state.searchEnabled} close={this.disableSearch}>
          <InstantSearchContainer className="mainSearch">
          {/* Instant seatrch requires an indexname and the search client */}
            <InstantSearch indexName="empact" searchClient={searchClient}>
              <SearchBoxContainer>
                <SearchBox />
              </SearchBoxContainer>
              <SearchResultsContainer>
                {/* Hits needs a hitComponent */}
                <Hits hitComponent={hitCom}/>
              </SearchResultsContainer>
            </InstantSearch>
          </InstantSearchContainer>
        </Modal>
        <FakeSearchInputContainer onClick={this.enableSearch}>
          <FakeSearchInput placeholder="search for resources you need" />
          <FakeSearchButton>SEARCH</FakeSearchButton>
        </FakeSearchInputContainer>
      </Search>
    );
  }
}

const Modal = ({ close, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <div>{children}</div>
        <div className="closeButton" onClick={close}>
          X
        </div>
      </section>
    </div>
  );
};

export default SearchBar;
