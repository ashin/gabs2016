import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import s from './text.css'

export default React.createClass({
  mixins: [PureRenderMixin],
  update: function() {
    this.props.setFiltering(this.props.filter.id, this.refs.text.value);
  },
  render: function() {
    const { filter } = this.props;
    
    return (
      <input type="text" ref="text" onKeyUp={ this.update } className={s.container} placeholder="Search..." />
    );
  }
});