import { useEffect, useState } from 'react';

import {
  Link,
  useParams,
  useNavigate
} from 'react-router-dom';

import {
  getTask,
  updateTask,
  deleteTask
} from '../api/tasks';

export default function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getTask(id)
      .then(setTask)
      .catch(() => setError('API қатесі'))
      .finally(() => setLoading(false));
  }, [id]);

  async function complete() {
    try {
      await updateTask(id, {
        completed: true
      });

      navigate('/');
    } catch {
      setError('Жаңарту қатесі');
    }
  }

  async function remove() {
    try {
      await deleteTask(id);
      navigate('/');
    } catch {
      setError('Жою қатесі');
    }
  }

  if (loading) {
    return <p>Жүктелуде...</p>;
  }

  if (!task) {
    return (
      <section className="panel">
        <Link to="/">← Артқа</Link>
        <p>{error || 'Тапсырма табылмады'}</p>
      </section>
    );
  }

  const priorities = {
    low: 'Төмен',
    medium: 'Орташа',
    high: 'Жоғары'
  };

  return (
    <section className="panel">
      <Link to="/">← Артқа</Link>

      <h1>{task.title}</h1>

      <p>Басымдығы: {priorities[task.priority]}</p>

      <p>
        Мерзімі: {task.deadline || 'Көрсетілмеген'}
      </p>

      <p>
        Күйі: {task.completed
          ? 'Орындалған'
          : 'Белсенді'}
      </p>

      {error && (
        <p className="error">{error}</p>
      )}

      <div className="actions">
        <button
          onClick={complete}
          disabled={task.completed}
        >
          ✓ Орындалды
        </button>

        <button
          className="danger"
          onClick={remove}
        >
          Жою
        </button>
      </div>
    </section>
  );
}