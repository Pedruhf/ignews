import { signIn, signOut, useSession } from "next-auth/react";

import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";

import styles from "./styles.module.scss";

export function SignInButton() {
  const { data, status } = useSession();

  return status === "authenticated" ? (
    <button className={styles.signInButton}>
      <FaGithub color="#04d361" />
      {data.user.name}
      <FiX
        onClick={() => signOut()}
        className={styles.closeIcon}
        color="#737380"
      />
    </button>
  ) : (
    <button
      className={styles.signInButton}
      onClick={() => signIn("github")}
    >
      <FaGithub color="#eba417" />
      Sign in with Github
    </button>
  );
}