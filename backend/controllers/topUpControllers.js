import userModle from "../modle/userModle.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const craditMap = {
  50: 100,
  99: 300,
  249: 1000,
};

// 🔥 Create checkout session
export const rtopUP = async (req, res) => {
  try {
    const userId = req.userId;
    const { amount } = req.body;
    const parsedAmount = Number(amount);

    console.log("amount received:", parsedAmount, typeof parsedAmount);

    if (!craditMap[parsedAmount]) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: "https://examnotes-ai-ujjwal.onrender.com/success",
      cancel_url: "https://examnotes-ai-ujjwal.onrender.com/cancel",

      // ✅ IMPORTANT: metadata must be strings
      metadata: {
        userId: String(userId),
        dimond: String(craditMap[parsedAmount]),
      },

      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: `${craditMap[parsedAmount]} Credits`,
            },
            unit_amount: parsedAmount * 100,
          },
          quantity: 1,
        },
      ],
    });

    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Stripe session error:", error);
    return res.status(500).json({ message: "Stripe session error" });
  }
};

// 🔥 Stripe webhook
export const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("❌ Webhook signature error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    if (event.type === "checkout.session.completed") {
      console.log("🔥 Payment webhook received");

      const session = event.data.object;
      const { userId, dimond } = session.metadata;

      console.log("Metadata:", session.metadata);

      const user = await userModle.findById(userId);

      if (!user) {
        console.log("❌ User not found");
        return res.status(200).json({ received: true });
      }

      user.credits += Number(dimond);
      await user.save();

      console.log("✅ Credits updated:", user.credits);
    }

    return res.status(200).json({ received: true });
  } catch (err) {
    console.error("❌ Credit update error:", err);
    return res.status(200).json({ received: true });
  }
};