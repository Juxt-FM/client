/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import { useReducer, ChangeEvent } from "react";
import { useMutation } from "@apollo/client";
import Link from "next/link";

import { AuthCredentials, MUTATION_SIGNUP } from "../lib/apollo";
import { useAuthActions } from "../lib/context";

import { FormInput } from "./common/Inputs";

import { Button } from "./common/Buttons";
import { ContentSection, Header } from "./Authentication";

import styles from "../styles/modules/signup.module.scss";

const NAME_CHANGED = "name_changed";
const PASSWORD_CHANGED = "password_changed";
const CONFIRM_PASSWORD_CHANGED = "confirm_password_changed";
const EMAIL_CHANGED = "email_changed";
const PHONE_CHANGED = "phone_changed";

interface IAction {
  type: string;
  payload: string;
}

const initialFormState = {
  name: {
    value: "",
    required: false,
  },
  email: {
    value: "",
    required: true,
  },
  phoneNumber: {
    value: "",
    required: false,
  },
  password: {
    value: "",
    required: true,
  },
  confirmPassword: {
    value: "",
    required: true,
  },
};

function formReducer(state: typeof initialFormState, action: IAction) {
  switch (action.type) {
    case NAME_CHANGED:
      return { ...state, name: { ...state.name, value: action.payload } };
    case EMAIL_CHANGED:
      return { ...state, email: { ...state.email, value: action.payload } };
    case PHONE_CHANGED:
      return {
        ...state,
        phoneNumber: { ...state.phoneNumber, value: action.payload },
      };
    case PASSWORD_CHANGED:
      return {
        ...state,
        password: { ...state.password, value: action.payload },
      };
    case CONFIRM_PASSWORD_CHANGED:
      return {
        ...state,
        confirmPassword: { ...state.confirmPassword, value: action.payload },
      };
    default:
      return state;
  }
}

export const SignupForm = () => {
  const { onLogin } = useAuthActions();

  const [formValues, dispatch] = useReducer(formReducer, initialFormState);

  const getFormData = () => {
    const result = {};

    Object.keys(formValues).forEach((prop) => {
      // @ts-ignore
      const options = formValues[prop];

      if (options.value === "") {
        if (options.required)
          // @ts-ignore
          result[prop] = options.value;
      }
      // @ts-ignore
      else result[prop] = options.value;
    });

    return result;
  };

  const [signup, { loading, error }] = useMutation<{
    createUser: AuthCredentials;
  }>(MUTATION_SIGNUP, {
    variables: {
      data: getFormData(),
    },
    onCompleted: ({ createUser: { accessToken } }) => {
      onLogin(accessToken);
    },
    // tslint:disable-next-line:no-empty
    onError: () => {},
  });

  const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: NAME_CHANGED, payload: event.target.value });
  };

  const onEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: EMAIL_CHANGED, payload: event.target.value });
  };

  const onPhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: PHONE_CHANGED, payload: event.target.value });
  };

  const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: PASSWORD_CHANGED, payload: event.target.value });
  };

  const onConfirmPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: CONFIRM_PASSWORD_CHANGED, payload: event.target.value });
  };

  const getErrorsForField = (field: string): string | undefined => {
    if (!(error && error.graphQLErrors)) return undefined;

    const fieldErrors: string[] = [];

    error.graphQLErrors.forEach((err) => {
      const code = err.extensions.code;

      if (
        code === "BAD_USER_INPUT" &&
        err.extensions.invalidArgs.includes(field)
      )
        fieldErrors.push(err.message);
    });

    return fieldErrors[0];
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    signup();
  };

  return (
    <form onSubmit={onSubmit}>
      <div className={styles.signupForm}>
        <div className={styles.signupColumn}>
          <FormInput
            inputSize="sm"
            id="name"
            name="name"
            type="text"
            label="Full name"
            onChange={onNameChange}
            error={getErrorsForField("name")}
          />
          <FormInput
            inputSize="sm"
            id="email"
            name="email"
            type="email"
            label="Email address"
            onChange={onEmailChange}
            error={getErrorsForField("email.address")}
            required
          />
          <FormInput
            inputSize="sm"
            id="phone"
            name="phone"
            type="tel"
            label="Phone number"
            onChange={onPhoneChange}
            error={getErrorsForField("phone.number")}
          />
        </div>
        <div className={styles.signupColumn}>
          <p>Passwords must be longer than 8 characters.</p>
          <FormInput
            inputSize="sm"
            id="password"
            name="password"
            type="password"
            label="Password"
            onChange={onPasswordChange}
            error={getErrorsForField("password")}
            required
          />
          <FormInput
            inputSize="sm"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            onChange={onConfirmPasswordChange}
            error={getErrorsForField("confirmPassword")}
            required
          />
        </div>
      </div>

      <Button
        color="accent"
        label="Sign up"
        loading={loading}
        loadingLabel="Just a moment..."
        type="submit"
      />
    </form>
  );
};

export default function Signup() {
  return (
    <div className={styles.root}>
      <div className={styles.leftSignup}>
        <div className={styles.signupRoot}>
          <Header
            title="Create your account"
            description="Gain access to unlimited blog posts and real-time market analysis."
            color="accent"
          />
          <SignupForm />
          <div className={styles.options}>
            <div className={styles.switchAction}>
              <p>Already have an account?</p>
              <Link href="login">
                <a>Log in</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.rightSignup}>
        <ContentSection
          title="Title 1"
          content="
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores
          praesentium similique aliquam culpa suscipit, itaque, id architecto
          nihil voluptatem consequatur et atque aspernatur ex totam cupiditate
          obcaecati quos autem sed."
        />
        <ContentSection
          title="Title 2"
          content="
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores
          praesentium similique aliquam culpa suscipit, itaque, id architecto
          nihil voluptatem consequatur et atque aspernatur ex totam cupiditate
          obcaecati quos autem sed."
        />
        <ContentSection
          title="Title 3"
          content="
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores
          praesentium similique aliquam culpa suscipit, itaque, id architecto
          nihil voluptatem consequatur et atque aspernatur ex totam cupiditate
          obcaecati quos autem sed."
        />
      </div>
    </div>
  );
}
