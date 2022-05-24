export interface FieldValue {
  label: string;
  value: number;
}

export interface UserData {
  userId: number;
  name: string;
  surname: string;
  userPermisions: {
    hasCarePermissions: boolean;
    isAdmin: boolean;
  };
}

export interface ActionSideEffects {
  onSuccess?: () => void;
  onFailure?: () => void;
}

export interface Column<T> {
  label: string;
  renderData: (data: T) => JSX.Element | string;
}

export interface TabEntry {
  label: string;
  panel: JSX.Element | string;
}
