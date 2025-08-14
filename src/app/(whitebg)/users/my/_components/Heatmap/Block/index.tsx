import styles from '@/app/(whitebg)/users/my/_components/Heatmap/Blocks/Blocks.module.css';
import Image from 'next/image';
import Check from '@/assets/icon/check.svg';
import {useDate} from '@/hooks/useDate';
import {BlockType} from '@/contexts/UserHeatmapProvider';

interface BlockProps {
  block: BlockType;
  height?: number;
  onClickBlock: (block: BlockType) => void;
}
const Block = ({block, height, onClickBlock}: BlockProps) => {
  const {dateFormatterKorean} = useDate();

  return (
    <div
      style={{height: height ? `${height}px` : ''}}
      className={`${styles.blocks} ${block.done ? `${styles.done}` : ''} ${block.active ? `${styles.active}` : ''}`}
      onClick={() => {
        onClickBlock(block);
      }}
    >
      <button
        data-tooltip-id="minari-tooltip"
        data-tooltip-content={dateFormatterKorean(typeof block.date === 'string' ? block.date : '')}
      >
        {block.active && (
          <Image src={Check} alt="" width={height ? 14 : 23} height={height ? 14 : 23} />
        )}
      </button>
    </div>
  );
};

export default Block;
