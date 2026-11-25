const BASE = '/api/tasks';

async function request(url, options = {}) {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json'
    },
    ...options
  });

  if (!response.ok) {
    throw new Error('API қатесі');
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

function readLocal() {
  return JSON.parse(
    localStorage.getItem('todo-v2') || '[]'
  );
}

function saveLocal(tasks) {
  localStorage.setItem(
    'todo-v2',
    JSON.stringify(tasks)
  );
}

const local = import.meta.env.DEV
  && import.meta.env.VITE_USE_API !== 'true';

export async function getTasks() {
  if (local) return readLocal();
  return request(BASE);
}

export async function getTask(id) {
  const tasks = await getTasks();

  return tasks.find(
    t => String(t.id) === String(id)
  );
}

export async function createTask(task) {
  if (local) {
    const item = {
      ...task,
      id: crypto.randomUUID(),
      completed: false
    };

    saveLocal([...readLocal(), item]);
    return item;
  }

  return request(BASE, {
    method: 'POST',
    body: JSON.stringify(task)
  });
}

export async function updateTask(id, changes) {
  if (local) {
    const tasks = readLocal().map(t =>
      String(t.id) === String(id)
        ? { ...t, ...changes }
        : t
    );

    saveLocal(tasks);

    return tasks.find(
      t => String(t.id) === String(id)
    );
  }

  return request(`${BASE}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(changes)
  });
}

export async function deleteTask(id) {
  if (local) {
    saveLocal(
      readLocal().filter(
        t => String(t.id) !== String(id)
      )
    );

    return;
  }

  return request(`${BASE}/${id}`, {
    method: 'DELETE'
  });
}

export async function getQuote() {
  if (local) {
    return {
      quote: 'Үлкен жетістік кішкентай қадамнан басталады.'
    };
  }

  return request('/api/quote');
}