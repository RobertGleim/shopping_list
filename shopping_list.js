function updateItemCount() {
  let total = 0, completedTotal = 0;
  for (let i = 1; i <= 5; i++) {
    const ul = document.getElementById(`list${i}`);
    const cul = document.getElementById(`completed-list${i}`);
    const count = ul.children.length, ccount = cul.children.length;
    document.getElementById(`count-list${i}`).textContent = count;
    document.getElementById(`completed-count-list${i}`).textContent = ccount;
    total += count; completedTotal += ccount;
  }
  document.getElementById('item-count').textContent = total;
  document.getElementById('completed-item-count').textContent = completedTotal;
}

function clearCompletedLists() {
  for (let i = 1; i <= 5; i++) document.getElementById(`completed-list${i}`).innerHTML = '';
  updateItemCount();
}

function checkOrUncheckAll(check) {
  const ul = document.querySelector('.shopping_list ul[style=""]');
  if (ul) ul.querySelectorAll('.item-checkbox').forEach(cb => { cb.checked = check; cb.dispatchEvent(new Event('change')); });
  updateItemCount();
}

function showSelectedList(id) {
  for (let i = 1; i <= 5; i++) document.getElementById(`list${i}`).style.display = (id === `list${i}`) ? "" : "none";
}

function saveAllListsToLocalStorage() {
  for (let i = 1; i <= 5; i++) {
    const ul = document.getElementById(`list${i}`);
    localStorage.setItem('shoppingList_' + ul.id, JSON.stringify(
      Array.from(ul.children).map(li => ({
        text: li.querySelector('span').textContent,
        checked: li.querySelector('.item-checkbox').checked
      }))
    ));
  }
}

function loadAllListsFromLocalStorage() {
  for (let i = 1; i <= 5; i++) {
    const ul = document.getElementById(`list${i}`);
    ul.innerHTML = '';
    (JSON.parse(localStorage.getItem('shoppingList_' + ul.id) || '[]'))
      .forEach(item => ul.appendChild(createShoppingLi(item.text, item.checked, ul.id)));
  }
}

function createShoppingLi(text, checked, listId) {
  const li = document.createElement('li');
  li.innerHTML = `<div class="item-row"><input type="checkbox" class="item-checkbox" ${checked ? 'checked' : ''} /><span>${text}</span></div><button class="complete-btn" style="visibility:${checked ? 'visible' : 'hidden'};">Complete</button>`;
  setupItemEvents(li, listId);
  return li;
}

function addItem() {
  const itemInput = document.getElementById("new-item");
  const selectList = document.querySelector(".select-list select");
  const ul = document.getElementById(selectList.value);
  if (itemInput.value.trim()) {
    ul.appendChild(createShoppingLi(itemInput.value.trim(), false, ul.id));
    itemInput.value = "";
    updateItemCount();
    saveAllListsToLocalStorage();
  }
}

function setupItemEvents(li, listId) {
  const cb = li.querySelector(".item-checkbox"), btn = li.querySelector(".complete-btn");
  cb.addEventListener("change", () => { btn.style.visibility = cb.checked ? "visible" : "hidden"; });
  btn.addEventListener("click", () => moveToCompleted(li, listId));
}

function moveToCompleted(li, listId) {
  const text = li.querySelector('span').textContent;
  const cul = document.getElementById(`completed-list${listId.slice(-1)}`);
  const cli = document.createElement("li");
  cli.innerHTML = `<div class="item-row"><span>${text}</span></div><button class="restore-btn">Restore</button> <button class="delete-btn">Delete</button>`;
  setupCompletedEvents(cli, listId);
  cul.appendChild(cli);
  li.remove();
  updateItemCount();
}

function setupCompletedEvents(li, listId) {
  li.querySelector(".restore-btn").addEventListener("click", () => restoreToShoppingList(li, listId));
  li.querySelector(".delete-btn").addEventListener("click", () => { li.remove(); updateItemCount(); });
}

function restoreToShoppingList(li, listId) {
  const text = li.querySelector('span').textContent;
  document.getElementById(listId).appendChild(createShoppingLi(text, false, listId));
  li.remove();
  updateItemCount();
  saveAllListsToLocalStorage();
}

// --- Event Listeners ---
window.addEventListener('DOMContentLoaded', () => {
  loadAllListsFromLocalStorage();
  document.querySelector(".select-list select").value = 'list1';
  showSelectedList('list1');
  updateItemCount();
});

document.querySelector(".select-list select").addEventListener("change", function () {
  showSelectedList(this.value);
});

document.querySelector(".add-item").addEventListener("click", addItem);

document.getElementById("new-item").addEventListener("keydown", function(e) {
  if (e.key === "Enter") addItem();
});

document.querySelector(".remove-checked").addEventListener("click", function () {
  const ul = document.querySelector('.shopping_list ul[style=""]');
  if (ul) {
    ul.querySelectorAll("li").forEach(li => {
      if (li.querySelector(".item-checkbox").checked) li.remove();
    });
    updateItemCount();
    saveAllListsToLocalStorage();
  }
});

document.querySelector(".check-all").addEventListener('click', function() {
  checkOrUncheckAll(true); saveAllListsToLocalStorage();
});

document.querySelector(".uncheck-all").addEventListener('click', function() {
  checkOrUncheckAll(false); saveAllListsToLocalStorage();
});

document.querySelector('.delete-all').addEventListener('click', clearCompletedLists);

