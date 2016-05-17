import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
  mixins: [PureRenderMixin],
  update: function(event) {
    this.props.setFiltering(this.props.filter.id, event.target.value);
  },
  render: function() {
    const { filter } = this.props;
    return (
      <div>
        {filter.name}: 
        <select value={ filter.val } onChange={ this.update }>
        	<option value="" key="none">-</option>
        	{
        		filter.values.map(filterVal => {
        			return (<option value={ filterVal } key={ filterVal }>{ filterVal }</option>);
        		})
        	}
        </select>
        
      </div>
    );
  }
});