import { useState } from "react";

function QueuePage({ selectedCourt, teams, setTeams, setAppPage }) {
  const [nameInput, setNameInput] = useState("");
  const [lastRemovedTeam, setLastRemovedTeam] = useState(null);

  const courtTeams = teams.filter((team) => team.court === selectedCourt);

  const formatName = (name) => {
    return name
      .toLowerCase()
      .split(" ")
      .filter((word) => word.trim() !== "")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handleAddToQueue = () => {
    if (!nameInput.trim()) {
      alert("Please enter a name.");
      return;
    }

    const newTeam = {
      id: Date.now(),
      name: formatName(nameInput.trim()),
      court: selectedCourt,
      joinedAt: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setTeams([...teams, newTeam]);
    setNameInput("");
  };

  const handleRemoveTeam = (teamId) => {
    const removedTeam = teams.find((team) => team.id === teamId);
    const removedIndex = teams.findIndex((team) => team.id === teamId);

    setLastRemovedTeam({
      team: removedTeam,
      index: removedIndex,
    });

    setTeams(teams.filter((team) => team.id !== teamId));
  };

  const handleUndoRemove = () => {
    if (!lastRemovedTeam) return;

    const updatedTeams = [...teams];
    updatedTeams.splice(lastRemovedTeam.index, 0, lastRemovedTeam.team);

    setTeams(updatedTeams);
    setLastRemovedTeam(null);
  };

  const handleCourt2Winner = (winnerTeam, loserTeam) => {
    const updatedTeams = teams
      .filter((team) => team.id !== loserTeam.id)
      .map((team) => {
        if (team.id === winnerTeam.id) {
          return {
            ...team,
            court: "Court 1",
            joinedAt: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          };
        }

        return team;
      });

    setTeams(updatedTeams);
  };

  if (selectedCourt === "Court 3/4") {
    const court3A = courtTeams[0];
    const court3B = courtTeams[1];
    const court4A = courtTeams[2];
    const court4B = courtTeams[3];
    const upNext = courtTeams[4];
    const waitingTeams = courtTeams.slice(5);

    return (
      <div className="queue-page">
        <header className="home-header">
          <div>
            <h1>Court 3 & 4 Queue</h1>
          </div>

          <button className="signout-button" onClick={() => setAppPage("home")}>
            Back Home
          </button>
        </header>

        <section className="admin-card">
          <h2>Add Name To Court Queue</h2>

          <div className="admin-form">
            <input
              type="text"
              placeholder="Enter team or player name"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAddToQueue();
              }}
            />

            <button onClick={handleAddToQueue}>Add To Queue</button>
          </div>
        </section>

        <section className="queue-status-grid-equal">
          <div className="queue-status-card now-playing-card">
            <div className="court-card-header">
              <h2>Court 3</h2>

              {lastRemovedTeam && (
                <button className="undo-button" onClick={handleUndoRemove}>
                  Undo
                </button>
              )}
            </div>

            {court3A && court3B ? (
              <div className="playing-teams-wrapper">
                <div className="playing-team-box">
                  <h3>{court3A.name}</h3>
                  <button
                    className="queue-action-button"
                    onClick={() => handleRemoveTeam(court3A.id)}
                  >
                    Remove
                  </button>
                </div>

                <div className="versus-text">VS</div>

                <div className="playing-team-box">
                  <h3>{court3B.name}</h3>
                  <button
                    className="queue-action-button"
                    onClick={() => handleRemoveTeam(court3B.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : court3A ? (
              <div className="playing-team-box">
                <h3>{court3A.name}</h3>
                <p>Waiting for opponent.</p>

                <button
                  className="queue-action-button"
                  onClick={() => handleRemoveTeam(court3A.id)}
                >
                  Remove
                </button>
              </div>
            ) : (
              <p className="empty-text">Court 3 is open.</p>
            )}
          </div>

          <div className="queue-status-card on-deck-card">
            <div className="court-card-header">
              <h2>Court 4</h2>

              {lastRemovedTeam && (
                <button className="undo-button" onClick={handleUndoRemove}>
                  Undo
                </button>
              )}
            </div>

            {court4A && court4B ? (
              <div className="playing-teams-wrapper">
                <div className="playing-team-box">
                  <h3>{court4A.name}</h3>
                  <button
                    className="queue-action-button"
                    onClick={() => handleRemoveTeam(court4A.id)}
                  >
                    Remove
                  </button>
                </div>

                <div className="versus-text">VS</div>

                <div className="playing-team-box">
                  <h3>{court4B.name}</h3>
                  <button
                    className="queue-action-button"
                    onClick={() => handleRemoveTeam(court4B.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : court4A ? (
              <div className="playing-team-box">
                <h3>{court4A.name}</h3>
                <p>Waiting for opponent.</p>

                <button
                  className="queue-action-button"
                  onClick={() => handleRemoveTeam(court4A.id)}
                >
                  Remove
                </button>
              </div>
            ) : (
              <p className="empty-text">Court 4 is open.</p>
            )}
          </div>
        </section>

        <section className="queue-list-card" style={{ marginTop: "36px" }}>
          <h2>Up Next</h2>

          {upNext ? (
            <div className="queue-team-row">
              <div className="queue-position">Next</div>

              <div className="queue-team-info">
                <h3>{upNext.name}</h3>
                <p>Joined: {upNext.joinedAt}</p>
              </div>

              <button
                className="queue-action-button"
                onClick={() => handleRemoveTeam(upNext.id)}
              >
                Remove
              </button>
            </div>
          ) : (
            <p className="empty-text">No one is up next.</p>
          )}
        </section>

        <section className="queue-list-card" style={{ marginTop: "36px" }}>
          <h2>Waiting</h2>

          {waitingTeams.length === 0 ? (
            <p className="empty-text">No one is waiting.</p>
          ) : (
            <div className="queue-team-list">
              {waitingTeams.map((team, index) => (
                <div className="queue-team-row" key={team.id}>
                  <div className="queue-position">#{index + 6}</div>

                  <div className="queue-team-info">
                    <h3>{team.name}</h3>
                    <p>Joined: {team.joinedAt}</p>
                  </div>

                  <button
                    className="queue-action-button"
                    onClick={() => handleRemoveTeam(team.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    );
  }

  const playingA = courtTeams[0];
  const playingB = courtTeams[1];
  const upNext = courtTeams[2];
  const waitingTeams = courtTeams.slice(3);

  return (
    <div className="queue-page">
      <header className="home-header">
        <div>
          <h1>{selectedCourt} Queue</h1>
        </div>

        <button className="signout-button" onClick={() => setAppPage("home")}>
          Back Home
        </button>
      </header>

      <section className="admin-card">
        <h2>Add Name To {selectedCourt} Queue</h2>

        <div className="admin-form">
          <input
            type="text"
            placeholder="Enter team or player name"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddToQueue();
            }}
          />

          <button onClick={handleAddToQueue}>Add To Queue</button>
        </div>
      </section>

      <section className="queue-status-grid">
        <div className="queue-status-card now-playing-card">
          <div className="court-card-header">
            <h2>Now Playing</h2>

            {lastRemovedTeam && (
              <button className="undo-button" onClick={handleUndoRemove}>
                Undo
              </button>
            )}
          </div>

          {playingA && playingB ? (
            <div className="playing-teams-wrapper">
              <div className="playing-team-box">
                <h3>{playingA.name}</h3>

                {selectedCourt === "Court 2" ? (
                  <>
                    <button
                      className="queue-action-button winner-button"
                      onClick={() => handleCourt2Winner(playingA, playingB)}
                    >
                      Winner To Court 1
                    </button>

                    <button
                      className="queue-action-button"
                      onClick={() => handleRemoveTeam(playingA.id)}
                    >
                      Remove
                    </button>
                  </>
                ) : (
                  <button
                    className="queue-action-button"
                    onClick={() => handleRemoveTeam(playingA.id)}
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="versus-text">VS</div>

              <div className="playing-team-box">
                <h3>{playingB.name}</h3>

                {selectedCourt === "Court 2" ? (
                  <>
                    <button
                      className="queue-action-button winner-button"
                      onClick={() => handleCourt2Winner(playingB, playingA)}
                    >
                      Winner To Court 1
                    </button>

                    <button
                      className="queue-action-button"
                      onClick={() => handleRemoveTeam(playingB.id)}
                    >
                      Remove
                    </button>
                  </>
                ) : (
                  <button
                    className="queue-action-button"
                    onClick={() => handleRemoveTeam(playingB.id)}
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ) : playingA ? (
            <div className="playing-team-box">
              <h3>{playingA.name}</h3>
              <p>Waiting for opponent.</p>

              <button
                className="queue-action-button"
                onClick={() => handleRemoveTeam(playingA.id)}
              >
                Remove
              </button>
            </div>
          ) : (
            <p className="empty-text">No one is currently playing.</p>
          )}
        </div>

        <div className="queue-status-card on-deck-card">
          <h2>Up Next</h2>

          {upNext ? (
            <>
              <h3>{upNext.name}</h3>
              <p>Joined: {upNext.joinedAt}</p>

              <button
                className="queue-action-button"
                onClick={() => handleRemoveTeam(upNext.id)}
              >
                Remove
              </button>
            </>
          ) : (
            <p className="empty-text">No one is up next.</p>
          )}
        </div>
      </section>

      <section className="queue-list-card" style={{ marginTop: "42px" }}>
        <h2>Waiting</h2>

        {waitingTeams.length === 0 ? (
          <p className="empty-text">No one is waiting.</p>
        ) : (
          <div className="queue-team-list">
            {waitingTeams.map((team, index) => (
              <div className="queue-team-row" key={team.id}>
                <div className="queue-position">#{index + 4}</div>

                <div className="queue-team-info">
                  <h3>{team.name}</h3>
                  <p>Joined: {team.joinedAt}</p>
                </div>

                <button
                  className="queue-action-button"
                  onClick={() => handleRemoveTeam(team.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default QueuePage;