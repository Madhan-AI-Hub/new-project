import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
          <h1 style={{ color: '#dc2626' }}>⚠️ Application Error</h1>
          <details style={{ whiteSpace: 'pre-wrap', background: '#f3f4f6', padding: '16px', borderRadius: '8px' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 'bold', marginBottom: '12px' }}>
              Error Details (Click to expand)
            </summary>
            <h3>Error Message:</h3>
            <p style={{ color: '#dc2626', fontWeight: 'bold' }}>{this.state.error?.toString()}</p>
            <h3>Component Stack:</h3>
            <p>{this.state.errorInfo?.componentStack}</p>
            <h3>Stack Trace:</h3>
            <pre>{this.state.error?.stack}</pre>
          </details>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              background: '#4f46e5',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Reload Application
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
