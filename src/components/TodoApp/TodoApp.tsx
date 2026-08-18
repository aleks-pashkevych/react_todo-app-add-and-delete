/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */

import { Todo } from '../../types/Todo';
import { Loader } from '../Loader';
import { useState } from 'react';

type Props = {
  todos: Todo[] | null;
  tempTodo: Todo | null;
  // setTempTodo: (el: Todo | null) => void;
  isLoading: boolean;
  setIsLoading: (el: boolean) => void;
  isAdding: boolean;
  setIsAdding: (el: boolean) => void;
  statusFilter: string;
  isError: boolean;
  setIsError: (el: boolean) => void;
  USER_ID: number;
};

export const TodoApp: React.FC<Props> = ({
  todos,
  isLoading,
  statusFilter,
  tempTodo,
}) => {
  const filteredTodos = todos?.filter(todo => {
    if (statusFilter === 'completed') {
      return todo.completed;
    }

    if (statusFilter === 'active') {
      return !todo.completed;
    }

    return true;
  });
  const [title, setTitle] = useState('');

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos &&
        filteredTodos.map(el => {
          return (
            <div
              data-cy="Todo"
              className={`todo ${el.completed ? 'completed' : ''}`}
              key={el.id}
            >
              <label className="todo__status-label">
                <input
                  data-cy="TodoStatus"
                  type="checkbox"
                  className={`todo__status ${el.completed ? 'completed' : ''}`}
                  checked={el.completed}
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
              </label>

              <span data-cy="TodoTitle" className="todo__title">
                {el.title}
              </span>

              {/* Remove button appears only on hover */}
              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
              >
                ×
              </button>

              <Loader isLoading={isLoading} />
            </div>
          );
        })}
      {tempTodo !== null ? (
        <div
          data-cy="Todo"
          className={`todo ${tempTodo.completed ? 'completed' : ''}`}
          key={tempTodo.id}
        >
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className={`todo__status ${tempTodo.completed ? 'completed' : ''}`}
            />
          </label>

          <span data-cy="TodoTitle" className="todo__title">
            {tempTodo.title}
          </span>

          {/* Remove button appears only on hover */}
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            disabled
          >
            ×
          </button>

          <Loader isLoading={isLoading} />
        </div>
      ) : (
        ''
      )}
    </section>
  );
};
