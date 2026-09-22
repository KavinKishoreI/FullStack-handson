function StatusLine({ message, isError }) {
  const className = isError ? 'status-line error' : 'status-line';
  return (
    <p id="status-line" className={className}>{message}</p>
  );
}

export default StatusLine;
