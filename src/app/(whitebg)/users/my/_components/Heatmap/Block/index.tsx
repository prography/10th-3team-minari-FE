import styles from '@/app/(whitebg)/users/my/_components/Heatmap/Blocks/Blocks.module.css';
import Image from 'next/image';
import Check from '@/assets/icon/check.svg';
import {useDate} from '@/hooks/useDate';
import {BlockType} from '@/contexts/UserHeatmapProvider';

interface BlockProps {
  block: BlockType;
  onClickBlock: (block: BlockType) => void;
}
const Block = ({block, onClickBlock}: BlockProps) => {
  const {dateFormatterKorean} = useDate();

  return (
    <div
      className={`${styles.blocks} ${block.done ? `${styles.done}` : ''} ${block.active ? `${styles.active}` : ''}`}
      onClick={() => {
        onClickBlock(block);
      }}
    >
      <a
        data-tooltip-id="minari-tooltip"
        data-tooltip-content={dateFormatterKorean(typeof block.date === 'string' ? block.date : '')}
      >
        {block.active && <Image src={Check} alt="" />}
      </a>
    </div>
  );
};

export default Block;
