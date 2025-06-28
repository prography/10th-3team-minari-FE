'use client';

import useMedia from '@/hooks/useMedia';
import {useMediaStore} from '@/stores/mediaStore';
import {usePathname} from 'next/navigation';
import {useEffect} from 'react';

export function MediaStreamEndHandler() {
  const pathname = usePathname();
  const {stopMedia} = useMedia();
  const {mediaStreamStatus} = useMediaStore();

  useEffect(() => {
    const isAllowedPath = pathname === '/rehearsal';

    if (!isAllowedPath && mediaStreamStatus === 'connected') {
      stopMedia();
    }
  }, [pathname, stopMedia, mediaStreamStatus]);

  return null;
}
