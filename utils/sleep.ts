export default async (ms: number): Promise<NodeJS.Timeout> => {
  return new Promise(resolve => setTimeout(resolve, ms));
}
