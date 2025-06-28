import Button from '@/components/Button';
import React, {useEffect} from 'react';
import CircleArrowLeft from '@/assets/icon/circle-arrow-left.svg';
import CirclePause from '@/assets/icon/circle-pause.svg';
import CirclePlay from '@/assets/icon/circle-play.svg';
import CircleStop from '@/assets/icon/circle-stop.svg';
import Pen from '@/assets/icon/pen.svg';
import useRehearsal from '@/hooks/useRehearsal';
import styles from './Buttons.module.css';
import {useTimer} from '@/contexts/TimerProvider';
import {useNotepad} from '@/contexts/NotepadProvider';
import {useVideoState} from '@/contexts/VideoStateProvider';
import {useCompleteModal} from '@/contexts/CompleteModalProvider';
import {useUserStore} from '@/stores/userStore';

const Buttons = () => {
  const {
    recordingStatus,
    handleRearsalStart,
    handleRearsalClose,
    handleRearsalPause,
    handleRearsalRestart,
  } = useRehearsal();
  const {seconds, handlePause, handleRestart, handleStart, handleStop} = useTimer();
  const {videoState, handleCountStart, handleCountPause, handleCountStop, handleCountRestart} =
    useVideoState();
  const {handleOpen, memo} = useNotepad();
  const {handleOpen: ModalOpen} = useCompleteModal();
  const {userId} = useUserStore();

  useEffect(() => {
    if (videoState === 'DONE' && recordingStatus !== 'recording') {
      handleStart();
      handleRearsalStart();
    }
  }, [videoState, recordingStatus, handleStart, handleRearsalStart]);

  useEffect(() => {
    if (seconds === 0) {
      handleStop();
      handleCountStop();
      handleRearsalClose({userId, questionId: 5, memo});
    }
  }, [seconds, handleStop, handleCountStop, handleRearsalClose]);

  const startClick = () => {
    handleCountStart();
  };

  const pauseClick = () => {
    handlePause();
    handleCountPause();
    handleRearsalPause();
  };

  const restartClick = () => {
    handleRestart();
    handleCountRestart();
    handleRearsalRestart();
  };

  const stopClick = () => {
    handleStop();
    handleCountStop();
    handleRearsalClose({userId, questionId: 5, memo});
    ModalOpen();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.control_buttons}>
        <Button onClick={restartClick} iconRight={CircleArrowLeft} theme="secondary">
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
