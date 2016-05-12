import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import * as actionCreators from '../../actionCreators';

import { filterBeers, objectToArray } from '../../core';
import Filters from '../Filters';
import Beers from '../Beers';
import s from './list.css';

export const List = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    const { beers, filters, setFiltering } = this.props;
    return (
      <div className={s.container}>
        <Filters filters={filters} setFiltering={setFiltering} />
        <Beers beers={beers} />
      </div>
    );
  }
});

function mapStateToProps(state) {
  const beers = state.get('beers');
  const filtering = state.get('filtering');
  const filters = state.get('filters');
  return {
  	beers: filterBeers(beers, filtering),
    filters: filters.toList(),
    filtering
  }
}

export const ListContainer = connect(mapStateToProps, actionCreators)(List);
