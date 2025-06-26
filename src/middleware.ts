import {NextRequest, NextResponse} from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  const {pathname} = request.nextUrl;

  const protectedPaths = ['/rehearsal', '/result'];

  if (protectedPaths.some((path) => pathname.includes(path)) && !token) {
    return NextResponse.rewrite(new URL('/not-found', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/rehearsal/:path*', '/result/:path*'],
};
