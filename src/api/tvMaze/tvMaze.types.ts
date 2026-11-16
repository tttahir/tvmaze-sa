interface Country {
  name: string
  code: string
  timezone: string
}

interface Channel {
  id: number
  name: string
  country: Country | null
  officialSite: string | null
}

interface Link {
  href: string
  name?: string
}

export interface Show {
  id: number
  url: string
  name: string
  type: string
  language: string | null
  genres: string[]
  status: string
  runtime: number | null
  averageRuntime: number | null
  premiered: string | null
  ended: string | null
  officialSite: string | null
  schedule: { time: string; days: string[] }
  rating: { average: number | null }
  weight: number
  network: Channel | null
  webChannel: Channel | null
  dvdCountry: Country | null
  externals: {
    tvrage: number | null
    thetvdb: number | null
    imdb: string | null
  }
  image: { medium: string; original: string } | null
  summary: string | null
  updated: number
  _links: {
    self: Link
    previousepisode?: Link
    nextepisode?: Link
  }
}

export interface ShowSearchResult {
  score: number
  show: Show
}
