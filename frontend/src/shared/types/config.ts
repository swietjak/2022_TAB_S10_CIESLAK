import { RouteProps } from "react-router";

export interface ModuleRoute extends RouteProps {
  public?: boolean;
  modal?: boolean;
}

export interface Module<Name, Reducer> {
  name: Name;
  routes: ModuleRoute[];
  reducer: Reducer;
}

export type Location<T = {}> = typeof window.location & {
  state: T;
  key: string;
};
