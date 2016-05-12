import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    const { filter } = this.props;

    return (
      <div>
        SELECT: {filter.name}
      </div>
    );
  }
});