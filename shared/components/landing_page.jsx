import React from 'react';
import {Component} from 'react';
import FancySearchBar from './fancy_search_bar';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class LandingPage extends Component {
  render() {
    return (
    <div>
      <div className="about-landing">
        <div className="left-banner"><h1>What's trending?</h1></div>
        <div className="right-banner"><FancySearchBar /></div>
        <h3>Correlations and trends made simple.</h3>
        {/*<p>
          Culture drives business. Trendr's goal is simple: demonstrate this relationship by visualizing correlations in big data. By combining Google Trends and the historical returns of US Listed Stocks, Trendr uses the Alchemy API and Natural Language Processing to find correlations between popular Google Search terms and companies.
        </p>*/}
      </div>
      {/*<div className="col-md-offset-5">
      <SearchBar />
      </div>*/}
      {/*<div className="listLanding spacer">
        <HotTrends />
      </div>
      <About />*/}
    </div>
    );
  }
}
