import * as styles from './RegistrationPanel.styles';
import { FC, useCallback, useContext, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { handleLogin } from './Registration.utils';
import { AuthDispatchContext } from '../../Contexts/Auth';
import { useNavigate } from 'react-router-dom';

const validationSchema = z.object({
  email: z.string().nonempty({ message: 'Please enter your login email.' }).email({
    message: 'Must be a valid email.',
  }),
  password: z.string().nonempty({ message: 'Please enter your password.' }),
});

type ValidationSchema = z.infer<typeof validationSchema>;
const resolver = zodResolver(validationSchema);

type ComponentProps = {
  onClose: () => void;
};

const LoginPanel: FC<ComponentProps> = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({ resolver });

  const [submitError, setSubmitError] = useState<string | null>(null);

  const dispatch = useContext(AuthDispatchContext);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<ValidationSchema> = useCallback(
    async (data) => {
      const error = await handleLogin(data, dispatch, navigate);

      if (error) {
        setSubmitError(error);
      } else {
        onClose();
      }
    },
    [dispatch, navigate, onClose],
  );

  return (
    <div className={styles.Component}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.InputContainer}>
          <input type="text" placeholder="Email" {...register('email')} />
          {errors?.email && <span>{errors.email.message}</span>}
        </div>
        <div className={styles.InputContainer}>
          <input type="password" placeholder="Password" {...register('password')} />
          {errors?.password && <span>{errors.password.message}</span>}
        </div>
        <div className={styles.InputContainer}>
          <label>
            <input type="checkbox" role="checkbox" />
            Remember me
          </label>
        </div>
        <div className={styles.InputContainer}>
          {submitError && <span>{submitError}</span>}
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export { LoginPanel };
