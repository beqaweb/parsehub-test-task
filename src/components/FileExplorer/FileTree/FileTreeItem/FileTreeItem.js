import React from 'react';
import PropTypes from 'prop-types';

import './FileTreeItem.css';

export const FileTreeItem = ({type, name, onClick}) => {
  return (
    <li className="FileTreeItem">
      <span className="FileTreeItem__name" onClick={onClick}>{name}</span>
      {type === 'dir' && <span className="FileTreeItem__type">(dir)</span>}
      {type === 'file' && <span className="FileTreeItem__type">(file)</span>}
    </li>
  );
};

FileTreeItem.propTypes = {
  name: PropTypes.string,
  type: PropTypes.oneOf(['dir', 'file']),
  onClick: PropTypes.func
};

FileTreeItem.defaultProps = {
  name: null,
  type: null,
  onClick: () => undefined
};

export default FileTreeItem;