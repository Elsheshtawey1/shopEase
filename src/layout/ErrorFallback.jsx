export default function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div style={{ padding: "1rem", background: "#fee", color: "#900" }}>
      <h2>an error occurred</h2>
      <p>{error.message}</p>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}
