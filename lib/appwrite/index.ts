"use server";

import { Account, Avatars, Client, Databases, Storage } from "node-appwrite";
import { appwriteConfig } from "@/lib/appwrite/config";
import { cookies } from "next/headers";

export const createSessionClient = async () => {
  const client = new Client()
      .setEndpoint(appwriteConfig.endpointUrl)
      .setProject(appwriteConfig.projectId);
  try {
    const cookie = await cookies();
    const session = cookie.get("appwrite-session");
    console.log(`index.ts session: ${JSON.stringify(session)}`);

    // if (!session || !session.value) throw new Error("No session");

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    client.setSession(session.value);

  } catch (error) {
    console.log(error, "Failed to verify OTP");
  }

  return {
    get account() {
      return new Account(client);
    },
    get databases() {
      return new Databases(client);
    },
  };
};

export const createAdminClient = async () => {
  const client = new Client()
    .setEndpoint(appwriteConfig.endpointUrl)
    .setProject(appwriteConfig.projectId)
    .setKey(appwriteConfig.secretKey);

  return {
    get account() {
      return new Account(client);
    },
    get databases() {
      return new Databases(client);
    },
    get storage() {
      return new Storage(client);
    },
    get avatars() {
      return new Avatars(client);
    },
  };
};
