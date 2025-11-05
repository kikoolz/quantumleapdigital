import { db } from "./supabase";

export async function getAllActiveSubscribers() {
  try {
    const subscribers = (await db`
      SELECT email 
      FROM subscribers 
      WHERE status = 'active'
    `) as Array<{ email: string }>;

    return subscribers;
  } catch {
    throw new Error("Failed to fetch subscribers");
  }
}

export async function unsubscribeUser(email: string) {
  try {
    await db`
      UPDATE subscribers 
      SET status = 'unsubscribed' 
      WHERE email = ${email}
    `;

    return true;
  } catch {
    throw new Error("Failed to unsubscribe user");
  }
}

export async function addSubscriber(email: string) {
  try {
    await db`
      INSERT INTO subscribers (email, status) 
      VALUES (${email}, 'active')
    `;

    return true;
  } catch {
    throw new Error("Failed to add subscriber");
  }
}
