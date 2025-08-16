export default (uuid: string): Date => {
  const timeHex = uuid.substring(0, 8) + uuid.substring(9, 13);
  const timestamp = parseInt(timeHex, 16);

  return new Date(timestamp);
}