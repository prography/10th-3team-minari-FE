import Button from '@/components/Button';
import {useModalStore} from '@/stores/modalStore';
import QRCodeModal from '../QRCodeModal';

const BuyTab = () => {
  const {open} = useModalStore();

  const handleClick = () => {
    open(<QRCodeModal />);
  };

  return (
    <div>
      <span className="title-xs">씨앗 모종 사기</span>
      <Button onClick={handleClick}>100원</Button>
    </div>
  );
};

export default BuyTab;
