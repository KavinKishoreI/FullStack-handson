import { Component } from 'react';

// React only lets class components catch errors thrown while rendering.
// This keeps an exercise that crashes on purpose from taking down the whole app.
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div className="crash">
          <p><strong>This exercise crashed with:</strong></p>
          <p className="crash-message">{this.state.error.message}</p>
          <button onClick={() => this.setState({ error: null })}>Restart exercise</button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
