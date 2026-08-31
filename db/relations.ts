import { khutbah, mosque } from "./schema/app.sql";
import {
  account,
  session,
  user,
  verification,
} from "./schema/auth.sql";
import { defineRelationsPart } from "drizzle-orm";

export const appRelations = defineRelationsPart(
  { khutbah, mosque, user },
  (r) => ({
    khutbah: {
      sheikh: r.one.user({
        from: r.khutbah.sheikhId,
        to: r.user.id,
        optional: false,
      }),
      mosque: r.one.mosque({
        from: r.khutbah.mosqueId,
        to: r.mosque.id,
        optional: false,
      }),
    },
    mosque: {
      khutab: r.many.khutbah(),
    },
    user: {
      khutab: r.many.khutbah(),
    },
  })
);

export const authRelations = defineRelationsPart(
  { user, session, account, verification },
  (r) => ({
    user: {
      sessions: r.many.session({
        from: r.user.id,
        to: r.session.userId,
      }),
      accounts: r.many.account({
        from: r.user.id,
        to: r.account.userId,
      }),
    },
    session: {
      user: r.one.user({
        from: r.session.userId,
        to: r.user.id,
      }),
    },
    account: {
      user: r.one.user({
        from: r.account.userId,
        to: r.user.id,
      }),
    },
  })
);
