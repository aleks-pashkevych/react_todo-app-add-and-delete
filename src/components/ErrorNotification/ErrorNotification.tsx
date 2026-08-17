import React from 'react';

type Props = {
  isError: boolean;
  setIsError: (err: boolean) => void;
  errorMessage: string;
};

export const ErrorNotification: React.FC<Props> = ({
  isError,
  setIsError,
  errorMessage,
}) => {
  const toHide = isError === false ? 'hidden' : '';

  return (
    <div
      data-cy="ErrorNotification"
      className={`notification is-danger is-light has-text-weight-normal ${toHide}`}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setIsError(false)}
      />
      {/* show only one message at a time */}
      {errorMessage}
      <br />
      {/* Title should not be empty
      <br />
      Unable to add a todo
      <br />
      Unable to delete a todo
      <br />
      Unable to update a todo */}
    </div>
  );
};
