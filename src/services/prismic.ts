import * as Prismic from "@prismicio/client";
import { enableAutoPreviews } from '@prismicio/next';

export function getPrismicCLient(req?: unknown) {
  const prismicClient = Prismic.createClient(
    process.env.PRISMIC_ENDPOINT,
    {
      accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    }
  );

  enableAutoPreviews({
    client: prismicClient,
    req,
  })

  return prismicClient;
}
