import todoReducer from "./reducer";
import { createStore, combineReducers } from "../../store/store.js";

const todoStore = createStore(
  combineReducers([
    {
      reducer: todoReducer,
      feature: "todoList",
      // initialState: []
      initialState: {}
    }
  ])
);

export default todoStore;
