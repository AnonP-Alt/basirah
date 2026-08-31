import { userAdditionalFields } from "./auth";
import { createAuthClient } from "better-auth/react";
import {
  inferAdditionalFields,
  usernameClient,
} from "better-auth/client/plugins";

export const authClient = createAuthClient({
  plugins: [
    inferAdditionalFields(userAdditionalFields),
    usernameClient({ displayUsername: false }),
  ],
});
