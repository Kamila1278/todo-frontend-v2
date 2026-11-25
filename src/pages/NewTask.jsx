import { Link, useNavigate } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import { createTask } from '../api/tasks';

export default function NewTask() {
  const navigate = useNavigate();

  async function handleSubmit(task) {
    await createTask(task);
    navigate('/');
  }

  return (
    <section className="panel">
      <Link to="/">← Артқа</Link>

      <h1>Жаңа тапсырма</h1>

      <p>
        Тапсырманың атауын, басымдығын
        және мерзімін енгізіңіз.
      </p>

      <TaskForm onSubmit={handleSubmit} />
    </section>
  );
}