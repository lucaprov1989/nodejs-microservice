import envalid, { str } from "envalid";

const testEnv = envalid.cleanEnv(
  process.env,
  {
    TEST_DB_URI: str(),
  },
  {
    reporter: ({ errors }) => {
      const missed = Object.keys(errors);
      if (missed && missed.length) {
        throw new Error(`Missing Envs: ${missed}`);
      }
    },
  },
);

export default testEnv;
