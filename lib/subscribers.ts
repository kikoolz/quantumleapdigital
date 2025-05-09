import { supabase } from "./supabase";

export async function getAllActiveSubscribers() {
  const { data: subscribers, error } = await supabase
    .from("subscribers")
    .select("email")
    .eq("status", "active");

  if (error) {
    throw new Error("Failed to fetch subscribers");
  }

  return subscribers;
}

export async function unsubscribeUser(email: string) {
  const { error } = await supabase
    .from("subscribers")
    .update({ status: "unsubscribed" })
    .eq("email", email);

  if (error) {
    throw new Error("Failed to unsubscribe user");
  }

  return true;
}

export async function addSubscriber(email: string) {
  const { error } = await supabase
    .from("subscribers")
    .insert([{ email, status: "active" }]);

  if (error) {
    throw new Error("Failed to add subscriber");
  }

  return true;
}
