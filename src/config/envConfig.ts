export const getBaseUrl = (): string => {
  return process.env.NEXT_APP_API_BASE_URL || 'http://localhost:8000/api/v1'
}
