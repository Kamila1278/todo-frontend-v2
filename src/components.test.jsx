import {
  describe,
  it,
  expect,
  vi,
  afterEach
} from 'vitest';

import {
  render,
  screen,
  fireEvent,
  cleanup
} from '@testing-library/react';

import '@testing-library/jest-dom/vitest';

import { MemoryRouter } from 'react-router-dom';
import TaskForm from './components/TaskForm';
import TaskCard from './components/TaskCard';
import Home from './pages/Home';

vi.mock('./api/tasks', () => ({
  getTasks: vi.fn().mockResolvedValue([
    {
      id: 1,
      title: 'Active task',
      priority: 'high',
      completed: false
    },
    {
      id: 2,
      title: 'Completed task',
      priority: 'low',
      completed: true
    }
  ]),

  getQuote: vi.fn().mockResolvedValue({
    quote: 'Test quote'
  })
}));

afterEach(cleanup);

describe('Task components', () => {

  it('shows error for empty title', () => {
    const submit = vi.fn();

    render(<TaskForm onSubmit={submit} />);

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Сақтау'
      })
    );

    expect(screen.getByRole('alert'))
      .toHaveTextContent(
        'Атауы кемінде 3 таңба болуы керек'
      );

    expect(submit).not.toHaveBeenCalled();
  });

  it('completed task is crossed out', () => {
    render(
      <MemoryRouter>
        <TaskCard task={{
          id: 1,
          title: 'Finished task',
          priority: 'high',
          completed: true
        }} />
      </MemoryRouter>
    );

    expect(screen.getByText('Finished task'))
      .toHaveStyle({
        textDecoration: 'line-through'
      });
  });

  it('filters active tasks', async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    await screen.findByText('Active task');

    expect(
      screen.getByText('Completed task')
    ).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Белсенді'
      })
    );

    expect(
      screen.getByText('Active task')
    ).toBeInTheDocument();

    expect(
      screen.queryByText('Completed task')
    ).not.toBeInTheDocument();
  });

  it('submits a valid task', () => {
    const submit = vi.fn();

    render(<TaskForm onSubmit={submit} />);

    fireEvent.change(
      screen.getByLabelText('Тапсырма атауы'),
      {
        target: { value: 'React project' }
      }
    );

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Сақтау'
      })
    );

    expect(submit).toHaveBeenCalledWith({
      title: 'React project',
      priority: 'medium',
      deadline: '',
      completed: false
    });
  });

});