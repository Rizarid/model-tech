import { API_URL } from "../shared/constants";
import { Users } from "../shared/interfaces";
import { isUsers } from "../shared/typeguards";

export const getUsers = async (): Promise<Users | undefined> => {
  try {
    const response = await fetch(`${API_URL}/users`);
    const users = await response.json();
    if (!isUsers(users)) {
      throw new Error('The received records are not correct');
    }

    return users;
  } catch(e) {
    console.error(e)
  }
} 