'use client';
import Button from '@/components/Button/Button';
import IconButton from '@/components/IconButton/IconButton';
import Instagram from '@/assets/icon/instagram.svg';
import Pause from '@/assets/icon/circle-pause.svg';
import BlackArrow from '@/assets/icon/arrow-black.svg';
import Refresh from '@/assets/icon/refresh-cw.svg';
import Stop from '@/assets/icon/circle-stop.svg';
import Loading from '@/assets/icon/loader-circle.svg';
import LayoutWrapper from '@/components/LayoutWrapper/LayoutWrapper';

const TestPage = () => {
  // TODO : icon button 컴포넌트 추가

  const onClickButton = () => {
    window.alert('button clicked !!');
  };

  return (
    <LayoutWrapper>
      <div className="title-md">버튼</div>
      <br />
      <div className="title-sm">text only</div>
      <br />
      <div style={{display: 'flex', gap: '12px'}}>
        <Button theme="primary">Primary Button</Button>
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
        <Button iconRight={BlackArrow} onClick={onClickButton}>
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
      <div className="title-sm">‼️ 아이콘 버튼 추가 예정</div>
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
    </LayoutWrapper>
  );
};

export default TestPage;
