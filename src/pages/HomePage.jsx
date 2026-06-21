function HomePage({ teams, setSelectedCourt, setAppPage }) {
  const courts = ["Court 1", "Court 2", "Court 3/4"];

  const getCourtTeams = (courtName) => {
    return teams.filter((team) => team.court === courtName);
  };

  const getNowPlaying = (courtName) => {
    const courtTeams = getCourtTeams(courtName);

    if (courtTeams.length === 0) return "No one playing";

    if (courtName === "Court 3/4") {
      const court3A = courtTeams[0];
      const court3B = courtTeams[1];
      const court4A = courtTeams[2];
      const court4B = courtTeams[3];

      const court3Text =
        court3A && court3B
          ? `Court 3: ${court3A.name} vs ${court3B.name}`
          : court3A
          ? `Court 3: ${court3A.name} waiting`
          : "Court 3: Open";

      const court4Text =
        court4A && court4B
          ? `Court 4: ${court4A.name} vs ${court4B.name}`
          : court4A
          ? `Court 4: ${court4A.name} waiting`
          : "Court 4: Open";

      return `${court3Text} | ${court4Text}`;
    }

    if (courtTeams.length === 1) {
      return `${courtTeams[0].name} waiting for opponent`;
    }

    return `${courtTeams[0].name} vs ${courtTeams[1].name}`;
  };

  const getQueueTeams = (courtName) => {
    const courtTeams = getCourtTeams(courtName);

    if (courtName === "Court 3/4") {
      return courtTeams.slice(4);
    }

    return courtTeams.slice(2);
  };

  const handleViewQueue = (courtName) => {
    setSelectedCourt(courtName);
    setAppPage("queue");
  };

  return (
    <div className="home-page">
      <header className="home-header">
        <div>
          <h1>ON2 Volleyball 🏐</h1>
        </div>
      </header>

      <section className="court-section">
        <h2>Courts</h2>

        <div className="court-grid">
          {courts.map((courtName) => {
            const queueTeams = getQueueTeams(courtName);

            return (
              <div className="court-card" key={courtName}>
                <h2>{courtName}</h2>

                <p>
                  <strong>Now Playing:</strong> {getNowPlaying(courtName)}
                </p>

                <div className="court-queue-preview">
                  <strong>Queue:</strong>

                  {queueTeams.length === 0 ? (
                    <p>Empty</p>
                  ) : (
                    queueTeams.slice(0, 4).map((team) => (
                      <p key={team.id}>{team.name}</p>
                    ))
                  )}

                  {queueTeams.length > 4 && (
                    <p>+{queueTeams.length - 4} more</p>
                  )}
                </div>

                <button onClick={() => handleViewQueue(courtName)}>
                  View Queue
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default HomePage;