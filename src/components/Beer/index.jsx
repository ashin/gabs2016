import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import s from './beer.css';

export default React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    const { beer } = this.props;

    return (
      <div className={s.container}>
        <div>{ beer.pos }</div>
        <div>{ beer.brewer }</div>
        <div>{ beer.name }</div>
        <div>{ beer.state }</div>
        <div>{ beer.name }</div>
        <div>{ beer.desc }</div>
        <div>{ beer.level }</div>
        <div>{ beer.style }</div>
        <div>{ beer.abv }</div>
        <div>{ beer.character }</div>
        <div>{ beer.section }</div>
      </div>
    );
  }
});
