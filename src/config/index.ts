export const description = "Web based drawing";
export const name = "Web based drawing";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const topic: any = {
  cached: false,
  data: [],
  message: "",
  status: "RUNNING",
  updatedAt: 0,
};

export const Config = {
  DOMAIN: import.meta.env.VITE_API_ENDPOINT,
};
