import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import s from './sort.css';

export default React.createClass({
  mixins: [PureRenderMixin],
  updateSorting: function(event) {
  	this.props.setSortBy(event.target.value)
  },
  render: function() {
    const { sorters, sortBy, sortingDirection, toggleSortDir } = this.props;
    return (
      <div className={s.container}>
        Sort by:
        <select value={ sortBy } onChange={ this.updateSorting }>
        	{ sorters.map(sort => (<option value={sort.id}>{ sort.name }</option>)) }
        </select>
        <a className={s.toggle} onClick={toggleSortDir}>
        	{ sortingDirection === 'ASC' ? 'up' : 'down' }
        </a>
      </div>
    );
  }
});