export default (uuid: string) => {
  const parts = uuid.split("-");
  const bits = parts[0] + parts[1].slice(0, 4);
  const timestamp = parseInt(bits, 16);  
  return timestamp;
}
