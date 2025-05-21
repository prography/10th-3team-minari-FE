'use client';

// import {useMediaStore} from '@/stores/mediaStore';
// import {useEffect} from 'react';
// import {useRouter} from 'next/navigation';
import Video from './_components/Video';
import RehearsalHeader from './_components/RehearsalHeader';
import Timer from './_components/Timer';
import {TimerProvider} from '@/contexts/TimerProvider';
import Buttons from './_components/Buttons';
import styles from './page.module.css';
import Notepad from './_components/Notepad/Notepad';
import {NotepadProvider} from '@/contexts/NotepadProvider';
import {VideoStateProvider} from '@/contexts/VideoStateProvider';

const RehearsalPage = () => {
  // const {mediaStreamStatus} = useMediaStore();
  // const router = useRouter();

  // useEffect(() => {
  //   if (mediaStreamStatus !== 'connected') {
  //     router.push('/rehearsal/setting');
  //     return;
  //   }
  // }, [mediaStreamStatus, router]);

  return (
    <div>
      <TimerProvider>
        <RehearsalHeader
          subtitle={<RehearsalHeader.Subtitle>오늘의 미나리 질문</RehearsalHeader.Subtitle>}
          title={<RehearsalHeader.Title>전체 질문 노출</RehearsalHeader.Title>}
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
    </div>
  );
};

export default RehearsalPage;
