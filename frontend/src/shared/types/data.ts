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
