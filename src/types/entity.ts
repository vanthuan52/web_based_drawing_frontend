export type UserRole = "USER" | "ADMIN";

export type BaseEntity = {
  id: string;
  created_at: string;
  updated_at: string;
};

export type User = Omit<BaseEntity, "created_at"> & {
  name: string;
  email: string;
  password: string;
};
