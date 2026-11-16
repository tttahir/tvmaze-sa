export class ApiError extends Error {
  readonly response: Response
  readonly status: number

  constructor(response: Response) {
    super(`API request failed: ${response.status} ${response.statusText}`)
    this.name = 'ApiError'
    this.response = response
    this.status = response.status
  }
}
