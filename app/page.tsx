"use client";
import RandomDialog from "@/components/random-dialog";
import RegisterDialog from "@/components/register-dialog";
import SignInDialog from "@/components/sign-in-dialog";
import TopBar from "@/components/top-bar";
import { baseUrl } from "@/lib/base-url";
import { fetcher } from "@/lib/fetcher";
import { SessionData, blankSession } from "@/lib/session-storage";
import { Todo } from "@/types/todo.type";
import { User } from "@/types/user.type";
import { useState } from "react";
import useSWR from "swr";

export default function Home() {
  const { data, error, isLoading } = useSWR<User[]>(`${baseUrl}/user`, fetcher);
  const [session, setSession] = useState<SessionData>(blankSession);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  if (error) return <div>{error}</div>;

  if (isLoading) return <div>Loading ...</div>;

  const getUserNames = (users: User[]) => {
    const names: string[] = [];
    for (const user of users) {
      if (user.Random) names.push(user.UserName);
    }
    return names;
  };

  const userNames: string[] = data ? getUserNames(data) : [];

  const openDialog = (id: string) => {
    const overlay = document.getElementById("modal-overlay");
    const dialog = document.getElementById(id);
    if (overlay && dialog) {
      overlay.classList.add("open");
      dialog.classList.add("open");
    }
  };

  const closeDialog = (id: string) => {
    const overlay = document.getElementById("modal-overlay");
    const dialog = document.getElementById(id);
    if (overlay && dialog) {
      overlay.classList.remove("open");
      dialog.classList.remove("open");
    }
  };

  const showRegister = () => openDialog("register-dialog");

  const hideRegister = () => closeDialog("register-dialog");

  const register = (ev: any) => {
    console.log("register", ev);
  };

  const showSignIn = () => openDialog("sign-in-dialog");

  const hideSignIn = () => closeDialog("sign-in-dialog");

  const signIn = (ev: any) => {
    console.log("signIn", ev);
  };

  const showRandom = () => openDialog("random-dialog");

  const hideRandom = () => closeDialog("random-dialog");

  const randomSignIn = (ev: any) => {
    console.log("randomSignIn", ev);
  };

  const signOut = () => {};

  return (
    <main>
      <TopBar
        session={session}
        showRandom={showRandom}
        showRegister={showRegister}
        showSignIn={showSignIn}
        signOut={signOut}
      />
      <div id="modal-overlay" className="modal-overlay">
        <RegisterDialog cancel={hideRegister} register={register} />
        <SignInDialog cancel={hideSignIn} signIn={signIn} />
        <RandomDialog
          userNames={userNames}
          cancel={hideRandom}
          randomSignIn={randomSignIn}
        />
      </div>
      <div>Todo App</div>
    </main>
  );
}
