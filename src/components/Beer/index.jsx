import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import BeerState from '../BeerState';
import s from './beer.css';

export default React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    const { beer, showing, setShowing, setBeerState } = this.props;
    const isActive = (showing === beer.pos);
    const classLevel = s['level--' + String(beer.levelName).toLowerCase()];
    const containerClass = isActive ? s.containerActive : s.container;
    
    const renderBody = (beer, s) => (
      <div className={s.body}>
        <div className={s.character}>{ beer.character }</div>
        <div className={s.desc}>{ beer.desc }</div>
      </div>
    );

    return (
      <div className={ containerClass } onClick={() => setShowing(beer.pos) }>
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
                { !beer.glass.fullsize ? (<span className={s.glass}>(½)</span>) : '' }
              </div>
              <div className={ classLevel }>{ beer.levelName }</div>
              <BeerState pos={beer.pos} state={beer.userState} setBeerState={setBeerState} />
            </div>
          </div>
        </div>
        { isActive ? renderBody(beer, s) : '' }
      </div>
    );
  }
});
