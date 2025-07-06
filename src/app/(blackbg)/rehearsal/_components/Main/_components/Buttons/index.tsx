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
import {useQuestionId} from '@/hooks/queries/useQuestionId';

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
  const {data: questionId} = useQuestionId();
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
      handleRearsalClose({userId, questionId: questionId ?? 0, memo});
    }
  }, [seconds, handleStop, handleCountStop, handleRearsalClose]);

  const restartClick = () => {
    handleRestart();
    handleCountRestart();
    handleRearsalRestart();
  };

  const pauseClick = () => {
    handlePause();
    handleCountPause();
    handleRearsalPause();
  };

  const startClick = () => {
    handleCountStart();
  };

  const stopClick = () => {
    handleStop();
    handleCountStop();
    handleRearsalClose({userId, questionId: questionId ?? 0, memo});
    ModalOpen();
  };

  const restartDisabled = videoState !== 'DONE';
  const pauseDisabled = videoState !== 'DONE' && videoState !== 'STOP';
  const startDisabled = videoState === 'DONE' || videoState === 'STOP';
  const stopDisabled = videoState !== 'DONE';

  return (
    <div className={styles.wrapper}>
      <div className={styles.control_buttons}>
        <Button
          disabled={restartDisabled}
          onClick={restartClick}
          iconRight={CircleArrowLeft}
          theme="secondary"
        >
          처음부터
        </Button>
        <Button
          disabled={pauseDisabled}
          onClick={pauseClick}
          iconRight={CirclePause}
          theme="secondary"
        >
          일시정지
        </Button>
        <Button
          disabled={startDisabled}
          onClick={startClick}
          iconRight={CirclePlay}
          theme="secondary"
        >
          시작
        </Button>
        <Button
          disabled={stopDisabled}
          onClick={stopClick}
          iconRight={CircleStop}
          theme="secondary"
        >
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
