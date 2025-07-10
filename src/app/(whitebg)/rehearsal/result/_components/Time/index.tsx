import React from 'react';

const Time = ({runningTime}: {runningTime?: number}) => {
  const second = Math.floor(runningTime != null ? runningTime : 0);
  const minutes = Math.floor(second / 60);
  const remainingSeconds = second % 60;

  return <div>{`${minutes}분 ${remainingSeconds}초`}</div>;
};

export default Time;
