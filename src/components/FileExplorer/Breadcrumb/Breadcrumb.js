import React, {useCallback, useMemo} from 'react';
import PropTypes from 'prop-types';

import BreadcrumbItem from './BreadcrumbItem';

import './Breadcrumb.css';

export const Breadcrumb = ({data, onChange}) => {
  const onBreadcrumbItemClick = useCallback(index => () => {
    onChange(index);
  }, [onChange]);

  const dataLength = useMemo(() => !!data && data.length, [data]);

  if (!data) {
    return null;
  }

  return (
    <div className="Breadcrumb">
      {data.map((name, index) => (
        <BreadcrumbItem
          key={`${index}${name}`}
          name={name}
          isLast={index + 1 === dataLength}
          isCurrent={name === data[dataLength - 1]}
          onClick={onBreadcrumbItemClick(index)}
        />
      ))}
    </div>
  );
};

Breadcrumb.propTypes = {
  data: PropTypes.array,
  onChange: PropTypes.func
};

Breadcrumb.defaultProps = {
  data: [],
  onChange: () => undefined
};

export default Breadcrumb;