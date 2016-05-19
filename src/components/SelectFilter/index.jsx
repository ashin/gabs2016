import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import s from './select.css';

export default React.createClass({
  mixins: [PureRenderMixin],
  update: function(event) {
    this.props.setFiltering(this.props.filter.id, event.target.value);
    e.preventdefault()
  },
  render: function() {
    const { filter } = this.props;
    return (
      <div className={s.container}>
        <span className={s.label}>{filter.name}:</span> 
        <select value={ filter.val } onChange={ this.update } className={s.select}>
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