import { useState } from 'react';

const useAdaptiveCell = () => {
  const [activeCell, setActiveCell] = useState({
    id: '',
    isClicked: false,
  });

  const onClickCellHandler = (e, orderId) => {
    if (!activeCell.id || activeCell.id !== orderId) {
      setActiveCell({
        id: orderId,
        isClicked: true,
      });
    } else {
      setActiveCell({
        id: orderId,
        isClicked: !activeCell.isClicked,
      });
    }
  };

  const adaptiveCell = (orderId) => {
    if (activeCell.id === orderId) {
      return activeCell.isClicked ? ' cell-expanded' : 'text-truncate cell-truncated';
    }
    return 'text-truncate cell-truncated';
  };

  return { onClickCellHandler, adaptiveCell };
};

export default useAdaptiveCell;
