export default interface UseCase {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  execute(data: any): Promise<any>
}