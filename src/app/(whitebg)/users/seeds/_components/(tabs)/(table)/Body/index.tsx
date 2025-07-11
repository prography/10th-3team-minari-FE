import {useId} from 'react';
import styles from './Body.module.css';
import Button from '@/components/Button';
import MinariBrand from '@/assets/minari-brand.svg';
import MinariBlack from '@/assets/minari-black.svg';
import MinariGray from '@/assets/minari-gray.svg';
import Badge from '@/components/Badge';

type TbState = 'text' | 'text-red' | 'text-disabled' | 'badge' | 'button';

export type TbType = {
  type: TbState;
  text: string;
  disabled?: boolean;
  onClick?: () => void;
};

interface BodyProps {
  tbs: TbType[];
}

const Body = ({tbs}: BodyProps) => {
  const id = useId();

  const TbComponent = ({type, text, onClick, disabled}: TbType) => {
    switch (type) {
      case 'text': {
        return <span>{text}</span>;
      }
      case 'text-red': {
        return (
          <span
            className={`${styles.text_red} ${disabled && styles.text_disabled}`}
            dangerouslySetInnerHTML={{__html: text}}
          />
        );
      }
      case 'badge': {
        return (
          <Badge disabled={disabled} iconLeft={disabled ? MinariGray : MinariBlack}>
            {text}
          </Badge>
        );
      }
      case 'button': {
        return (
          <Button
            disabled={disabled}
            iconLeft={MinariBrand}
            theme="black"
            size="p-4-12"
            onClick={onClick}
          >
            {text}
          </Button>
        );
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      {tbs.map((tb, idx) => (
        <div key={`${idx}_${id}`} className={`${styles.tb} ${styles[`tb${idx + 1}`]}`}>
          {TbComponent(tb)}
        </div>
      ))}
    </div>
  );
};

export default Body;
