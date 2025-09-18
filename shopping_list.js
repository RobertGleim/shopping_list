// Delete All button logic
const deleteAllBtn = document.querySelector('.delete-all');
const completedListUl = document.getElementById('completed-list');
if (deleteAllBtn && completedListUl) {
  deleteAllBtn.addEventListener('click', function() {
    completedListUl.innerHTML = '';
  });
}
// Uncheck All button logic
const uncheckAllBtn = document.querySelector('.uncheck-all');
if (uncheckAllBtn) {
  uncheckAllBtn.addEventListener('click', function() {
    // Only uncheck items in the currently visible shopping list
    document.querySelectorAll('.shopping_list ul').forEach(ul => {
      if (ul.style.display !== 'none') {
        ul.querySelectorAll('.item-checkbox').forEach(checkbox => {
          checkbox.checked = false;
          checkbox.dispatchEvent(new Event('change'));
        });
      }
    });
  });
}
// Check All button logic
const checkAllBtn = document.querySelector('.check-all');
if (checkAllBtn) {
  checkAllBtn.addEventListener('click', function() {
    // Only check items in the currently visible shopping list
    document.querySelectorAll('.shopping_list ul').forEach(ul => {
      if (ul.style.display !== 'none') {
        ul.querySelectorAll('.item-checkbox').forEach(checkbox => {
          checkbox.checked = true;
          checkbox.dispatchEvent(new Event('change'));
        });
      }
    });
  });
}
const shoppingList = document.querySelector(".shopping_list ul");
const completedList = document.querySelector(".completed_list ul");
const itemInput = document.querySelector(
  ".shopping_container input.form-input"
);
const addItemButton = document.querySelector(".add-item");
const selectList = document.querySelector(".select-list select");

function showSelectedList(selectedId) {
  document.querySelectorAll(".shopping_list ul").forEach((ul) => {
    ul.style.display = ul.id === selectedId ? "" : "none";
  });
}

selectList.addEventListener("change", function () {
  showSelectedList(this.value);
});

addItemButton.addEventListener("click", function () {
  const itemText = itemInput.value.trim();
  const selectedList = selectList.value;
  if (itemText !== "") {
    const ul = document.getElementById(selectedList);
    if (ul) {
      const li = document.createElement("li");

      li.innerHTML = `<input type="checkbox" class="item-checkbox" /> ${itemText} <button class="complete-btn" style="visibility:hidden;">Complete</button>`;
  li.innerHTML = `<div class="item-row"><input type="checkbox" class="item-checkbox" /><span>${itemText}</span></div><button class="complete-btn" style="visibility:hidden;">Complete</button>`;
  ul.appendChild(li);
      itemInput.value = "";

      const checkbox = li.querySelector(".item-checkbox");
      const completeBtn = li.querySelector(".complete-btn");
      checkbox.addEventListener("change", function () {
        if (checkbox.checked) {
          completeBtn.style.visibility = "visible";
        } else {
          completeBtn.style.visibility = "hidden";
        }
      });
      completeBtn.addEventListener("click", function () {
        const completedLi = document.createElement("li");
        completedLi.innerHTML = `<span>${itemText}</span> <button class="restore-btn">Restore</button> <button class="delete-btn">Delete</button>`;
  completedLi.innerHTML = `<div class="item-row"><input type="checkbox" class="item-checkbox" disabled /><span>${itemText}</span></div><button class="restore-btn">Restore</button> <button class="delete-btn">Delete</button>`;
  completedLi.innerHTML = `<div class=\"item-row\"><span>${itemText}</span></div><button class=\"restore-btn\">Restore</button> <button class=\"delete-btn\">Delete</button>`;
  completedList.appendChild(completedLi);
        li.remove();

        const restoreBtn = completedLi.querySelector(".restore-btn");
        if (restoreBtn) {
          restoreBtn.addEventListener("click", function () {
            // Add back to selected shopping list
            const selectedListId = selectList.value;
            const shoppingUl = document.getElementById(selectedListId);
            if (shoppingUl) {
              const newLi = document.createElement("li");
              newLi.innerHTML = `<input type="checkbox" class="item-checkbox" /> ${itemText} <button class="complete-btn" style="visibility:hidden;">Complete</button>`;
              newLi.innerHTML = `<div class="item-row"><input type="checkbox" class="item-checkbox" /><span>${itemText}</span></div><button class="complete-btn" style="visibility:hidden;">Complete</button>`;
              shoppingUl.appendChild(newLi);

              const checkbox = newLi.querySelector(".item-checkbox");
              const completeBtn = newLi.querySelector(".complete-btn");
              checkbox.addEventListener("change", function () {
                completeBtn.style.visibility = checkbox.checked ? "visible" : "hidden";
              });
              completeBtn.addEventListener("click", function () {
                // Recursively move to completed list
                const completedLi = document.createElement("li");
                completedLi.innerHTML = `<span>${itemText}</span> <button class="restore-btn">Restore</button> <button class="delete-btn">Delete</button>`;
                completedLi.innerHTML = `<div class="item-row"><input type="checkbox" class="item-checkbox" disabled /><span>${itemText}</span></div><button class="restore-btn">Restore</button> <button class="delete-btn">Delete</button>`;
                completedLi.innerHTML = `<div class=\"item-row\"><span>${itemText}</span></div><button class=\"restore-btn\">Restore</button> <button class=\"delete-btn\">Delete</button>`;
                completedList.appendChild(completedLi);
                newLi.remove();

                const restoreBtn = completedLi.querySelector(".restore-btn");
                if (restoreBtn) {
                  restoreBtn.addEventListener("click", function () {
                    const selectedListId = selectList.value;
                    const shoppingUl = document.getElementById(selectedListId);
                    if (shoppingUl) {
                      const newLi = document.createElement("li");
                      newLi.innerHTML = `<input type="checkbox" class="item-checkbox" /> ${itemText} <button class="complete-btn" style="visibility:hidden;">Complete</button>`;
                      shoppingUl.appendChild(newLi);

                      const checkbox = newLi.querySelector(".item-checkbox");
                      const completeBtn = newLi.querySelector(".complete-btn");
                      checkbox.addEventListener("change", function () {
                        completeBtn.style.visibility = checkbox.checked ? "visible" : "hidden";
                      });
                      completeBtn.addEventListener("click", function () {
                        // Recursively move to completed list
                        const completedLi = document.createElement("li");
                        completedLi.innerHTML = `<span>${itemText}</span> <button class="restore-btn">Restore</button> <button class="delete-btn">Delete</button>`;
                        completedList.appendChild(completedLi);
                        newLi.remove();
                        // Add listeners again
                        const restoreBtn = completedLi.querySelector(".restore-btn");
                        if (restoreBtn) {
                          restoreBtn.addEventListener("click", function () {
                            // ...same logic as above...
                          });
                        }
                        const deleteBtn = completedLi.querySelector(".delete-btn");
                        if (deleteBtn) {
                          deleteBtn.addEventListener("click", function () {
                            completedLi.remove();
                          });
                        }
                      });
                    }
                  });
                }
                const deleteBtn = completedLi.querySelector(".delete-btn");
                if (deleteBtn) {
                  deleteBtn.addEventListener("click", function () {
                    completedLi.remove();
                  });
                }
              });
            }
            completedLi.remove();
          });
        }
        const deleteBtn = completedLi.querySelector(".delete-btn");
        if (deleteBtn) {
          deleteBtn.addEventListener("click", function () {
            completedLi.remove();
          });
        }
      });
    }
  }
});

const removeCheckedBtn = document.querySelector(".remove-checked");
if (removeCheckedBtn) {
  removeCheckedBtn.addEventListener("click", function () {
    document.querySelectorAll(".shopping_list ul").forEach((ul) => {
      ul.querySelectorAll("li").forEach((li) => {
        const checkbox = li.querySelector(".item-checkbox");
        if (checkbox && checkbox.checked) {
          li.remove();
        }
      });
    });
  });
}

showSelectedList(selectList.value);
