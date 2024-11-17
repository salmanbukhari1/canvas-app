import React from 'react';
import Button from '../Controls/Button';
import FormField from './FormField';
import ErrorNotification from '../Notifiers/ErrorNotification';
import Loading from '../Notifiers/Loading';

const AuthForm = ({
  title,
  fields,
  onSubmit,
  loading,
  error,
}) => {
  return (
    <div className="med-container">
      <h2>{title}</h2>
      {fields.map((field, index) => (
        <FormField
          key={index}
          type={field.type}
          value={field.value}
          onChange={field.onChange}
          placeholder={field.placeholder}
        />
      ))}
      <Button onClick={onSubmit} disabled={loading}>
        {title}
      </Button>
      {error && <ErrorNotification message={error} />}
      {loading && <Loading />}
    </div>
  );
};

export default AuthForm;
