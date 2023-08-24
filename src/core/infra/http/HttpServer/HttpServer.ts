export default interface HttpServer<RouteHandlerMethod> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register(plugin: any, opts?: any): void;
  on(method: string, url: string, handler: RouteHandlerMethod): Promise<void>;
  listen (port: number): Promise<void>;
}