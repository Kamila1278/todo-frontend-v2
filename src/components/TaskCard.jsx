import { Link } from 'react-router-dom';
import { isOverdue } from '../utils/tasks';

export default function TaskCard({ task }) {
  const priorities = {
    low: 'Төмен',
    medium: 'Орташа',
    high: 'Жоғары'
  };

  return (
    <article className="task-card">
      <div>
        <span className={`priority ${task.priority}`}>
          {priorities[task.priority]}
        </span>

        <h3
          style={{
            textDecoration: task.completed
              ? 'line-through'
              : 'none'
          }}
        >
          {task.title}
        </h3>

        <p>
          Мерзімі: {task.deadline || 'Көрсетілмеген'}
        </p>

        <p>
          {task.completed
            ? '✓ Орындалған'
            : 'Белсенді'}
        </p>

        {isOverdue(task) && (
          <p className="error">
            Мерзімі өтіп кеткен!
          </p>
        )}
      </div>

      <Link
        className="details-link"
        to={`/tasks/${task.id}`}
      >
        Толығырақ →
      </Link>
    </article>
  );
}