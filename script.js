'use strict';

console.log('Hello World');

// index.js
const appContainer = document.getElementById('app');
const appTitle = document.getElementById('appTitle');

console.log(appContainer);
//console.log(appTitle);
// index.js
// ...
appTitle.textContent = '食事管理';

// index.js
// ...
const intro = document.createElement('p');
intro.textContent = '食べたものを記録してバランスの良い食事をとろう';
appContainer.appendChild(intro);

// script.js
// ...
const btn = document.createElement('button');
btn.textContent = 'クリックしてメッセージ表示';
btn.addEventListener('click', () => {
  alert('イベントが発火しました！');
});
appContainer.appendChild(btn);

const start = document.createElement('p');
start.textContent = '今日は何を食べましたか？';
appContainer.appendChild(start);

//const opening = document.createElement('button');
//opening.textContent = 'クリックしてメッセージ表示';
//opening.addEventListener('keydown', () => {
//console.log('就活、スタート！');
//});
//appContainer.appendChild(opening);

// script.js
// ...
const form = document.getElementById('applicationForm');
const companyInput = document.getElementById('companyInput');
const dateInput = document.getElementById('dateInput');
const statusSelect = document.getElementById('statusSelect');
const noteInput = document.getElementById('noteInput');
const applicationList = document.getElementById('applicationList');

// 応募情報を格納する配列
let applications = [];

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const company = companyInput.value.trim();
  const appliedDate = dateInput.value;
  const status = statusSelect.value;
  const note = noteInput.value.trim();
  if (!company || !appliedDate) {
    alert('必須項目（企業名と日付）を入力してください！');
    return;
  }
  const newApplication = {
    id: Date.now(),
    company,
    appliedDate,
    status,
    note,
  };
  applications.push(newApplication);
  saveApplications();
  renderApplications();
  form.reset();
});

// script.js
// ...
function addApplication(application) {
  applications.push(application);
  renderApplications();
}

function renderApplications() {
  // 既存のリストをクリア
  applicationList.innerHTML = '';
  // for ループで各応募情報を表示
  for (let i = 0; i < applications.length; i++) {
    const app = applications[i];
    // 学生向けに、配列のインデックス＋1（応募番号）を表示
    const li = document.createElement('li');
    li.textContent =
      i +
      1 +
      '. ' +
      `${app.company} - ${app.appliedDate} - ${app.status}` +
      (app.note ? ' - メモ：' + app.note : '');

    // 削除ボタンの作成
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '削除';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', () => {
      deleteApplication(app.id);
    });
    li.appendChild(deleteBtn);

    applicationList.appendChild(li);
  }
}

function saveApplications() {
  localStorage.setItem('applications', JSON.stringify(applications));
}

function loadApplications() {
  const data = localStorage.getItem('applications');
  return data ? JSON.parse(data) : [];
}

// ページ読み込み時の処理（StackBlitz の自動実行）
applications = loadApplications();
renderApplications();

function deleteApplication(id) {
  applications = applications.filter((app) => app.id !== id);
  saveApplications();
  renderApplications();
}
