import { RouteProps } from "react-router";

export interface ModuleRoute extends RouteProps {}

export interface Module<Name, Reducer> {
  name: Name;
  reducer: Reducer;
}

export type Location<T = {}> = typeof window.location & {
  state: T;
  key: string;
};
