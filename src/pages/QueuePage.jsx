function QueuePage({ selectedCourt, teams, setAppPage }) {
  const courtTeams = teams.filter((team) => team.court === selectedCourt);

  const playingTeamOne = courtTeams[0];
  const playingTeamTwo = courtTeams[1];
  const onDeck = courtTeams[2];
  const waitingTeams = courtTeams.slice(3);

  return (
    <div className="queue-page">
      <header className="home-header">
        <div>
          <h1>{selectedCourt} Queue</h1>
          <p>See who is playing, who is on deck, and who is waiting.</p>
        </div>

        <button className="signout-button" onClick={() => setAppPage("home")}>
          Back Home
        </button>
      </header>

      <section className="queue-status-grid">
        <div className="queue-status-card now-playing-card">
          <h2>Now Playing</h2>

          {playingTeamOne && playingTeamTwo ? (
            <>
              <h3>
                {playingTeamOne.teamName} vs {playingTeamTwo.teamName}
              </h3>

              <p>
                <strong>Team 1 Captain:</strong> {playingTeamOne.captainName}
              </p>

              <p>
                <strong>Team 2 Captain:</strong> {playingTeamTwo.captainName}
              </p>
            </>
          ) : playingTeamOne ? (
            <>
              <h3>{playingTeamOne.teamName}</h3>
              <p>Waiting for another team to join.</p>
              <p>Captain: {playingTeamOne.captainName}</p>
            </>
          ) : (
            <p className="empty-text">No teams are currently playing.</p>
          )}
        </div>

        <div className="queue-status-card on-deck-card">
          <h2>On Deck</h2>

          {onDeck ? (
            <>
              <h3>{onDeck.teamName}</h3>
              <p>Captain: {onDeck.captainName}</p>
              <p>Joined: {onDeck.joinedAt}</p>
            </>
          ) : (
            <p className="empty-text">No team is on deck.</p>
          )}
        </div>
      </section>

      <section className="queue-list-card">
        <h2>Waiting Teams</h2>

        {waitingTeams.length === 0 ? (
          <p className="empty-text">No teams are waiting after on deck.</p>
        ) : (
          <div className="queue-team-list">
            {waitingTeams.map((team, index) => (
              <div className="queue-team-row" key={team.id}>
                <div className="queue-position">#{index + 4}</div>

                <div className="queue-team-info">
                  <h3>{team.teamName}</h3>
                  <p>Captain: {team.captainName}</p>
                  <p>{team.players.length} players</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default QueuePage;