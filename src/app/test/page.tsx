import Button from '@/components/Button/Button';

const TestPage = () => {
  return (
    <div style={{backgroundColor: '#e9e9e9', padding: '32px'}}>
      <div className="title-md">버튼</div>
      <br />
      <div style={{display: 'flex', gap: '12px'}}>
        <Button>텍스트만 gray (default)</Button>
        <Button bgColor="white">텍스트만 white</Button>
        <Button bgColor="black">텍스트만 black</Button>
        <Button disabled={true}>비활성화</Button>
      </div>
      <br />
      <div className="body-lg">테두리 border</div>
      <Button border={true}>border true</Button>
      <br />
      <div className="body-lg">오른쪽 아이콘 &apos;arrow-black&apos; / 배경 &apos;black&apos;</div>
      <Button iconRight="arrow-white" bgColor="black">
        카카오 로그인
      </Button>
      <br />
      <div className="body-lg">오른쪽 아이콘 &apos;arrow-white&apos; / 배경 props 색상</div>
      <Button iconRight="arrow-black" bgColor="#D7FF64">
        카카오 로그인
      </Button>
      <br />
      <div className="body-lg">왼쪽 아이콘 + 배경 &apos;white&apos;</div>
      <div className="body-lg">refresh / pause / stop</div>
      <div style={{display: 'flex', gap: '12px'}}>
        <Button iconLeft="refresh" bgColor="white">
          다시시작
        </Button>
        <Button iconLeft="pause" bgColor="white">
          일시정지
        </Button>
        <Button iconLeft="stop" bgColor="white">
          면접종료
        </Button>
      </div>
    </div>
  );
};

export default TestPage;
