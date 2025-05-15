'use client';
import Button from '@/components/Button/Button';

const TestPage = () => {
  // TODO : icon button 컴포넌트 추가

  const onClickButton = () => {
    window.alert('button clicked !!');
  };

  return (
    <div style={{padding: '32px'}}>
      <div className="title-md">버튼</div>
      <br />
      <div className="title-sm">text only</div>
      <br />
      <div style={{display: 'flex', gap: '12px'}}>
        <Button type="primary">Primary Button</Button>
        <Button type="primary" border>
          Primary w/Border
        </Button>
      </div>
      <br />
      <div style={{display: 'flex', gap: '12px'}}>
        <Button type="primary" disabled>
          Primary Disabled
        </Button>
        <Button type="primary" border disabled>
          Primary w/Border Disabled
        </Button>
      </div>
      <br />
      <br />
      <div style={{display: 'flex', gap: '12px'}}>
        <Button type="secondary">Secondary Button</Button>
        <Button type="secondary" border>
          Secondary w/Border
        </Button>
      </div>
      <br />
      <div style={{display: 'flex', gap: '12px'}}>
        <Button type="secondary" disabled>
          Secondary Disabled
        </Button>
        <Button type="secondary" border disabled>
          Secondary w/Border Disabled
        </Button>
      </div>
      <br />
      <br />
      <div style={{display: 'flex', gap: '12px'}}>
        <Button type="white">White Button</Button>
        <Button type="black">Black Button</Button>
      </div>
      <br />
      <br />
      <div className="title-sm">with icon</div>
      <br />
      <div style={{display: 'flex', gap: '12px'}}>
        <Button iconLeft="pause" type="secondary" loading>
          동일버튼 로딩ㅇ
        </Button>
        <Button iconLeft="pause" type="secondary" loading={false}>
          동일버튼 로딩x
        </Button>
      </div>
      <br />
      <div className="body-lg">오른쪽 아이콘 &apos;arrow-black&apos;</div>
      <div style={{display: 'flex', gap: '12px'}}>
        <Button iconRight="arrow-black">카카오 로그인</Button>
        <Button iconRight="arrow-black" onClick={onClickButton}>
          클릭하면 ?
        </Button>
      </div>
      <br />
      <div className="body-lg">왼쪽 아이콘</div>
      <div className="body-lg">refresh / pause / stop</div>
      <div style={{display: 'flex', gap: '12px'}}>
        <Button iconLeft="refresh">다시시작</Button>
        <Button iconLeft="pause">일시정지</Button>
        <Button iconLeft="stop">면접종료</Button>
      </div>
      <br />
      <br />
      <div className="title-sm">‼️ 아이콘 버튼 추가 예정</div>
    </div>
  );
};

export default TestPage;
