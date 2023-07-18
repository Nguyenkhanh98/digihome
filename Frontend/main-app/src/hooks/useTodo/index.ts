import { Todo, Todos } from "@models/todos";
import { ReactiveVar } from "@apollo/client";

export function useTodos(todosVar: ReactiveVar<Todos>) {
  const deleteTodo = (id: number) => {
    const allTodos = todosVar();
    const filteredTodos = allTodos.filter((todo: Todo) => todo.id !== id);
    todosVar(filteredTodos);
  };

  return {
    operations: { deleteTodo },
  };
}
