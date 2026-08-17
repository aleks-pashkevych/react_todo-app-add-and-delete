/* eslint-disable max-len */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';

import { USER_ID } from './api/todos';
import { client } from './utils/fetchClient';

import { Todo } from './types/Todo';

import { Footer } from './components/footer';
import { ErrorNotification } from './components/ErrorNotification';
import { Header } from './components/Header';
import { TodoApp } from './components/TodoApp/TodoApp';

// const USER_ID = 0;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] | null>(null);

  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');

  const [isAdding, setIsAdding] = useState(false);

  if (!USER_ID) {
    return <UserWarning />;
  }

  //eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    client
      .get(`/todos?userId=${USER_ID}`)
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos');
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
        // setIsError(false);
        // setErrorMessage('');
      });
  }, []);

  //eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (isError) {
      const timer = setTimeout(() => setIsError(false), 3000);

      return () => clearTimeout(timer);
    }
  }, [isError]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          todos={todos}
          setTodos={setTodos}
          USER_ID={USER_ID}
          setIsLoading={setIsLoading}
          setIsError={setIsError}
          setIsAdding={setIsAdding}
          setErrorMessage={setErrorMessage}
        />

        {todos && todos.length > 0 && (
          <TodoApp
            todos={todos}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            isAdding={isAdding}
            setIsAdding={setIsAdding}
            statusFilter={statusFilter}
            isError={isError}
            setIsError={setIsError}
            USER_ID={USER_ID}
          />
        )}
        {/* Hide the footer if there are no todos */}
        {todos && todos.length > 0 && (
          <Footer
            todos={todos}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />
        )}
      </div>
      <ErrorNotification
        isError={isError}
        setIsError={setIsError}
        errorMessage={errorMessage}
      />
    </div>
  );
};
