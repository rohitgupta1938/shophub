export default function Toast({ msg, type = 'success' }) {
  return (
    <div className="toast-container">
      <div className={`toast toast-${type}`}>{msg}</div>
    </div>
  );
}
