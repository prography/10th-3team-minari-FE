import styles from './DateSelector.module.css';
import Image from 'next/image';
import Up from '@/assets/icon/chevron-up-white.svg';
import Down from '@/assets/icon/chevron-down-white.svg';

export type DateSelectorOptionType = {
  label: string;
  value: string | number;
};

interface DateSelectorProps {
  label: string;
  options: DateSelectorOptionType[];
  optionsShow: boolean;
  setOptionsShow: (show: boolean) => void;
  onClickOption: (option: DateSelectorOptionType) => void;
}

const DateSelector = ({
  label,
  options,
  optionsShow,
  setOptionsShow,
  onClickOption,
}: DateSelectorProps) => {
  const onClick = (option: DateSelectorOptionType) => {
    onClickOption(option);
    setOptionsShow(false);
  };
  return (
    <div className={styles.container}>
      <div className={styles['label__wrap']} onClick={() => setOptionsShow(!optionsShow)}>
        <div className="txt-white label-md">{label}</div>
        <Image src={optionsShow ? Up : Down} alt="icon" />
      </div>
      {optionsShow && (
        <div className={styles['options__wrap']}>
          {options?.map((option, index) => (
            <div className={styles.options} key={index} onClick={() => onClick(option)}>
              <span className="txt-white label-md">{option?.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DateSelector;
