export const INDEX = "INDEX";

export function pubg() {
  const user = {
    username: "john"
  };
  sessionStorage.setItem("users", user);
  return { type: INDEX, payload: user };
}
