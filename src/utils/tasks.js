export function filterTasks(tasks, filter) {
  if (filter === 'active') {
    return tasks.filter(t => !t.completed);
  }

  if (filter === 'completed') {
    return tasks.filter(t => t.completed);
  }

  return tasks;
}

export function countActive(tasks) {
  return tasks.filter(t => !t.completed).length;
}

export function validateTask(task) {
  return typeof task.title === 'string'
    && task.title.trim().length >= 3;
}

export function sortByPriority(tasks) {
  const priority = {
    high: 0,
    medium: 1,
    low: 2
  };

  return [...tasks].sort(
    (a, b) => priority[a.priority] - priority[b.priority]
  );
}

export function isOverdue(task) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return !task.completed
    && Boolean(task.deadline)
    && new Date(task.deadline + 'T00:00:00') < today;
}