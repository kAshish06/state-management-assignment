import { Component, OnInit } from "@angular/core";

import todoActions from "../../../js/store/todo-store/action";
import todoStore from "../../../js/store/todo-store";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "state-todo-assignment";
  todoList = [];
  newTodo = "";

  ngOnInit() {
    [
      {
        id: 1,
        name: "Get grocery",
        completed: false
      },
      {
        id: 2,
        name: "Go to gym",
        completed: false
      }
    ].forEach(todo => {
      todoStore.dispatch(todoActions.addTodo(todo));
    });

    todoStore.subscribe(state => {
      this.todoList = this.createTodoList(state.todoList);
    });
  }
  createTodoList(todoHashMap) {
    const todoList = [];
    for (let key in todoHashMap) {
      todoList.push(todoHashMap[key]);
    }
    return todoList;
  }
  addTodo() {
    if (this.newTodo) {
      let maxId = 0;
      todoStore.getState(state => {
        state.todoList.forEach(todo => {
          maxId = maxId > todo.id ? maxId : todo.id;
        });
      });
      todoStore.dispatch(
        todoActions.addTodo({
          id: maxId + 1,
          name: this.newTodo,
          completed: false
        })
      );
    }
  }

  changeTodoStatus(todo) {
    todoStore.dispatch(
      todoActions.updateTodo({
        ...todo,
        completed: !todo.completed
      })
    );
  }

  deleteTodo(todo) {
    todoStore.dispatch(todoActions.deleteTodo(todo));
  }
}
