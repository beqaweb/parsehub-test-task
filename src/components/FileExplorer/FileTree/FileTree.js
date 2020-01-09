import React, {useMemo, useCallback} from 'react';
import PropTypes from 'prop-types';

import './FileTree.css';
import FileTreeItem from './FileTreeItem/FileTreeItem';

export const FileTree = ({data, onFileClicked}) => {
  const {name, type, hasContents, children} = useMemo(() => data || {}, [data]);

  const fileTreeItemClicked = useCallback(name => () => {
    onFileClicked(name);
  }, [onFileClicked]);

  return (
    <div className="FileTree">
      {(type === 'dir' && hasContents) && (
        <ul className="FileTree-list">
          {children.map(({name: childName, type: childType}) => (
            <FileTreeItem
              key={`${childName}${childType}`}
              name={childName}
              type={childType}
              onClick={fileTreeItemClicked(childName)}
            />
          ))}
        </ul>
      )}
      {type === 'file' && (
        <h3 className="FileTree-list__details">THIS IS FILE: <strong>{name}</strong></h3>
      )}
    </div>
  );
};

FileTree.propTypes = {
  data: PropTypes.object,
  onFileClicked: PropTypes.func
};

FileTree.defaultProps = {
  data: null,
  onFileClicked: () => undefined
};

export default FileTree;