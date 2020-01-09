import React, {useState, useCallback, useEffect} from 'react';

import { navigatorService } from '../../services';

import Breadcrumb from './Breadcrumb';
import FileTree from './FileTree';

import './FileExplorer.css';

export const FileExplorer = () => {
  const [currentPath, setCurrentPath] = useState('/');
  const [currentStack, setCurrentStack] = useState(null);

  useEffect(() => {
    const subscription = navigatorService.mockData.subscribe(() => {
      navigatorService.getContents(currentPath)
        .then(stack => {
          if (!stack && currentPath !== '/') {
            setCurrentPath('/');
          } else {
            setCurrentStack(stack);
          }
        });
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [currentPath]);

  useEffect(() => {
    navigatorService.getContents(currentPath)
      .then(stack => {
        setCurrentStack(stack);
      });
  }, [currentPath]);

  const isCurrentPathIndex = useCallback(index => {
    return index === currentStack.pathArray.length - 1;
  }, [currentStack]);

  const onBreadcrumbIndexChange = useCallback(index => {
    if (isCurrentPathIndex(index)) {
      return;
    }
    setCurrentPath(currentStack.pathArray.slice(0, index + 1).join('/'));
  }, [currentStack, isCurrentPathIndex]);

  const onFileClicked = useCallback(fileName => {
    const pathWithoutSlashAtTheEnd = currentPath[currentPath.length - 1] === '/' ?
      currentPath.slice(0, currentPath.length - 1) : currentPath;
    setCurrentPath(`${pathWithoutSlashAtTheEnd}/${fileName}`);
  }, [currentPath]);

  return (
    <div className="FileExplorer">
      <Breadcrumb
        data={currentStack && currentStack.pathArray}
        onChange={onBreadcrumbIndexChange}
      />
      <FileTree
        data={currentStack}
        onFileClicked={onFileClicked}
      />
    </div>
  );
};

export default FileExplorer;