export async function searchShows(showName: string): Promise<unknown> {
  const url = new URL("/search/shows", process.env.TVMAZE_API_URL);
  url.searchParams.set("q", showName);

  const response = await fetch(url, {
    headers: { Accept: "application/json" },
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    throw new Error(`TVmaze returned status ${response.status}`);
  }

  return response.json();
}
