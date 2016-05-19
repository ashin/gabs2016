import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import Beer from '../Beer';
import s from './beers.css';

export default React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    const { beers, showing, setShowing, setBeerState } = this.props;

    return (
      <div className={s.container}>
        { beers.map(beer => <Beer key={beer.pos} beer={beer} showing={showing} setShowing={setShowing} setBeerState={setBeerState} />) }
      </div>
    );
  }
});
