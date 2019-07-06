const todoReducer = (action, state) => {
  switch (action.type) {
    case "ADD_TODO": {
      state[action.payload.id] = action.payload;
      break;
    }
    case "UPDATE_TODO": {
      state.forEach(todo => {
        if (todo.id === action.payload.id) {
          todo.completed = action.payload.completed;
        }
      });

      break;
    }
    case "DELETE_TODO": {
      state = state.filter(todo => todo.id !== action.payload.id);
      break;
    }
  }

  return state;
};

export default todoReducer;
