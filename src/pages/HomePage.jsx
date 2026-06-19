function HomePage({
  signedInUser,
  setSignedInUser,
  checkedInUsers,
  setCheckedInUsers,
  setSelectedCourt,
  setAppPage,
  teams,
}) {
  const isCheckedIn = checkedInUsers.some(
    (user) => user.email === signedInUser.email
  );

  const courts = ["Court 1", "Court 2", "Court 3"];

  const handleCheckIn = () => {
    if (isCheckedIn) {
      alert("You are already checked in for today.");
      return;
    }

    const checkedInUser = {
      id: signedInUser.id,
      firstName: signedInUser.firstName,
      lastName: signedInUser.lastName,
      email: signedInUser.email,
      phoneNumber: signedInUser.phoneNumber,
      checkedInAt: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setCheckedInUsers([...checkedInUsers, checkedInUser]);
  };

  const handleViewQueue = (courtName) => {
    setSelectedCourt(courtName);
    setAppPage("queue");
  };

  const handleJoinQueue = (courtName) => {
    if (!isCheckedIn) {
      alert("You must check in before joining a queue.");
      return;
    }

    setSelectedCourt(courtName);
    setAppPage("createTeam");
  };

  const handleSignOut = () => {
    setSignedInUser(null);
  };

  const getCourtTeams = (courtName) => {
    return teams.filter((team) => team.court === courtName);
  };

  const getNowPlaying = (courtName) => {
    const courtTeams = getCourtTeams(courtName);

    if (courtTeams.length === 0) {
      return "No teams playing";
    }

    if (courtTeams.length === 1) {
      return `${courtTeams[0].teamName} waiting for opponent`;
    }

    return `${courtTeams[0].teamName} vs ${courtTeams[1].teamName}`;
  };

  const getWaitingTeamsCount = (courtName) => {
  const courtTeams = getCourtTeams(courtName);

  if (courtTeams.length <= 2) {
    return 0;
  }

  return courtTeams.length - 2;
};

  const getQueueText = (courtName) => {
    const waitingCount = getWaitingTeamsCount(courtName);
    const teamWord = waitingCount === 1 ? "team" : "teams";

    return `${waitingCount} ${teamWord} waiting`;
  };

  return (
    <div className="home-page">
      <header className="home-header">
        <div>
          <h1>ON2 🏐</h1>
          <p>Know when you're on next.</p>
        </div>

        <button onClick={handleSignOut} className="signout-button">
          Sign Out
        </button>
      </header>

      <section className="welcome-section">
        <h2>Welcome back, {signedInUser.firstName}</h2>
        <p>{signedInUser.email}</p>
      </section>

      <section className="checkin-card">
        <h2>Daily Check-In</h2>

        {isCheckedIn ? (
          <p className="checked-in-text">✓ Checked In For Today</p>
        ) : (
          <p className="not-checked-in-text">○ Not Checked In</p>
        )}

        {!isCheckedIn && (
          <button onClick={handleCheckIn}>
            Check In For Today's Session
          </button>
        )}
      </section>

      <section className="attendance-card">
        <h2>Players Checked In Today</h2>

        <p className="attendance-count">
          {checkedInUsers.length} player
          {checkedInUsers.length === 1 ? "" : "s"} checked in
        </p>

        {checkedInUsers.length === 0 ? (
          <p className="empty-text">No players checked in yet.</p>
        ) : (
          <div className="player-list">
            {checkedInUsers.map((user) => (
              <div className="player-row" key={user.email}>
                <div>
                  <strong>
                    {user.firstName} {user.lastName}
                  </strong>
                  <p>{user.email}</p>
                </div>

                <span>{user.checkedInAt}</span>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="court-section">
        <h2>Choose a Court</h2>
        <p>
          View the current queue or join a court by creating a team with
          checked-in players.
        </p>

        <div className="court-grid">
          {courts.map((courtName) => (
            <div className="court-card" key={courtName}>
              <h2>{courtName}</h2>

              <p>
                <strong>Now Playing:</strong> {getNowPlaying(courtName)}
              </p>

              <p>
                <strong>Queue:</strong> {getQueueText(courtName)}
              </p>

              <div className="court-actions">
                <button onClick={() => handleViewQueue(courtName)}>
                  View Queue
                </button>

                <button
                  onClick={() => handleJoinQueue(courtName)}
                  disabled={!isCheckedIn}
                  className={!isCheckedIn ? "disabled-button" : ""}
                >
                  Join Queue
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;