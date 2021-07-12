import React from 'react';
import { FallBack } from './fallback';

// https://pt-br.reactjs.org/docs/error-boundaries.html
// https://github.com/carloscuesta/react-native-error-boundary
// https://elazizi.com/handling-errors-in-react-native-a-complete-guide

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    return this.state.hasError ? <FallBack /> : this.props.children;
  }
}
