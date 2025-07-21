export const addItemToServer = async (task, date) => {
  const response = await fetch("https://todo-with-backend-c8xr.onrender.com/api/todo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ task, date }),
  });
  const item = await response.json();
  return mapServerItemToLocalItem(item);
};

export const getItemsFromServer = async () => {
  const response = await fetch("https://todo-with-backend-c8xr.onrender.com/api/todo");
  const items = await response.json();
  return items.map(mapServerItemToLocalItem);
};

export const markItemCompletedOnServer = async (id) => {
  const response = await fetch(
    `https://todo-with-backend-c8xr.onrender.com/api/todo/${id}/completed`,
    {
      method: "PUT",
    }
  );
  const item = await response.json();
  return mapServerItemToLocalItem(item);
};

export const deleteItemFromServer = async (id) => {
  await fetch(`https://todo-with-backend-c8xr.onrender.com/api/todo/${id}`, {
    method: "DELETE",
  });
  return id;
};

const mapServerItemToLocalItem = (serverItem) => {
  return {
    id: serverItem._id,
    name: serverItem.task,
    dueDate: serverItem.date,
    completed: serverItem.completed,
    createdAt: serverItem.createdAt,
    updatedAt: serverItem.updatedAt,
  };
};
