'use client';
import Button from '@/components/Button';
import IconButton from '@/components/IconButton';
import Instagram from '@/assets/icon/instagram.svg';
import Pause from '@/assets/icon/circle-pause.svg';
import BlackArrow from '@/assets/icon/arrow-black.svg';
import Refresh from '@/assets/icon/refresh-cw.svg';
import Stop from '@/assets/icon/circle-stop.svg';
import Loading from '@/assets/icon/loader-circle.svg';
import Checkbox from '@/components/Checkbox';
import {useState} from 'react';
import TextInput from '@/components/TextInput';
import {fetch} from '@/apis/instance';
import Modal from '@/components/Modal';
import {useModalStore} from '@/stores/modalStore';

const TestPage = () => {
  const {open: opneModal, close: closeModal} = useModalStore();

  const handleClickOpenModal = () => {
    opneModal(
      <Modal
        title="정말 계정을 탈퇴 하시겠어요?"
        leftButton={
          <Button onClick={closeModal} theme="secondary">
            취소
          </Button>
        }
        rightButton={<Button onClick={() => console.log('모달 클릭')}>계속</Button>}
      >
        <p>삭제하면 가지고 있는 모든 혜택이 사라져요.</p>
        <p>진행 이후 7일 이내에 복구가 가능해요.</p>
      </Modal>,
    );
  };
  const [check, setCheck] = useState(false);
  const checkHandler = () => {
    setCheck(true);
  };

  const [inputValue, setInputValue] = useState('');

  const deleteUser = () => {
    fetch.delete('/users/me ');
  };
  return (
    <>
      <Button onClick={handleClickOpenModal}>open Modal</Button>
      <div className="title-md">버튼</div>
      <br />
      <div className="title-sm">text only</div>
      <br />
      <div style={{display: 'flex', gap: '12px'}}>
        <Button theme="primary">Primary Button</Button>
        <Button theme="primary" rounded onClick={deleteUser}>
          클릭하면 탈퇴
        </Button>
        <Button theme="primary" border>
          Primary w/Border
        </Button>
      </div>
      <br />
      <div style={{display: 'flex', gap: '12px'}}>
        <Button theme="primary" disabled>
          Primary Disabled
        </Button>
        <Button theme="primary" border disabled>
          Primary w/Border Disabled
        </Button>
      </div>
      <br />
      <br />
      <div style={{display: 'flex', gap: '12px'}}>
        <Button theme="secondary">Secondary Button</Button>
        <Button theme="secondary" border>
          Secondary w/Border
        </Button>
      </div>
      <br />
      <div style={{display: 'flex', gap: '12px'}}>
        <Button theme="secondary" disabled>
          Secondary Disabled
        </Button>
        <Button theme="secondary" border disabled>
          Secondary w/Border Disabled
        </Button>
      </div>
      <br />
      <br />
      <div style={{display: 'flex', gap: '12px'}}>
        <Button theme="white">White Button</Button>
        <Button theme="black">Black Button</Button>
      </div>
      <br />
      <br />
      <div className="title-sm">with icon</div>
      <br />
      <div style={{display: 'flex', gap: '12px'}}>
        <Button iconLeft={Pause} theme="secondary" iconRight={Loading} loading>
          동일버튼 로딩ㅇ
        </Button>
        <Button iconLeft={Pause} theme="secondary" iconRight={Loading} loading={false}>
          동일버튼 로딩x
        </Button>
      </div>
      <br />
      <div className="body-lg">오른쪽 아이콘 &apos;arrow-black&apos;</div>
      <div style={{display: 'flex', gap: '12px'}}>
        <Button iconRight={BlackArrow}>카카오 로그인</Button>
        <Button iconRight={BlackArrow} onClick={handleClickOpenModal}>
          클릭하면 ?
        </Button>
      </div>
      <br />
      <div className="body-lg">왼쪽 아이콘</div>
      <div className="body-lg">refresh / pause / stop</div>
      <div style={{display: 'flex', gap: '12px'}}>
        <Button iconLeft={Refresh}>다시시작</Button>
        <Button iconLeft={Pause}>일시정지</Button>
        <Button iconLeft={Stop}>면접종료</Button>
      </div>
      <br />
      <br />
      <div className="title-sm">아이콘 버튼</div>
      <div style={{display: 'flex', gap: '12px'}}>
        <IconButton icon={Instagram} />
        <IconButton icon={Instagram} theme="secondary" />
        <IconButton icon={Instagram} theme="white" />
      </div>
      <br />
      <br />
      <div style={{display: 'flex', gap: '12px'}}>
        <IconButton icon={Loading} theme="primary" loading />
        <IconButton icon={Loading} theme="white" />
      </div>
      <br />
      <br />
      <div className="title-md">체크박스</div>
      <br />
      <Checkbox checked={check} onChangeCheck={checkHandler} setChecked={setCheck}>
        클릭해서 체크 박스 테스트
      </Checkbox>
      <Checkbox checked={true} onChangeCheck={checkHandler} disabled={true}>
        disabled / checked
      </Checkbox>
      <Checkbox checked={false} onChangeCheck={checkHandler} disabled={true}>
        disabled / not-checked
      </Checkbox>
      <br />
      <br />
      <div className="title-md">텍스트 인풋</div>
      <br />
      <TextInput value={inputValue} setValue={setInputValue} />
      <br />
      <TextInput
        value={inputValue}
        setValue={setInputValue}
        label={'라벨이 있는 인풋'}
        type="email"
      />
      <br />
      <TextInput value={'disabled'} setValue={setInputValue} disabled={true} />
      <br />
      <br />
      <br />
      <br />
    </>
  );
};

export default TestPage;
