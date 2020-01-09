import React from 'react';
import PropTypes from 'prop-types';

import './BreadcrumbItem.css';

export const BreadcrumbItem = ({name, isLast, isCurrent, onClick}) => {
  return (
    <div className="BreadcrumbItem">
      <span
        className={[
          "BreadcrumbItem__name",
          isCurrent && 'current'
        ].join(' ')}
        onClick={onClick}
      >{name}</span>
      {!isLast && <span className="BreadcrumbItem__arrow">></span>}
    </div>
  );
};

BreadcrumbItem.propTypes = {
  name: PropTypes.string,
  isLast: PropTypes.bool,
  isCurrent: PropTypes.bool,
  onClick: PropTypes.func
};

BreadcrumbItem.defaultProps = {
  name: '',
  isLast: false,
  isCurrent: false,
  onClick: () => undefined
};

export default BreadcrumbItem;