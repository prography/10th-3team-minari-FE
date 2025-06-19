import Video from './_components/Video';
import RehearsalHeader from './_components/RehearsalHeader';
import Timer from './_components/Timer';
import {TimerProvider} from '@/contexts/TimerProvider';
import Buttons from './_components/Buttons';
import styles from './page.module.css';
import Notepad from './_components/Notepad/Notepad';
import {NotepadProvider} from '@/contexts/NotepadProvider';
import {VideoStateProvider} from '@/contexts/VideoStateProvider';
import CompleteModal from './_components/CompleteModal';
import {CompleteModalProvider} from '@/contexts/CompleteModalProvider';
import Contents from './_components/Contents';

const RehearsalPage = () => {
  return (
    <CompleteModalProvider>
      <CompleteModal />
      <TimerProvider>
        <RehearsalHeader
          subtitle={<RehearsalHeader.Subtitle>오늘의 미나리 질문</RehearsalHeader.Subtitle>}
          title={
            <RehearsalHeader.Title>
              <Contents />
            </RehearsalHeader.Title>
          }
          leftView={<Timer />}
        />
        <NotepadProvider>
          <div className={styles.notepad_video_buttons_wrapper}>
            <div className={styles.video_buttons_wrapper}>
              <VideoStateProvider>
                <Video />
                <Buttons />
              </VideoStateProvider>
            </div>
            <Notepad />
          </div>
        </NotepadProvider>
      </TimerProvider>
    </CompleteModalProvider>
  );
};

export default RehearsalPage;
