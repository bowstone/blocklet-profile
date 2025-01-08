import { useState } from 'react';
import { Call1Icon, CloseCircleIcon } from 'tdesign-icons-react';
import { Button } from 'tdesign-react';

import { KeyBroad } from './components';
import './home.less';

function Home() {
  const [inputValue, setInputValue] = useState<string[]>([]);

  const handleKeyClick = (value: string, isAdd: boolean) => {
    setInputValue((prev) => {
      const { length } = prev;
      if (isAdd) {
        return [...prev, value];
      }
      const newValues = [...prev];
      newValues[length - 1] = value;
      return newValues;
    });
  };
  const handleClose = () => {
    setInputValue((prev) => {
      const newValue = [...prev];
      newValue.pop();
      return newValue;
    });
  };
  const hasInput = inputValue?.length > 0;
  return (
    <div className="home-page-wappr">
      <div className="display-wapper"> {inputValue.join('')}</div>
      <KeyBroad onChange={handleKeyClick} />
      <div className="confrom-actions">
        <Button shape="circle" className="btn-call" icon={<Call1Icon />} />
        {hasInput && <Button className="btn-delete" icon={<CloseCircleIcon />} onClick={handleClose} />}
      </div>
    </div>
  );
}

export default Home;
