import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import * as actionCreators from '../../actionCreators';

import Filters from '../Filters';
import Beers from '../Beers';
import Sort from '../Sort';
import s from './list.css';

export const List = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    const { beers, filters, setFiltering, sorters, setSortBy, toggleSortDir, sortBy, sortingDirection, showing, setShowing, setBeerState } = this.props;
    return (
      <div className={s.container}>
        <Filters filters={filters} setFiltering={setFiltering} />
        <Sort sorters={sorters}
              setSortBy={setSortBy}
              sortBy={sortBy}
              sortingDirection={sortingDirection}
              toggleSortDir={toggleSortDir}
        />
        <Beers beers={beers} showing={showing} setShowing={setShowing} setBeerState={setBeerState} />
      </div>
    );
  }
});

function mapStateToProps(state) {
  const beers = state.get('filteredBeers');
  const filtering = state.get('filtering');
  const filters = state.get('filters');
  const sorters = state.get('sorters');
  const sortBy = state.get('sortBy');
  const sortingDirection = state.get('sortingDirection');
  const showing = state.get('showing');
  return {
  	beers,
    filters: filters.toList(),
    filtering,
    sorters,
    sortBy,
    sortingDirection,
    showing
  }
}

export const ListContainer = connect(mapStateToProps, actionCreators)(List);
