import supabase from "./supabase";

const BASE_URL =
  "https://amoeidozdmndtgzcmxdc.supabase.co/storage/v1/object/public/";

export default async function uploadImage(fileObj, folderName) {
  const imageFile = fileObj?.[0];
  const imageName = imageFile.name;

  const { error: uploadError } = await supabase.storage
    .from(folderName)
    .upload(imageName, imageFile, { upsert: true });
  if (uploadError) {
    throw new Error(`Image upload failed: ${uploadError.message}`);
  }
  // Step 2: Construct public image URL
  const cabinImagePath = `${BASE_URL}${folderName}/${imageName}`;
  return cabinImagePath;
}
