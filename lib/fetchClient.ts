import { constants } from "@/config/constants";
import { getSession } from "next-auth/react";

export const fetchClient = async (url: string | URL, options: RequestInit) => {
  const session = await getSession();
  const currentUrl = new URL(url as string, constants.apiBaseUrl)

  return fetch(currentUrl, {
    ...options,
    headers: {
      ...options?.headers,
      ...(session && { Authorization: `Bearer ${session?.user?.jwt}` }),
    },
  });
};
