import supabase from "./supabase";
import uploadImage from "./UploadImage";
import deleteImage from "./DeleteImage";

const BASE_URL =
  "https://amoeidozdmndtgzcmxdc.supabase.co/storage/v1/object/public/cabin-images/";

// async function getImages() {
//   let { data, error } = await supabase.storage.from("cabin-images").list("");
//   if (error !== null) {
//     throw new Error(error.message);
//   }

//   return data.map((eachImageObj) => eachImageObj.name);
// }

// async function uploadImage(fileObj) {
//   const cabinImageFile = fileObj?.[0];
//   const cabinImageName = cabinImageFile.name;
//   // Step 1: Upload the image to Supabase Storage
//   // const images = await getImages();

//   // if (images.includes(cabinImageName)) {
//   //   throw new Error(
//   //     "Use ‘Create Cabin’ for brand-new entries. To replicate an existing cabin, please use the ‘Duplicate’ option.",
//   //   );
//   // }

//   const { error: uploadError } = await supabase.storage
//     .from("cabin-images")
//     .upload(cabinImageName, cabinImageFile);
//   if (uploadError) {
//     throw new Error(`Image upload failed: ${uploadError.message}`);
//   }
//   // Step 2: Construct public image URL
//   const cabinImagePath = `${BASE_URL}${cabinImageName}`;
//   return cabinImagePath;
// }

// async function deleteImage(imagePath) {
//   const imageName = imagePath.replace(BASE_URL, "");
//   const { error: deleteError } = await supabase.storage
//     .from("cabin-images")
//     .remove([imageName]);

//   if (deleteError) {
//     throw new Error(`Image delete failed: ${deleteError.message}`);
//   }

//   return true;
// }

async function cloneImage(imagePath) {
  const imageName = imagePath.replace(BASE_URL, "");
  const arr = imageName.split(".");

  const newFileName = `cabin-${Date.now()}.${arr[1]}`;

  const { error } = await supabase.storage
    .from("cabin-images")
    .copy(imageName, newFileName);

  if (error) {
    throw new Error("❌ Copy failed:", error.message);
  }

  return `${BASE_URL}${newFileName}`;
}

export async function getCabins(discount, sortBy) {
  let query = supabase.from("cabins").select("*");

  // filter by discount
  if (discount === "no-discount") {
    query = query.eq("Discount", 0);
  } else if (discount === "with-discount") {
    query = query.neq("Discount", 0);
  }

  // map sort options
  const sortMap = {
    "name-asc": { column: "cabin", ascending: true },
    "name-desc": { column: "cabin", ascending: false },
    "regularPrice-asc": { column: "price", ascending: true },
    "regularPrice-desc": { column: "price", ascending: false },
    "maxCapacity-asc": { column: "capacity", ascending: true },
    "maxCapacity-desc": { column: "capacity", ascending: false },
  };

  if (sortBy && sortMap[sortBy]) {
    const { column, ascending } = sortMap[sortBy];
    query = query.order(column, { ascending });
  }

  const { data, error } = await query;

  if (error) throw new Error(error.message);

  return data;
}

export async function createCabin(cabinDetails) {
  const cabinImagePath = await uploadImage(
    cabinDetails?.cabin_image,
    "cabin-images",
  );
  const { data: insertedCabin, error: insertError } = await supabase
    .from("cabins")
    .insert([{ ...cabinDetails, cabin_image: cabinImagePath }])
    .select();

  if (insertError) {
    await deleteImage(cabinImagePath, "cabin-images");

    throw new Error(`Cabin insert failed: ${insertError.message}`);
  }
  return insertedCabin;
}

export async function deleteCabin(deleteObj) {
  const { error: rowError, data } = await supabase
    .from("cabins")
    .delete()
    .eq("id", deleteObj.id);

  if (rowError) {
    throw new Error(rowError.message);
  }

  await deleteImage(deleteObj.imagePath, "cabin-images");

  return data;
}

export async function cloneCabin(cabinDetails) {
  // eslint-disable-next-line no-unused-vars
  const { id, ...cloneDetails } = cabinDetails;

  const c = String(cloneDetails.cabin.replace("copy ", "")).padStart(3, "0");

  const { data: insertedCabin, error: insertError } = await supabase
    .from("cabins")
    .insert([
      {
        ...cloneDetails,
        cabin: `copy ${c}`,
        cabin_image: await cloneImage(cloneDetails.cabin_image),
      },
    ])
    .select();
  if (insertError) {
    throw new Error(`Cabin insert failed: ${insertError.message}`);
  }
  return insertedCabin;
}

export async function updateCabin(latestCabinDetails) {
  const { id, oldImgPath, ...remainingUpdateValues } = latestCabinDetails;
  if (oldImgPath) {
    const cabinImagePath = await uploadImage(
      latestCabinDetails?.cabin_image,
      "cabin-images",
    );
    remainingUpdateValues["cabin_image"] = cabinImagePath;
  }

  const { data, error } = await supabase
    .from("cabins")
    .update({ ...remainingUpdateValues })
    .eq("id", id)
    .select();

  if (error) {
    if (oldImgPath) {
      await deleteImage(remainingUpdateValues["cabin_image"], "cabin-images");
    }
    throw new Error(`update failed: ${error.message}`);
  } else {
    if (oldImgPath) {
      await deleteImage(oldImgPath, "cabin-images");
    }
  }
  return data;
}

// `https://placehold.co/600x400/a5b4fc/334155?text=${c.replace(" ", "+")}&font=montserrat`
