import {NextRequest, NextResponse} from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('access-token')?.value;

  const {pathname} = request.nextUrl;

  const protectedPaths = ['/rehearsal', '/minari'];

  if (protectedPaths.some((path) => pathname.includes(path)) && !token) {
    return NextResponse.rewrite(new URL('/401', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/rehearsal/:path*', '/minari/:path*'],
};
