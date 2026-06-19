import { useState } from "react";

function CreateTeamPage({
  signedInUser,
  checkedInUsers,
  selectedCourt,
  teams,
  setTeams,
  setAppPage,
}) {
  const [playerInputs, setPlayerInputs] = useState(["", "", ""]);

  const [selectedPlayers, setSelectedPlayers] = useState([
    {
      id: signedInUser.id,
      firstName: signedInUser.firstName,
      lastName: signedInUser.lastName,
      email: signedInUser.email,
      isGuest: false,
    },
  ]);

  const activePlayerEmails = teams.flatMap((team) =>
    team.players
      .filter((player) => !player.isGuest)
      .map((player) => player.email)
  );

  const signedInUserAlreadyQueued = activePlayerEmails.includes(
    signedInUser.email
  );

  const availablePlayers = checkedInUsers.filter(
    (user) =>
      !activePlayerEmails.includes(user.email) &&
      !selectedPlayers.some((player) => player.email === user.email)
  );

  const handleInputChange = (index, value) => {
    const updatedInputs = [...playerInputs];
    updatedInputs[index] = value;
    setPlayerInputs(updatedInputs);
  };

  const handleSelectPlayer = (index, player) => {
    if (activePlayerEmails.includes(player.email)) {
      alert(`${player.firstName} ${player.lastName} is already in a queue.`);
      return;
    }

    const existingPlayerForInput = selectedPlayers.find(
      (selectedPlayer) =>
        `${selectedPlayer.firstName} ${selectedPlayer.lastName}` ===
        playerInputs[index]
    );

    let updatedPlayers = [...selectedPlayers];

    if (existingPlayerForInput) {
      updatedPlayers = updatedPlayers.filter(
        (selectedPlayer) =>
          selectedPlayer.email !== existingPlayerForInput.email
      );
    }

    const updatedInputs = [...playerInputs];
    updatedInputs[index] = `${player.firstName} ${player.lastName}`;
    setPlayerInputs(updatedInputs);

    setSelectedPlayers([
      ...updatedPlayers,
      {
        id: player.id,
        firstName: player.firstName,
        lastName: player.lastName,
        email: player.email,
        isGuest: false,
      },
    ]);
  };

  const handleAddGuest = (index) => {
    const guestNumber =
      selectedPlayers.filter((player) => player.isGuest).length + 1;

    const guestPlayer = {
      id: `guest-${Date.now()}-${index}`,
      firstName: "Guest",
      lastName: `${guestNumber}`,
      email: `guest-${Date.now()}-${index}@on2.local`,
      isGuest: true,
    };

    const existingPlayerForInput = selectedPlayers.find(
      (selectedPlayer) =>
        `${selectedPlayer.firstName} ${selectedPlayer.lastName}` ===
        playerInputs[index]
    );

    let updatedPlayers = [...selectedPlayers];

    if (existingPlayerForInput) {
      updatedPlayers = updatedPlayers.filter(
        (selectedPlayer) =>
          selectedPlayer.email !== existingPlayerForInput.email
      );
    }

    const updatedInputs = [...playerInputs];
    updatedInputs[index] = `Guest ${guestNumber}`;
    setPlayerInputs(updatedInputs);

    setSelectedPlayers([...updatedPlayers, guestPlayer]);
  };

  const handleRemovePlayer = (email) => {
    if (email === signedInUser.email) {
      alert("The captain cannot be removed.");
      return;
    }

    const playerToRemove = selectedPlayers.find(
      (player) => player.email === email
    );

    setSelectedPlayers(
      selectedPlayers.filter((player) => player.email !== email)
    );

    if (playerToRemove) {
      const playerName = `${playerToRemove.firstName} ${playerToRemove.lastName}`;

      setPlayerInputs(
        playerInputs.map((input) => (input === playerName ? "" : input))
      );
    }
  };

  const getSearchResults = (searchText) => {
    if (!searchText.trim()) {
      return [];
    }

    if (searchText.trim().toLowerCase() === "guest") {
      return [];
    }

    const search = searchText.toLowerCase();

    return availablePlayers.filter((player) => {
      const fullName = `${player.firstName} ${player.lastName}`.toLowerCase();
      const email = player.email.toLowerCase();

      return fullName.includes(search) || email.includes(search);
    });
  };

  const handleJoinQueue = () => {
    if (signedInUserAlreadyQueued) {
      alert(
        "You are already on an active team. You cannot join another queue until your current team is finished."
      );
      return;
    }

    if (selectedPlayers.length !== 4) {
      alert("Grass volleyball quads require exactly 4 players.");
      return;
    }

    const duplicatePlayers = selectedPlayers.filter(
      (player) =>
        !player.isGuest && activePlayerEmails.includes(player.email)
    );

    if (duplicatePlayers.length > 0) {
      alert(
        `${duplicatePlayers[0].firstName} ${duplicatePlayers[0].lastName} is already in an active queue.`
      );
      return;
    }

    const newTeam = {
      id: Date.now(),
      teamName: `${signedInUser.firstName}'s Team`,
      court: selectedCourt,
      captainEmail: signedInUser.email,
      captainName: `${signedInUser.firstName} ${signedInUser.lastName}`,
      players: selectedPlayers,
      joinedAt: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setTeams([...teams, newTeam]);
    setAppPage("home");
  };

  if (signedInUserAlreadyQueued) {
    return (
      <div className="create-team-page">
        <header className="home-header">
          <div>
            <h1>Create Quad Team</h1>
            <p>{selectedCourt}</p>
          </div>

          <button
            className="signout-button"
            onClick={() => setAppPage("home")}
          >
            Back Home
          </button>
        </header>

        <section className="create-team-card">
          <h2>You are already in a queue</h2>

          <p className="helper-text">
            You cannot create or join another team while your current team is
            playing, on deck, or waiting in a queue.
          </p>

          <button onClick={() => setAppPage("home")}>Return Home</button>
        </section>
      </div>
    );
  }

  return (
    <div className="create-team-page">
      <header className="home-header">
        <div>
          <h1>Create Quad Team</h1>
          <p>{selectedCourt}</p>
        </div>

        <button className="signout-button" onClick={() => setAppPage("home")}>
          Back Home
        </button>
      </header>

      <section className="create-team-card">
        <h2>Checked-In Players</h2>

        <p className="helper-text">
          Grass volleyball quads require exactly 4 players. You are already
          added as the captain. Search for 3 checked-in players, or type guest
          if someone does not have the app.
        </p>

        <div className="team-builder">
          <div className="locked-player-box">
            <strong>
              {signedInUser.firstName} {signedInUser.lastName}
            </strong>
            <p>Captain</p>
          </div>

          {playerInputs.map((input, index) => {
            const searchResults = getSearchResults(input);
            const showGuestOption = input.trim().toLowerCase() === "guest";

            return (
              <div className="player-search-box" key={index}>
                <input
                  type="text"
                  placeholder={`Player ${index + 2} name or guest`}
                  value={input}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                />

                {searchResults.length > 0 && (
                  <div className="search-results">
                    {searchResults.map((player) => (
                      <button
                        key={player.email}
                        onClick={() => handleSelectPlayer(index, player)}
                      >
                        {player.firstName} {player.lastName}
                        <span>{player.email}</span>
                      </button>
                    ))}
                  </div>
                )}

                {showGuestOption && (
                  <div className="search-results">
                    <button onClick={() => handleAddGuest(index)}>
                      Add Guest Player
                      <span>No account needed</span>
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section className="create-team-card">
        <h2>Team Summary</h2>

        <p>
          <strong>Court:</strong> {selectedCourt}
        </p>

        <p>
          <strong>Players Selected:</strong> {selectedPlayers.length}/4
        </p>

        <div className="selected-team-list">
          {selectedPlayers.map((player) => (
            <div className="selected-team-row" key={player.email}>
              <div>
                <strong>
                  {player.firstName} {player.lastName}
                </strong>

                <p>
                  {player.email === signedInUser.email
                    ? "Captain"
                    : player.isGuest
                    ? "Guest Player"
                    : player.email}
                </p>
              </div>

              {player.email !== signedInUser.email && (
                <button onClick={() => handleRemovePlayer(player.email)}>
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>

        <button onClick={handleJoinQueue}>Join {selectedCourt} Queue</button>
      </section>
    </div>
  );
}

export default CreateTeamPage;