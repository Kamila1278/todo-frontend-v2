import { useState } from 'react';
import { validateTask } from '../utils/tasks';

export default function TaskForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('medium');
  const [deadline, setDeadline] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    const task = {
      title: title.trim(),
      priority,
      deadline,
      completed: false
    };

    if (!validateTask(task)) {
      setError('Атауы кемінде 3 таңба болуы керек');
      return;
    }

    setError('');

    try {
      await onSubmit(task);
    } catch {
      setError('Тапсырманы сақтау мүмкін болмады');
    }
  }

  return (
    <form
      className="task-form"
      onSubmit={handleSubmit}
      noValidate
    >
      <label htmlFor="title">
        Тапсырма атауы
      </label>

      <input
        id="title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Тапсырманы енгізіңіз"
        required
        minLength={3}
      />

      <label htmlFor="priority">
        Басымдығы
      </label>

      <select
        id="priority"
        value={priority}
        onChange={e => setPriority(e.target.value)}
      >
        <option value="low">Төмен</option>
        <option value="medium">Орташа</option>
        <option value="high">Жоғары</option>
      </select>

      <label htmlFor="deadline">
        Мерзімі
      </label>

      <input
        id="deadline"
        type="date"
        value={deadline}
        onChange={e => setDeadline(e.target.value)}
      />

      {error && (
        <p role="alert" className="error">
          {error}
        </p>
      )}

      <button type="submit">
        Сақтау
      </button>
    </form>
  );
}