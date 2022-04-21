import { Suspense, SuspenseProps, lazy } from "react";
import { Loader } from "shared/components";
import ErrorBoundary, { ErrorBoundaryProps } from "./ErrorBoundary";

export interface LoadableProps extends ErrorBoundaryProps {
  component(): Promise<{ default: React.ComponentType<any> }>;
  loader?: SuspenseProps["fallback"];
}

const Loadable = ({
  component,
  errorHandler,
  loader,
  ...errorBoundaryProps
}: LoadableProps) => {
  const Component = lazy(component);
  return <T extends {}>(componentProps: T) => (
    <Suspense fallback={loader || <Loader />}>
      <Component {...componentProps} />
    </Suspense>
  );
};

export default Loadable;
