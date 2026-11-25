import { describe, it, expect } from 'vitest';

import {
  filterTasks,
  countActive,
  validateTask,
  sortByPriority,
  isOverdue
} from './tasks';

const tasks = [
  {
    id: 1,
    title: 'Task 1',
    priority: 'low',
    completed: false
  },
  {
    id: 2,
    title: 'Task 2',
    priority: 'high',
    completed: true
  },
  {
    id: 3,
    title: 'Task 3',
    priority: 'medium',
    completed: false
  }
];

describe('Task utils', () => {

  it('returns all tasks', () => {
    expect(filterTasks(tasks, 'all'))
      .toHaveLength(3);
  });

  it('filters active tasks', () => {
    expect(filterTasks(tasks, 'active'))
      .toHaveLength(2);
  });

  it('filters completed tasks', () => {
    expect(filterTasks(tasks, 'completed'))
      .toHaveLength(1);
  });

  it('counts active tasks', () => {
    expect(countActive(tasks)).toBe(2);
  });

  it('rejects empty title', () => {
    expect(validateTask({ title: '' }))
      .toBe(false);
  });

  it('rejects short title', () => {
    expect(validateTask({ title: 'ab' }))
      .toBe(false);
  });

  it('accepts valid title', () => {
    expect(validateTask({ title: 'React' }))
      .toBe(true);
  });

  it('sorts by priority', () => {
    expect(
      sortByPriority(tasks).map(t => t.id)
    ).toEqual([2, 3, 1]);
  });

  it('detects overdue task', () => {
    expect(isOverdue({
      deadline: '2000-01-01',
      completed: false
    })).toBe(true);
  });

  it('completed task is not overdue', () => {
    expect(isOverdue({
      deadline: '2000-01-01',
      completed: true
    })).toBe(false);
  });

});