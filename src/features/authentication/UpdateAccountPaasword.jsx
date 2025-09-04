import FormLabel from "../../UI/FormLabel";
import Button from "../../UI/Button";
import { MdLockPerson } from "react-icons/md";
import updatePassword from "../../services/authenticateAPI";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function UpdateAccountPassword() {
  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
    reset,
  } = useForm();
  const mutation = useMutation({
    mutationFn: updatePassword,
    onSuccess: () => {
      toast.success("All set! Your password has been changed", {
        icon: "🗝️",
        duration: 2500,
      });
    },
    onSettled: () => {
      reset();
    },
  });

  return (
    <div className="mt-6 pb-12">
      <h2 className="flex w-fit items-center gap-1.5 rounded-full bg-indigo-50 px-2.5 py-2 text-lg font-bold text-slate-700 shadow">
        <MdLockPerson className="text-3xl" /> Update password
      </h2>
      <div className="mt-3.5 space-y-3 rounded-lg bg-white p-9 shadow shadow-slate-400">
        <form
          className="space-y-3"
          onSubmit={handleSubmit((data) => mutation.mutate(data))}
        >
          {/* <FormLabel label="New password (min 8 chars)" ratio="3:4:3" gap={3} />
          <FormLabel label="Confirm password" ratio="3:4:3" gap={3} /> */}
          <FormLabel
            label="Password (min 8 characters)"
            ratio="3:4:4"
            errorMessage={errors?.password?.message}
            args={{
              label: { className: "text-slate-700 text-md" },
              errorEle: {
                className:
                  "bg-red-50 p-1.5 rounded text-red-700 w-fit animate-pulse shadow shadow-red-200 ",
              },
              input: {
                disabled: mutation.isPending,
                type: "password",
                ...register("password", {
                  required: "* Password is required",
                  minLength: {
                    value: 8,
                    message: "* password must be 8 characters length",
                  },
                }),
              },
            }}
          />
          <FormLabel
            label="Repeat password"
            ratio="3:4:3"
            errorMessage={errors?.repeatPassword?.message}
            args={{
              label: { className: "text-slate-700  text-md" },
              input: {
                disabled: mutation.isPending,
                type: "password",
                ...register("repeatPassword", {
                  required: "* Please Repeat password",
                  validate: (value) => {
                    return (
                      value === getValues("password") ||
                      "* Passwords don't match."
                    );
                  },
                }),
              },
              errorEle: {
                className:
                  "bg-red-50 p-1.5 rounded text-red-700 w-fit animate-pulse shadow shadow-red-200 ",
              },
            }}
          />

          <div className="mt-4 flex justify-end gap-4">
            <Button
              className="border-2 border-slate-200 text-slate-700"
              type="reset"
            >
              Cancel
            </Button>
            <Button className="bg-indigo-700 font-bold text-white enabled:hover:bg-indigo-800">
              Update Password
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
