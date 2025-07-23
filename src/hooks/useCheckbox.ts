import {useEffect, useState} from 'react';
import {CheckItemType} from '@/app/(whitebg)/users/join/page';

export const useCheckbox = (items: Array<CheckItemType>) => {
  const [checkAll, setCheckAll] = useState<boolean>(false);
  const [checkAllIndeterminate, setCheckAllIndeterminate] = useState<boolean>(false);
  const [checkItems, setCheckItems] = useState<Array<CheckItemType>>(items);
  const checkHandler = (value: boolean, id?: string) => {
    if (id) {
      const idx = checkItems.findIndex((item) => item.id === id);
      checkItems[idx].value = value;
      setCheckItems([...checkItems]);
    }
  };
  const checkAllHandler = (value: boolean) => {
    checkItems.map((item) => (item.value = value));
    setCheckAll(value);
    setCheckAllIndeterminate(false);
  };
  useEffect(() => {
    if (checkItems.every((item) => item.value)) {
      setCheckAll(true);
      setCheckAllIndeterminate(false);
    } else if (checkItems.some((item) => item.value)) {
      setCheckAll(false);
      setCheckAllIndeterminate(true);
    } else {
      setCheckAll(false);
      setCheckAllIndeterminate(false);
    }
  }, [checkItems]);

  return {
    checkAll,
    checkAllIndeterminate,
    checkItems,
    checkHandler,
    checkAllHandler,
  };
};
