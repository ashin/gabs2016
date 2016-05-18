import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import s from './beer.css';

export default React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    const { beer, showing, setShowing } = this.props;
    
    const renderBody = (beer, s) => (
      <div className={s.body}>
        <div className={s.character}>{ beer.character }</div>
        <div className={s.desc}>{ beer.desc }</div>
      </div>
    )

    return (
      <div className={s.container}>
        <div className={s.head}>
          <a title={beer.container} className={s.pos}>
            { beer.pos }
          </a>
          <div className={s.nameContainer}>
            <div className={s.brewerWrapper}>
              <span className={s.brewer} title={ beer.brewer }>{ beer.brewer }&nbsp;</span>
              <span className={s.state}>({ beer.state })</span>
            </div>
            <div className={s.name}>{ beer.name }</div>
          </div>
          <div className={s.styleContainer}>
            <div className={s.style} title={ beer.style }>{ beer.style }</div>
            <div className={s.abvContainer}>
              <div className={s.abv}>{ beer.abv }%</div>
              <div className={s.cost}>
                ${ beer.glass.cost }
                { !beer.glass.fullsize ? (<span className={s.glass}> (half)</span>) : '' }
              </div>
              <div className={s['level--' + String(beer.levelName).toLowerCase()]}>{ beer.levelName }</div>
            </div>
          </div>
          <div className={s.toggle}>
            <a onClick={ setShowing.apply(beer.pos) }>
              { (showing === beer.pos) ? 'show' : 'hide' }
            </a>
          </div>
        </div>
        { (showing === beer.pos) ? renderBody(beer, s) : '' }
      </div>
    );
  }
});
