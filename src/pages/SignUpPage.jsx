import { useState } from "react";

function SignUpPage({
  users,
  setUsers,
  setCurrentPage,
}) {
  const [firstName, setFirstName] =
    useState("");

  const [lastName, setLastName] =
    useState("");

  const [email, setEmail] = useState("");

  const [phoneNumber, setPhoneNumber] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const formatPhoneNumber = (value) => {
    const phoneNumber = value.replace(/\D/g, "");

    if (phoneNumber.length < 4) {
      return phoneNumber;
    }

    if (phoneNumber.length < 7) {
      return `(${phoneNumber.slice(
        0,
        3
      )}) ${phoneNumber.slice(3)}`;
    }

    return `(${phoneNumber.slice(
      0,
      3
    )}) ${phoneNumber.slice(
      3,
      6
    )}-${phoneNumber.slice(6, 10)}`;
  };

  const handlePhoneChange = (e) => {
    setPhoneNumber(
      formatPhoneNumber(e.target.value)
    );
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

    return passwordRegex.test(password);
  };

  const handleSignUp = () => {
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !password ||
      !confirmPassword
    ) {
      alert("Please fill out all fields.");
      return;
    }

    if (!validatePassword(password)) {
      alert(
        "Password does not meet the requirements."
      );
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const existingUser = users.find(
      (user) =>
        user.email ===
        email.trim().toLowerCase()
    );

    if (existingUser) {
      alert(
        "An account with this email already exists."
      );
      return;
    }

    const newUser = {
      id: Date.now(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim().toLowerCase(),
      phoneNumber,
      password,
    };

    setUsers([...users, newUser]);

    alert(
      "Account created successfully. Please log in."
    );

    setCurrentPage("signin");
  };

  const passwordRequirements = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number: /\d/.test(password),
    special:
      /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(
        password
      ),
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Create Account</h1>

        <p>
          Join ON2 and start queuing for courts.
        </p>

        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) =>
            setFirstName(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) =>
            setLastName(e.target.value)
          }
        />

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="tel"
          placeholder="(123) 456-7890"
          value={phoneNumber}
          onChange={handlePhoneChange}
          maxLength={14}
        />

        <div
          style={{
            position: "relative",
          }}
        >
          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            placeholder="Create Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }
            style={{
              position: "absolute",
              right: "10px",
              top: "10px",
              width: "auto",
              padding: "5px",
              background: "transparent",
              border: "none",
              fontSize: "18px",
              cursor: "pointer",
            }}
          >
            {showPassword ? "🙈" : "👁"}
          </button>
        </div>

        <div
          style={{
            textAlign: "left",
            marginBottom: "15px",
            fontSize: "14px",
          }}
        >
          <p
            style={{
              color: passwordRequirements.length
                ? "#22c55e"
                : "#ef4444",
            }}
          >
            ✓ Minimum 8 characters
          </p>

          <p
            style={{
              color: passwordRequirements.uppercase
                ? "#22c55e"
                : "#ef4444",
            }}
          >
            ✓ At least one uppercase letter
          </p>

          <p
            style={{
              color: passwordRequirements.number
                ? "#22c55e"
                : "#ef4444",
            }}
          >
            ✓ At least one number
          </p>

          <p
            style={{
              color: passwordRequirements.special
                ? "#22c55e"
                : "#ef4444",
            }}
          >
            ✓ At least one special character
          </p>
        </div>

        <div
          style={{
            position: "relative",
          }}
        >
          <input
            type={
              showConfirmPassword
                ? "text"
                : "password"
            }
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
          />

          <button
            type="button"
            onClick={() =>
              setShowConfirmPassword(
                !showConfirmPassword
              )
            }
            style={{
              position: "absolute",
              right: "10px",
              top: "10px",
              width: "auto",
              padding: "5px",
              background: "transparent",
              border: "none",
              fontSize: "18px",
              cursor: "pointer",
            }}
          >
            {showConfirmPassword
              ? "🙈"
              : "👁"}
          </button>
        </div>

        {confirmPassword && (
          <p
            style={{
              color:
                password === confirmPassword
                  ? "#22c55e"
                  : "#ef4444",
              textAlign: "left",
              marginBottom: "15px",
            }}
          >
            {password === confirmPassword
              ? "✓ Passwords match"
              : "✗ Passwords do not match"}
          </p>
        )}

        <button onClick={handleSignUp}>
          Create Account
        </button>

        <p className="switch-text">
          Already have an account?
          <button
            className="link-button"
            onClick={() =>
              setCurrentPage("signin")
            }
          >
            Log In
          </button>
        </p>
      </div>
    </div>
  );
}

export default SignUpPage;