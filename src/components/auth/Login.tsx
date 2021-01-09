/**
 * @author Andrew Perera
 * Copyright (C) 2020 - All rights reserved
 */

import { ChangeEvent, FormEvent, useState } from "react";
import { ApolloError, useMutation } from "@apollo/client";
import Link from "next/link";

import { AuthCredentials, MUTATION_LOGIN } from "../../lib/graphql";
import { useAuthActions } from "../../lib/context";

import { ContentSection, Header } from "./Authentication";

import { FormInput } from "../common/Inputs";
import { Button } from "../common/Buttons";

import styles from "../../styles/auth/login.module.scss";

export const Error = ({ message }: { message: string }) => (
  <div className={styles.error}>
    <p>{message}</p>
  </div>
);

export const LoginErrors = ({ error }: { error: ApolloError }) => {
  const renderContent = () => {
    if (error) {
      if (error.graphQLErrors && error.graphQLErrors.length > 0) {
        return error.graphQLErrors.map((err) => (
          <Error message={err.message} key={err.message} />
        ));
      } else if (error.networkError) {
        return <Error message={error.networkError.message} />;
      }
    }
  };

  return <div className={styles.loginErrors}>{renderContent()}</div>;
};

const LoginForm = () => {
  const { onLogin } = useAuthActions();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const [login, { loading, error }] = useMutation<{
    loginUser: AuthCredentials;
  }>(MUTATION_LOGIN, {
    variables: {
      data: {
        identifier,
        password,
      },
    },
    onCompleted: ({ loginUser: { accessToken } }) => {
      onLogin(accessToken);
    },
    // tslint:disable-next-line:no-empty
    onError: () => {},
  });

  const onIdentifierChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIdentifier(event.target.value);
  };

  const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onLoginUser = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login();
  };

  return (
    <form id="loginForm" className={styles.loginForm} onSubmit={onLoginUser}>
      <FormInput
        id="identifier"
        name="identifier"
        onChange={onIdentifierChange}
        type="text"
        label="Email or phone number"
        required
      />
      <FormInput
        id="password"
        name="password"
        onChange={onPasswordChange}
        type="password"
        label="Password"
        required
      />
      <Button
        id="login"
        label="Log in"
        disabled={!identifier || !password}
        loading={loading}
        loadingLabel="Just a moment..."
        type="submit"
      />
      <LoginErrors error={error} />
    </form>
  );
};

export default function Login() {
  return (
    <div className={[styles.root, styles.reverse].join(" ")}>
      <div className={styles.leftLogin}>
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
      </div>
      <div className={styles.rightLogin}>
        <div className={styles.loginWrapper}>
          <Header title="Log in to your account" color="black" />
          <LoginForm />
          <div className={styles.options}>
            <div className={styles.switchAction}>
              <p>Don't have an account?</p>
              <Link href="/auth/signup">
                <a>Sign up</a>
              </Link>
            </div>
            <Link href="/auth/forgot-password">
              <a>Forgot password</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
