import React, {useState, useCallback} from 'react';
import PropTypes from 'prop-types';

import './CodeWrapper.css';
import { navigatorService } from '../../services';

export const CodeWrapper = ({onDataChange}) => {
  const [text, setText] = useState(() => JSON.stringify(navigatorService.mockData.value, null, 2));

  const onTextChange = useCallback(ev => {
    setText(ev.target.value);
  }, []);

  const onTryButtonClick = useCallback(() => {
    navigatorService.updateMockData(text);
  }, [text]);

  return (
    <div className="CodeWrapper">
      <textarea className="CodeWrapper__textarea" value={text} onChange={onTextChange}></textarea>
      <button className="CodeWrapper__button" onClick={onTryButtonClick}>TRY IT</button>
    </div>
  );
};

CodeWrapper.propTypes = {
  onDataChange: PropTypes.func
};

CodeWrapper.defaultProps = {
  onDataChange: () => undefined
};

export default CodeWrapper;