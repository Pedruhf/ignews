import { query } from "faunadb";
import { fauna } from "../../../services/fauna";
import { stripe } from "../../../services/stripe";

export async function saveSubscription(
  subscriptionId: string,
  customerId: string,
  cretadAction = false
  ) {
  const userRef = await fauna.query(
    query.Select(
      "ref",
      query.Get(
        query.Match(
          query.Index("user_by_stripe_customer_id"),
          customerId,
        )
      )
    )
  );

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  const subscriptionData = {
    id: subscription.id,
    userId: userRef,
    status: subscription.status,
    priceId: subscription.items.data[0].price.id,
  };

  if (cretadAction) {
    await fauna.query(
      query.Create(
        query.Collection("subscriptions"),
        { data: subscriptionData }
      )
    );

    return;
  }
  
  await fauna.query(
    query.Replace(
      query.Select(
        "ref",
        query.Get(
          query.Match(
            query.Index("subscription_by_id"),
            subscription.id,
          )
        )
      ),
      { data: subscriptionData }
    )
  );
}
