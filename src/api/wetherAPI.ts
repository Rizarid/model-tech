import { API_URL } from "../shared/constants";
import { Wethers } from "../shared/interfaces";
import { isWethers } from "../shared/typeguards";

export const getWethers = async (): Promise<Wethers | undefined> => {
  try {
    const response = await fetch(`${API_URL}/wether`);
    const wethers = await response.json();
    if (!isWethers(wethers)) {
      throw new Error('The received records are not correct');
    }

    return wethers;
  } catch(e) {
    console.error(e)
  }
} 