import { useState } from 'react';
import ErrorBoundary from './ErrorBoundary.jsx';
import { topics } from './exercises.js';

function App() {
  const [selectedId, setSelectedId] = useState(topics[0].exercises[0].id);

  const allExercises = topics.flatMap((topic) => topic.exercises);
  const current = allExercises.find((exercise) => exercise.id === selectedId);
  const Exercise = current.Component;

  return (
    <div className="shell">
      <nav className="sidebar">
        {topics.map((topic) => (
          <div key={topic.number} className="topic">
            <div className="topic-title">
              <span className="topic-number">{topic.number}</span>
              {topic.title}
            </div>
            {topic.exercises.map((exercise) => (
              <button
                key={exercise.id}
                className={exercise.id === selectedId ? 'snippet-link active' : 'snippet-link'}
                onClick={() => setSelectedId(exercise.id)}
              >
                {exercise.id} · {exercise.title}
              </button>
            ))}
          </div>
        ))}
      </nav>

      <main className="stage">
        <p className="file-path">src/exercises/{current.file}</p>
        <h1>{current.id} · {current.title}</h1>

        <div className="steps">
          <strong>Walkthrough</strong>
          <ol>
            {current.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>

        <div className="exercise">
          <ErrorBoundary key={current.id}>
            <Exercise />
          </ErrorBoundary>
        </div>
      </main>
    </div>
  );
}

export default App;
