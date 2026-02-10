// ===== 操作ログ =====
function addLog(message) {
  const log = document.getElementById('log');
  const entry = document.createElement('div');
  entry.className = 'entry';
  const now = new Date();
  const time = now.toLocaleTimeString('ja-JP');
  entry.innerHTML = `<span class="timestamp">[${time}]</span> ${message}`;
  log.prepend(entry);
}

// ===== カウンター =====
let count = 0;
const countDisplay = document.getElementById('count');

document.getElementById('increment').addEventListener('click', () => {
  count++;
  countDisplay.textContent = count;
  addLog(`カウンター: ${count} に増加`);
});

document.getElementById('decrement').addEventListener('click', () => {
  count--;
  countDisplay.textContent = count;
  addLog(`カウンター: ${count} に減少`);
});

// ===== Todoリスト =====
const STORAGE_KEY = 'todo-items';
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

function saveTodos() {
  const items = Array.from(todoList.querySelectorAll('li')).map((li) => ({
    text: li.querySelector('.todo-text').textContent,
    done: li.classList.contains('done'),
  }));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function createTodoElement(text, done) {
  const li = document.createElement('li');
  if (done) li.classList.add('done');
  li.innerHTML = `
    <span class="todo-text">${text}</span>
    <button class="delete-btn">&times;</button>
  `;

  li.querySelector('.todo-text').addEventListener('click', () => {
    li.classList.toggle('done');
    const status = li.classList.contains('done') ? '完了' : '未完了';
    addLog(`Todo "${text}" → ${status}`);
    saveTodos();
  });

  li.querySelector('.delete-btn').addEventListener('click', () => {
    li.remove();
    addLog(`Todo "${text}" を削除`);
    saveTodos();
  });

  return li;
}

function loadTodos() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return;
  const items = JSON.parse(stored);
  items.forEach(({ text, done }) => {
    todoList.appendChild(createTodoElement(text, done));
  });
}

function addTodo() {
  const text = todoInput.value.trim();
  if (!text) return;

  todoList.appendChild(createTodoElement(text, false));
  addLog(`Todo "${text}" を追加`);
  todoInput.value = '';
  saveTodos();
}

document.getElementById('add-todo').addEventListener('click', addTodo);
todoInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTodo();
});

loadTodos();

// ===== 初期ログ =====
addLog('アプリケーションが起動しました');
