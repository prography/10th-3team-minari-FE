import { render, screen } from '@testing-library/react';
import Test from './Test';

describe('Test 컴포넌트 테스트', () => {
  it('"환영합니다."가 출력되어야 한다.', () => {
    render(<Test />);
    const textElement = screen.getByText('환영합니다.');
    expect(textElement).toBeInTheDocument();
  });
});
