// import toast from "react-hot-toast";

// import { redirect } from "../utils/redirect";
import supabase from "./supabase";
import uploadImage from "./UploadImage";
import deleteImage from "./DeleteImage";

const BASE_URL =
  "https://amoeidozdmndtgzcmxdc.supabase.co/storage/v1/object/public/admin-profiles/";

export async function SignIn(authenticationDetails) {
  const { email, password } = authenticationDetails;
  let { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function signOut() {
  let { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}
export async function getUser() {
  const {
    data: {
      user: { id, email },
    },
    error,
  } = await supabase.auth.getUser();
  if (error) {
    throw new Error(error.message);
  }

  let { data: admin, error: adminError } = await supabase
    .from("admin")
    .select("*")
    .eq("adminid", id);

  if (adminError) {
    throw new Error(adminError.message);
  }

  return { id, email, ...admin[0] };
}

export async function getSession() {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    throw new Error(error.message);
  }

  return session;
}

export async function signUp(adminDetails) {
  const { email, password, ...remainingDetais } = adminDetails;

  const {
    data: {
      user: { id },
    },
    error,
  } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  const { data, error: adminCreationError } = await supabase
    .from("admin")
    .insert([
      {
        adminid: id,
        ...remainingDetais,
        profile:
          "https://amoeidozdmndtgzcmxdc.supabase.co/storage/v1/object/public/admin-profiles/default-user.jpg",
      },
    ])
    .select();

  if (adminCreationError) {
    throw new Error(adminCreationError);
  }

  return data;
}

export async function updateAdminDetails(adminDetails) {
  const { id, oldImgPath, ...remainingUpdateValues } = adminDetails;
  if (oldImgPath) {
    const cabinImagePath = await uploadImage(
      adminDetails?.profile,
      `admin-profiles/${id}`,
    );
    remainingUpdateValues["profile"] = cabinImagePath;
  }

  const { data, error } = await supabase
    .from("admin")
    .update({ ...remainingUpdateValues })
    .eq("adminid", id)
    .select();

  if (error) {
    if (oldImgPath) {
      await deleteImage(remainingUpdateValues["profile"], "admin-profiles");
    }
    throw new Error(`update failed: ${error.message}`);
  } else {
    if (
      oldImgPath &&
      oldImgPath?.replace(BASE_URL, "") !== "default-userc.jpg"
    ) {
      await deleteImage(oldImgPath, "admin-profiles");
    }
  }

  return data;
}

export default async function updatePassword({ email, password }) {
  const { data, error } = await supabase.auth.updateUser({
    email: email,
    password: password,
  });
  if (error) {
    throw new Error(error.message);
  }
  return data;
}
