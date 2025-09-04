import supabase from "./supabase";

const BASE_URL =
  "https://amoeidozdmndtgzcmxdc.supabase.co/storage/v1/object/public/";

export default async function deleteImage(imagePath, folderName) {
  const imageName = imagePath.replace(`${BASE_URL}${folderName}/`, "");
  const { error: deleteError } = await supabase.storage
    .from(folderName)
    .remove([imageName]);

  if (deleteError) {
    throw new Error(`Image delete failed: ${deleteError.message}`);
  }

  return true;
}
