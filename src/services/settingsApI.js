import supabase from "./supabase";

export async function getSettings() {
  let { data: settings, error } = await supabase.from("settings").select("*");
  if (error) {
    throw new Error(error.message);
  }
  return settings[0];
}

export async function updateSettings(updateSettings) {
  console.log(updateSettings);
  const { data, error } = await supabase
    .from("settings")
    .update(updateSettings)
    .eq("id", 1)
    .select();

  console.log(data);
  if (error) {
    throw new Error(error.message);
  }

  return data;
}
