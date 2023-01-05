const HEADERS = { "Content-Type": "application/json" };

export default class Api {
  public createGame(nickname: string, maxRounds: number) {
    const requestOptions = {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify({ nickname: nickname, max_rounds: maxRounds }),
    };
    return fetch("/api/game", requestOptions).then((res) => res.json());
  }

  public joinGame(gameId: string, nickname: string) {
    const requestOptions = {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify({ nickname: nickname }),
    };
    return fetch(`/api/game/${gameId}/join`, requestOptions).then((res) =>
      res.json()
    );
  }

  public action(gameId: string, nickname: string, action: string) {
    const requestOptions = {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify({ nickname: nickname, action: action }),
    };
    return fetch(`/api/game/${gameId}/action`, requestOptions).then((res) =>
      res.json()
    );
  }

  public game(gameId: string) {
    const requestOptions = {
      method: "GET",
      headers: HEADERS,
    };
    return fetch(`/api/game/${gameId}`, requestOptions).then((res) =>
      res.json()
    );
  }

  public stat() {
    const requestOptions = {
      method: "GET",
      headers: HEADERS,
    };
    return fetch(`/api/stat`, requestOptions).then((res) => res.json());
  }
}
