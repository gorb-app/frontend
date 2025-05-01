export async function hashPassword(password: string) {
  const encodedPass = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-384", encodedPass);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashedPass = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  return hashedPass;
}