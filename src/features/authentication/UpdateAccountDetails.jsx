import FormLabel from "../../UI/FormLabel";
import Button from "../../UI/Button";
import { RiAccountCircle2Fill } from "react-icons/ri";
import { useAuthenticatedUser } from "../../context/Authenticate";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAdminDetails } from "../../services/authenticateAPI";
import toast from "react-hot-toast";
import { BiLoaderAlt } from "react-icons/bi";
import compareObj from "../../utils/compareObj";

const BASE_URL =
  "https://amoeidozdmndtgzcmxdc.supabase.co/storage/v1/object/public/admin-profiles/";
export default function UpdateAccountDetails() {
  const adminData = useAuthenticatedUser();
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm({
    defaultValues: adminData,
  });

  const mutation = useMutation({
    mutationFn: updateAdminDetails,
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
      toast.success("Your profile got updated", {
        icon: "🎉",
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  function submitHandler(data) {
    const compareDetails = compareObj(adminData, {
      ...data,
      profile:
        typeof data.profile === "string"
          ? adminData.profile
          : data.profile.length === 0
            ? adminData.profile
            : data.profile,
    });
    if (Object.keys(compareDetails).length === 0) {
      toast.success("Your profile got updated", {
        icon: "🎉",
      });
    } else {
      data = { id: adminData.id, ...compareDetails };

      if (data.profile?.[0]?.name) {
        data["oldImgPath"] = adminData.profile;
      }

      mutation.mutate(data);
    }
  }

  return (
    <div className="mt-8">
      <h2 className="flex w-fit items-center gap-1.5 rounded-full bg-indigo-50 px-2.5 py-2 text-lg font-bold text-slate-700 shadow">
        <RiAccountCircle2Fill className="text-3xl" /> Update user data
      </h2>
      <div className="mt-3.5 space-y-3 rounded-lg bg-white p-9 shadow shadow-slate-400">
        <form className="space-y-3" onSubmit={handleSubmit(submitHandler)}>
          <FormLabel
            label="Email address"
            ratio="3:4:3"
            gap={3}
            args={{
              input: {
                disabled: true,
                value: adminData.email,
              },
            }}
          />
          <FormLabel
            label="Full name"
            ratio="3:4:3"
            gap={3}
            args={{
              input: {
                disabled: mutation.isPending,
                ...register("adminname"),
              },
            }}
          />
          <FormLabel
            label="Avatar image"
            ratio="3:4"
            gap={3}
            args={{
              input: {
                type: "file",
                accept: "image/*",
                className: "cursor-pointer",

                disabled: mutation.isPending,
                ...register("profile"),
              },
            }}
          />
          <div className="mt-4 flex justify-end gap-4">
            <Button
              className="border-2 border-slate-200 text-slate-700"
              type="reset"
              disabled={mutation.isPending}
            >
              Cancel
            </Button>
            <Button
              className="flex items-center gap-1.5 bg-indigo-700 text-center font-bold text-white transition-all enabled:hover:bg-indigo-800"
              disabled={mutation.isPending}
            >
              <div
                className={`transition-all ${mutation.isPending ? "" : "hidden"}`}
              >
                <BiLoaderAlt className="animate-rotate m-auto text-xl" />
              </div>
              Update Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
