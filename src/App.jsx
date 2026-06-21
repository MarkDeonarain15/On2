import { useState } from "react";
import HomePage from "./pages/HomePage";
import QueuePage from "./pages/QueuePage";
import "./App.css";

function App() {
  const [appPage, setAppPage] = useState("home");
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [teams, setTeams] = useState([]);

  if (appPage === "queue") {
    return (
      <QueuePage
        selectedCourt={selectedCourt}
        teams={teams}
        setTeams={setTeams}
        setAppPage={setAppPage}
      />
    );
  }

  return (
    <HomePage
      teams={teams}
      setTeams={setTeams}
      setSelectedCourt={setSelectedCourt}
      setAppPage={setAppPage}
    />
  );
}

export default App;