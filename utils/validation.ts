export default (username: string) => {
  return /^[\w.-]+$/.test(username);
}