export function validateUsername(username: string) {
  return /^[\w.-]+$/.test(username);
}