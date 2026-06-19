import { useState } from "react";

function SignInPage({
  users,
  setSignedInUser,
  setCurrentPage,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const foundUser = users.find(
      (user) =>
        user.email === email.trim().toLowerCase() &&
        user.password === password
    );

    if (!foundUser) {
      alert("Invalid email or password.");
      return;
    }

    setSignedInUser(foundUser);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>ON2 🏐</h1>

        <p>
          The smarter way to manage volleyball court
          queues.
        </p>

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button onClick={handleLogin}>
          Log In
        </button>

        <p className="switch-text">
          Don't have an account?
          <button
            className="link-button"
            onClick={() =>
              setCurrentPage("signup")
            }
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}

export default SignInPage;