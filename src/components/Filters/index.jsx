import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import s from './filters.css';

import Text from '../TextFilter'
import Select from '../SelectFilter'

const FILTERS = {
	text: Text,
	select: Select
};

function getFilterName(filter) {
	const TYPE = filter.type;
	if(!FILTERS[TYPE]) {
		console.warn('Filter ' + TYPE + 'doesn\'t exists, brah.')
	}
	return FILTERS[filter.type];
}

function buildFilter(filter, setFiltering) {
	const ComponentType = getFilterName(filter);
    return (
    	<ComponentType key={filter.id} filter={filter} setFiltering={setFiltering} />
    );
}

export default React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    const { filters, setFiltering } = this.props;
    return (
      <div className={s.container}>
        { filters.map(filter => buildFilter(filter, setFiltering)) }
      </div>
    );
  }
});