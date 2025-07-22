import {CompleteModalProvider} from '@/contexts/CompleteModalProvider';
import CompleteModal from './_components/CompleteModal';
import {TimerProvider} from '@/contexts/TimerProvider';
import RehearsalHeader from '../RehearsalHeader';
import Contents from './_components/Contents';
import Timer from './_components/Timer';
import {NotepadProvider} from '@/contexts/NotepadProvider';
import {VideoStateProvider} from '@/contexts/VideoStateProvider';
import Video from '../Video';
import Buttons from './_components/Buttons';
import Notepad from './_components/Notepad/Notepad';
import styles from './page.module.css';

const MainPage = () => {
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
          <VideoStateProvider>
            <div className={styles.notepad_video_buttons_wrapper}>
              <div className={styles.video_notepad_wrapper}>
                <div style={{flex: 1}}>
                  <Video />
                </div>
                <Notepad />
              </div>
              <Buttons />
            </div>
          </VideoStateProvider>
        </NotepadProvider>
      </TimerProvider>
    </CompleteModalProvider>
  );
};

export default MainPage;
