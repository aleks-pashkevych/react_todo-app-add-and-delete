import React, { useState } from 'react';
import { client } from '../../utils/fetchClient';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[] | null;
  setTodos: (todos: Todo[]) => void;
  isLoading: boolean;
  setIsLoading: (el: boolean) => void;
  isAdding: boolean;
  setIsAdding: (el: boolean) => void;
  statusFilter: string;
  isError: boolean;
  setIsError: (el: boolean) => void;
  setErrorMessage: (el: string) => void;
  USER_ID: number;
};

export const Header: React.FC<Props> = ({
  todos,
  setTodos,
  isLoading,
  setIsLoading,
  isAdding,
  setIsAdding,
  setIsError,
  setErrorMessage,
  USER_ID,
}) => {
  const [title, setTitle] = useState('');
  const addTodo = async () => {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setIsError(true);
      setErrorMessage('Title should not be empty');

      return;
    } else {
      setIsError(false);
      setIsLoading(true);
      setIsAdding(true);
      const el = {
        userId: USER_ID,
        title: trimmedTitle,
        completed: false,
      };

      try {
        const createdTodo = await client.post(`/todos?userId=${USER_ID}`, el);

        setTodos([...(todos || null), createdTodo]);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
        setIsAdding(false);
        setTitle('');
        setTimeout(() => {
          const input = document.querySelector(
            '.todoapp__new-todo',
          ) as HTMLInputElement;

          input?.focus();
        }, 0);
      }
    }
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit */}
      <form
        onSubmit={event => {
          event.preventDefault();
          addTodo();
        }}
      >
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={event => setTitle(event.target.value)}
          disabled={isLoading || isAdding}
          autoFocus={!isLoading}
        />
      </form>
    </header>
  );
};
