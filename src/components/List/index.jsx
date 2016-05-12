import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import * as actionCreators from '../../actionCreators';

import s from './list.css';

export const List = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    const { beers } = this.props;
    return (
      <div className={s.container}>
        { beers.map(beer => <div>{beer.name}</div>) }
      </div>
    );
  }
});

function mapStateToProps(state) {
  console.log(state.toJS());
  return {
  	beers: state.get('beers'),
  }
}

export const ListContainer = connect(mapStateToProps, actionCreators)(List);
