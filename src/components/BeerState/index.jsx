import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
  mixins: [PureRenderMixin],
  updateState: function(e) {
    const ind = Number(this.props.pos) - 1;
    this.props.setBeerState(ind, e.target.value);
  },
  render: function() {
    const { state } = this.props;
    
    return (
      <select value={state} onChange={this.updateState}>
        <option value="5">-</option>
        <option value="4">want</option>
        <option value="1">good</option>
        <option value="2">meh</option>
        <option value="3">bad</option>
      </select>
    );
  }
});


