import { User } from "firebase/auth";
import { useAuthStore } from "../../stores/auth";

const usePersistedUser = (): User | undefined => {
  const { user, setUser } = useAuthStore();

  const userKey = Object.keys(window.localStorage).filter((it) =>
    it.startsWith("firebase:authUser")
  )[0];
  const persistedUser = userKey
    ? JSON.parse(localStorage.getItem(userKey) || "")
    : undefined;

  if (persistedUser && !user) {
    setUser(persistedUser);
  }

  return persistedUser;
};

export default usePersistedUser;
