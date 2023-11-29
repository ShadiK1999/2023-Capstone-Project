import * as styles from './RegistrationPanel.styles';
import { FC, useCallback, useContext, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { handleRegister } from './Registration.utils';
import { AuthDispatchContext } from '../../Contexts/Auth';
import { useNavigate } from 'react-router-dom';

export const errorMessages = {
  name: 'Full name is required.',
  phoneNumber: 'Phone number is required and must be 10 digits long.',
  email: 'Email is required.',
  emailValid: 'Must be a valid email.',
  password: 'Password must be at-least 6 characters.',
  confirmPassword: 'Please confirm your password.',
  terms: 'You must agree to the terms and conditions.',
  passwordsDontMatch: 'Passwords do not match.',
};

const {
  name,
  phoneNumber,
  email,
  emailValid,
  password,
  confirmPassword,
  terms,
  passwordsDontMatch,
} = errorMessages;

const validationSchema = z
  .object({
    name: z.string().min(1, { message: name }),
    phoneNumber: z.string().min(10, { message: phoneNumber }),
    email: z.string().min(1, { message: email }).email({
      message: emailValid,
    }),
    password: z.string().min(6, { message: password }),
    confirmPassword: z.string().min(1, { message: confirmPassword }),
    terms: z.literal(true, {
      errorMap: () => ({ message: terms }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: passwordsDontMatch,
  });

type ValidationSchema = z.infer<typeof validationSchema>;
const resolver = zodResolver(validationSchema);

type ComponentProps = {
  onClose: () => void;
};

const RegistrationPanel: FC<ComponentProps> = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({ resolver });

  const [submitError, setSubmitError] = useState<string | null>(null);
  const navigate = useNavigate();

  const dispatch = useContext(AuthDispatchContext);

  const onSubmit: SubmitHandler<ValidationSchema> = useCallback(
    async (data) => {
      const error = await handleRegister(data, dispatch, navigate);

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
          <input type="text" placeholder="Full name" {...register('name')} />
          {errors?.name && <span>{errors.name.message}</span>}
        </div>
        <div className={styles.InputContainer}>
          <input type="text" placeholder="Phone number" {...register('phoneNumber')} />
          {errors?.phoneNumber && <span>{errors.phoneNumber.message}</span>}
        </div>
        <div className={styles.InputContainer}>
          <input type="text" placeholder="Email" {...register('email')} />
          {errors?.email && <span>{errors.email.message}</span>}
        </div>
        <div className={styles.InputContainer}>
          <input type="password" placeholder="Password" {...register('password')} />
          {errors?.password && <span>{errors.password.message}</span>}
        </div>
        <div className={styles.InputContainer}>
          <input type="password" placeholder="Confirm Password" {...register('confirmPassword')} />
          {errors?.confirmPassword && <span>{errors.confirmPassword.message}</span>}
        </div>
        <div className={styles.InputContainer}>
          <label>
            <input type="checkbox" role="checkbox" {...register('terms')} />I agree to the terms and
            conditions
          </label>
          {errors?.terms && <span>{errors.terms.message}</span>}
        </div>
        <div className={styles.InputContainer}>
          {submitError && <span>{submitError}</span>}
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export { RegistrationPanel };
