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
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

function addTodo() {
  const text = todoInput.value.trim();
  if (!text) return;

  const li = document.createElement('li');
  li.innerHTML = `
    <span class="todo-text">${text}</span>
    <button class="delete-btn">&times;</button>
  `;

  // クリックで完了切替
  li.querySelector('.todo-text').addEventListener('click', () => {
    li.classList.toggle('done');
    const status = li.classList.contains('done') ? '完了' : '未完了';
    addLog(`Todo "${text}" → ${status}`);
  });

  // 削除ボタン
  li.querySelector('.delete-btn').addEventListener('click', () => {
    li.remove();
    addLog(`Todo "${text}" を削除`);
  });

  todoList.appendChild(li);
  addLog(`Todo "${text}" を追加`);
  todoInput.value = '';
}

document.getElementById('add-todo').addEventListener('click', addTodo);
todoInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTodo();
});

// ===== 初期ログ =====
addLog('アプリケーションが起動しました');
