import FormLabel from "../../UI/FormLabel";
import Button from "../../UI/Button";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { signUp } from "../../services/authenticateAPI";
import toast from "react-hot-toast";
import { useAuthenticatedUser } from "../../context/Authenticate";

export default function SignUp() {
  const { id } = useAuthenticatedUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();

  const mutation = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      toast.success("You successfuly Signup");
    },

    onError: (error) => {
      toast.error(error.message);
    },

    onSettled: () => {
      reset();
    },
  });
  function submitSignUp(data) {
    // eslint-disable-next-line no-unused-vars
    const { repeatPassword, ...mainData } = data;

    // console.log("current User : ", datauser);
    // id: "570ef3b2-df63-408b-a501-ac5dda8f4413"
    mutation.mutate({ created_by: id, ...mainData });
  }

  return (
    <div className="mt-8 space-y-3 rounded-md bg-white p-9 shadow">
      <form className="space-y-3" onSubmit={handleSubmit(submitSignUp)}>
        <FormLabel
          label="Full name"
          ratio="3:4:3"
          gap={3}
          errorMessage={errors?.adminname?.message}
          args={{
            label: { className: "text-slate-700  text-md " },
            input: {
              disabled: mutation.isPending,
              ...register("adminname", {
                required: "* Full name is required",
              }),
            },
            errorEle: {
              className:
                "bg-red-50 p-1.5 rounded text-red-700 w-fit animate-pulse shadow shadow-red-200 ",
            },
          }}
        />
        <FormLabel
          label="Email address"
          ratio="3:4:3"
          errorMessage={errors?.email?.message}
          args={{
            label: { className: "text-slate-700  text-md" },
            errorEle: {
              className:
                "bg-red-50 p-1.5 rounded text-red-700 w-fit animate-pulse shadow shadow-red-200 ",
            },
            input: {
              disabled: mutation.isPending,
              ...register("email", {
                required: "* Email address is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "* Please enter a valid email",
                },
              }),
            },
          }}
        />
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
            className="border-2 border-slate-200 text-slate-700 active:border-indigo-700"
            type="reset"
          >
            Cancel
          </Button>
          <Button className="bg-indigo-700 font-bold text-white enabled:hover:bg-indigo-800">
            Create new user
          </Button>
        </div>
      </form>
    </div>
  );
}
