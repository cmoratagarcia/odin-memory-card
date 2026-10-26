export default function Scoreboard({ currentScore, bestScore }) {
  return (
    <section className="scoreboard">
      <div className="score">
        <span className="score-label">Current score:</span>
        <span className="score-value">{currentScore}</span>
      </div>

      <div className="score">
        <span className="score-label">Best score:</span>
        <span className="score-value">{bestScore}</span>
      </div>
    </section>
  );
}
