import Button from '@/components/Button';
import React, {useEffect} from 'react';
import CircleArrowLeft from '@/assets/icon/circle-arrow-left.svg';
import CirclePause from '@/assets/icon/circle-pause.svg';
import CirclePlay from '@/assets/icon/circle-play.svg';
import CircleStop from '@/assets/icon/circle-stop.svg';
import Pen from '@/assets/icon/pen.svg';
import useRearsal from '@/hooks/useRearsal';
import styles from './Buttons.module.css';
import {useTimer} from '@/contexts/TimerProvider';
import {useNotepad} from '@/contexts/NotepadProvider';
import {useVideoState} from '@/contexts/VideoStateProvider';

const Buttons = () => {
  const {handleCloseClick} = useRearsal();
  const {handlePause, handleRestart, handleStart, handleStop} = useTimer();
  const {handleOpen} = useNotepad();
  const {handleCount, videoState, handleStop: handleVideoStop} = useVideoState();

  useEffect(() => {
    if (videoState === 'DONE') {
      handleStart();
    }
  }, [videoState, handleStart]);

  const startClick = () => {
    handleCount();
  };

  const pauseClick = () => {
    handleVideoStop();
    handlePause();
  };

  const stopClick = () => {
    handleStop();
    handleCloseClick();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.control_buttons}>
        <Button onClick={handleRestart} iconRight={CircleArrowLeft} theme="secondary">
          처음부터
        </Button>
        <Button onClick={pauseClick} iconRight={CirclePause} theme="secondary">
          일시정지
        </Button>
        <Button onClick={startClick} iconRight={CirclePlay} theme="secondary">
          시작
        </Button>
        <Button onClick={stopClick} iconRight={CircleStop} theme="secondary">
          종료
        </Button>
      </div>

      <Button onClick={handleOpen} iconRight={Pen}>
        메모
      </Button>
    </div>
  );
};

export default Buttons;
