import {useMediaStore} from '@/stores/mediaStore';
import {useEffect, useRef, useState} from 'react';

/**
 * source - 마이크 입력을 오디오 처리 파이프라인에 넣는 시작점
 * analyser - 실시간으로 오디오 데이터를 분석할 수 있게 해주는 노드
 * source.connect(analyser) 마이크에서 들어오는 소리를 -> 분석기로 보내라
 */
const useMicVolume = () => {
  const [volume, setVolume] = useState(0);
  const {mediaStream} = useMediaStore();
  const intervalId = useRef<NodeJS.Timer | number>(0);

  useEffect(() => {
    if (!mediaStream) return;

    const audioCtx = new AudioContext(); //브라우저의 오디오 처리 엔진
    const analyser = audioCtx.createAnalyser(); //실시간으로 오디오 데이터 분석
    const source = audioCtx.createMediaStreamSource(mediaStream); //마이크 입력을 오디오 노드로 변환

    source.connect(analyser);

    const dataArray = new Float32Array(analyser.fftSize);

    const startVolumeMonitoring = () => {
      intervalId.current = setInterval(() => {
        analyser.getFloatTimeDomainData(dataArray); // 마이크 오디오 파형(-1.0 ~ 1.0) 추출

        const sumSquares = dataArray.reduce((sum, value) => sum + value * value, 0); //각 샘플 값 제곱으로 더해서 음수가 있어도 양수로 표현

        const RMS = Math.sqrt(sumSquares / dataArray.length); //Root Mean Square값 소리 크기의 대표값

        const weight = 10;

        const amplifiedVolume = RMS * weight; // 너무 작은 RMS값을 사람이 보기 좋은 수준으로 증폭

        const normalizedVolume = Math.min(Math.round(amplifiedVolume * 100), 100); // 0~100범위로 정규화

        setVolume((prev) => {
          if (Math.abs(prev - normalizedVolume) > 2) {
            return normalizedVolume;
          }
          return prev;
        });
      }, 100);
    };

    startVolumeMonitoring();

    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current as number);
      }
      source.disconnect();
      analyser.disconnect();
      void audioCtx.close();
    };
  }, [mediaStream]);

  return volume;
};

export default useMicVolume;
