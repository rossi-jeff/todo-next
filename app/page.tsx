"use client";
import RandomDialog from "@/components/random-dialog";
import RegisterDialog from "@/components/register-dialog";
import SignInDialog from "@/components/sign-in-dialog";
import TopBar from "@/components/top-bar";
import { baseUrl } from "@/lib/base-url";
import { fetcher } from "@/lib/fetcher";
import useStorage, { SessionData, sessionKey } from "@/lib/session-storage";
import { Todo } from "@/types/todo.type";
import { User } from "@/types/user.type";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { buildHeaders } from "../lib/build-headers";
import { randomUserPW } from "../lib/random-user";
import TodoCard from "../components/todo-card";
import UserButtons from "../components/user-buttons";

export default function Home() {
  const { getItem, setItem, removeItem } = useStorage();
  const { data, error, isLoading } = useSWR<User[]>(`${baseUrl}/user`, fetcher);
  const [session, setSession] = useState<SessionData>(getItem(sessionKey));
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const loadTodos = () => {
      fetch(`${baseUrl}/todo`, {
        method: "GET",
        headers: buildHeaders(session),
      })
        .then((result) => result.json())
        .then((result) => {
          if (result && result.length) {
            setTodos(result);
          }
        });
    };

    const loadCurrentUser = () => {
      fetch(`${baseUrl}/user/current`, {
        method: "GET",
        headers: buildHeaders(session),
      })
        .then((result) => result.json())
        .then((result) => {
          if (result && result.Id) {
            setCurrentUser(result);
          }
        });
    };

    if (session.Token) {
      loadTodos();
      loadCurrentUser();
    }
  }, [session]);

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
    const { UserName, PassWord, Email } = ev;
    fetch(`${baseUrl}/auth/register`, {
      method: "POST",
      body: JSON.stringify({ UserName, PassWord, Email }),
      headers: buildHeaders(session),
    })
      .then((result) => result.json())
      .then((result) => {
        console.log(result);
        signOut();
        hideRegister();
      });
  };

  const showSignIn = () => openDialog("sign-in-dialog");

  const hideSignIn = () => closeDialog("sign-in-dialog");

  const signIn = (ev: any) => {
    const { UserName, PassWord } = ev;
    fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      body: JSON.stringify({ UserName, PassWord }),
      headers: buildHeaders(session),
    })
      .then((result) => result.json())
      .then((result: any) => {
        const { Token } = result;
        if (Token) {
          setItem(sessionKey, { UserName, Token, SignedIn: true });
          setSession(getItem(sessionKey));
          hideSignIn();
        } else signOut();
      });
  };

  const showRandom = () => openDialog("random-dialog");

  const hideRandom = () => closeDialog("random-dialog");

  const randomSignIn = (ev: any) => {
    const { UserName } = ev;
    const PassWord = randomUserPW;
    fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      body: JSON.stringify({ UserName, PassWord }),
      headers: buildHeaders(session),
    })
      .then((result) => result.json())
      .then((result: any) => {
        const { Token } = result;
        if (Token) {
          setItem(sessionKey, { UserName, Token, SignedIn: true });
          setSession(getItem(sessionKey));
          hideRandom();
        } else signOut();
      });
  };

  const signOut = () => {
    removeItem(sessionKey);
    setSession(getItem(sessionKey));
    setTodos([]);
    setCurrentUser(null);
  };

  const updateTodo = (ev: any) => {
    const { Id, Task, Completed } = ev;
    if (session.Token) {
      fetch(`${baseUrl}/todo/${Id}`, {
        method: "PATCH",
        body: JSON.stringify({ Task, Completed }),
        headers: buildHeaders(session),
      }).then(() => reloadTodos());
    }
  };

  const deleteTodo = (ev: any) => {
    const { Id } = ev;
    if (session.Token && confirm("Are you sure?")) {
      fetch(`${baseUrl}/todo/${Id}`, {
        method: "DELETE",
        headers: buildHeaders(session),
      }).then(() => reloadTodos());
    }
  };

  const reloadTodos = () => {
    if (session.Token) {
      fetch(`${baseUrl}/todo`, {
        method: "GET",
        headers: buildHeaders(session),
      })
        .then((result) => result.json())
        .then((result) => {
          if (result && result.length) {
            setTodos(result);
          }
        });
    }
  };

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
      <div>
        {currentUser && <UserButtons currentUser={currentUser} />}
        {todos.map((todo) => (
          <TodoCard
            key={todo.Id}
            todo={todo}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
          />
        ))}
      </div>
    </main>
  );
}
