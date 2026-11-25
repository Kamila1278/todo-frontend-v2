import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTasks, getQuote } from '../api/tasks';
import TaskCard from '../components/TaskCard';
import TaskFilter from '../components/TaskFilter';

import {
  filterTasks,
  countActive,
  sortByPriority
} from '../utils/tasks';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [quote, setQuote] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    getTasks()
      .then(setTasks)
      .catch(() => {
        setError('Тапсырмаларды жүктеу қатесі');
      });

    getQuote()
      .then(data => setQuote(data.quote))
      .catch(() => {
        setQuote('Бүгін жаңа мүмкіндік!');
      });
  }, []);

  const visible = sortByPriority(
    filterTasks(tasks, filter)
  );

  return (
    <>
      <section className="hero">
        <div>
          <p>ЖЕКЕ ЖОСПАРЛАУШЫ</p>
          <h1>Тапсырмалар тізімі</h1>
          <span>{quote}</span>
        </div>

        <Link className="button" to="/new">
          + Жаңа тапсырма
        </Link>
      </section>

      <section className="stats">
        <div className="stat">
          <p>Барлығы</p>
          <h2>{tasks.length}</h2>
        </div>

        <div className="stat">
          <p>Белсенді</p>
          <h2>{countActive(tasks)}</h2>
        </div>

        <div className="stat">
          <p>Орындалған</p>
          <h2>
            {tasks.length - countActive(tasks)}
          </h2>
        </div>
      </section>

      <h2>Менің тапсырмаларым</h2>

      <TaskFilter
        filter={filter}
        onChange={setFilter}
      />

      {error && (
        <p className="error">{error}</p>
      )}

      {visible.length === 0 ? (
        <div className="empty">
          Тапсырмалар жоқ
        </div>
      ) : (
        <section className="task-grid">
          {visible.map(task => (
            <TaskCard
              key={task.id}
              task={task}
            />
          ))}
        </section>
      )}
    </>
  );
}