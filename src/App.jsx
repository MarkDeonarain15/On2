import { useState } from "react";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import CreateTeamPage from "./pages/CreateTeamPage";
import QueuePage from "./pages/QueuePage";
import "./App.css";

function App() {
  const demoUsers = [
    {
      id: 1,
      firstName: "Mark",
      lastName: "Deonarain",
      email: "mark@test.com",
      phoneNumber: "(201) 469-5952",
      password: "Password1!",
    },
    {
      id: 2,
      firstName: "Alex",
      lastName: "Rivera",
      email: "alex@test.com",
      phoneNumber: "(201) 555-1111",
      password: "Password1!",
    },
    {
      id: 3,
      firstName: "Sarah",
      lastName: "Kim",
      email: "sarah@test.com",
      phoneNumber: "(201) 555-2222",
      password: "Password1!",
    },
    {
      id: 4,
      firstName: "Kevin",
      lastName: "Patel",
      email: "kevin@test.com",
      phoneNumber: "(201) 555-3333",
      password: "Password1!",
    },
    {
      id: 5,
      firstName: "Jordan",
      lastName: "Smith",
      email: "jordan@test.com",
      phoneNumber: "(201) 555-4444",
      password: "Password1!",
    },
    {
      id: 6,
      firstName: "Mia",
      lastName: "Lopez",
      email: "mia@test.com",
      phoneNumber: "(201) 555-5555",
      password: "Password1!",
    },
  ];

  const [authPage, setAuthPage] = useState("signin");
  const [appPage, setAppPage] = useState("home");

  const [signedInUser, setSignedInUser] = useState(null);
  const [users, setUsers] = useState(demoUsers);
  const [checkedInUsers, setCheckedInUsers] = useState([]);
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [teams, setTeams] = useState([]);

  if (!signedInUser) {
    if (authPage === "signup") {
      return (
        <SignUpPage
          users={users}
          setUsers={setUsers}
          setCurrentPage={setAuthPage}
        />
      );
    }

    return (
      <SignInPage
        users={users}
        setSignedInUser={setSignedInUser}
        setCurrentPage={setAuthPage}
      />
    );
  }

  if (appPage === "createTeam") {
    return (
      <CreateTeamPage
        signedInUser={signedInUser}
        checkedInUsers={checkedInUsers}
        selectedCourt={selectedCourt}
        teams={teams}
        setTeams={setTeams}
        setAppPage={setAppPage}
      />
    );
  }

  if (appPage === "queue") {
    return (
      <QueuePage
        selectedCourt={selectedCourt}
        teams={teams}
        setAppPage={setAppPage}
      />
    );
  }

  return (
    <HomePage
      signedInUser={signedInUser}
      setSignedInUser={setSignedInUser}
      checkedInUsers={checkedInUsers}
      setCheckedInUsers={setCheckedInUsers}
      setSelectedCourt={setSelectedCourt}
      setAppPage={setAppPage}
      teams={teams}
    />
  );
}

export default App;