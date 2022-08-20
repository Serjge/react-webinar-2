import React from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import './style.css';

function Layout({head, children, menu}){
  const cn = bem('Layout');

  return (
    <div className={cn()}>
      {menu}
      <div className={cn('head')}>
        {head}
      </div>
      <div className={cn('content')}>
        {children}
      </div>
    </div>
  )
}

Layout.propTypes = {
  head: propTypes.node,
  menu: propTypes.node,
  children: propTypes.node,
}

Layout.defaultProps = {
}

export default React.memo(Layout);
