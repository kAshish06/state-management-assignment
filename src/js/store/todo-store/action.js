const todoActions = {
  addTodo: payload => {
    return {
      type: "ADD_TODO",
      payload
    };
  },
  updateTodo: payload => {
    return {
      type: "UPDATE_TODO",
      payload
    };
  },
  deleteTodo: payload => {
    return {
      type: "DELETE_TODO",
      payload
    };
  }
};

export default todoActions;
