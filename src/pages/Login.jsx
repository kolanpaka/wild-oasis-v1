import Grid, { Col } from "../UI/Grid";
import Logo from "../UI/Logo";
import FormLabel from "../UI/FormLabel";
import Button from "../UI/Button";
import { useMutation } from "@tanstack/react-query";
import { SignIn } from "../services/authenticateAPI";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { validateEmail, validatePassword } from "../utils/Validations";
import { BiLoaderAlt } from "react-icons/bi";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

export default function Login({ isSessionExpired, setSessionExpired }) {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      email: "kolanpaka2000@gmail.com",
      password: "qwertyuio",
    },
  });
  const navigate = useNavigate();

  useEffect(
    function () {
      if (isSessionExpired === "expired") {
        toast.error("Session expired. Please log in again.", {
          icon: "⏳",
          id: "session-expired",
        });
        queryClient.clear();
        setSessionExpired("inital");
      }
      if (isSessionExpired === "logout") {
        toast.success("Thanks for visting please come back again", {
          icon: "❤️",
          id: "sign-out",
          duration: 4000,
        });
        queryClient.clear();
        setSessionExpired("inital");
      }
    },
    [isSessionExpired, setSessionExpired, queryClient],
  );

  const mutation = useMutation({
    mutationFn: SignIn,
    onSuccess() {
      toast.success("login successfuly", {
        icon: "🔥",
        duration: 2300,
      });
      navigate("/");
    },
    onError(error) {
      toast.error(error.message);
    },
    onSettled() {
      reset();
    },
  });

  const submitHandler = (data) => {
    const emailError = validateEmail(data.email);
    const passwordError = validatePassword(data.password);

    if (emailError !== true) {
      toast.error(emailError, { id: "email-error" });
      return;
    }

    if (passwordError !== true) {
      toast.error(passwordError, { id: "password-error" });
      return;
    }

    mutation.mutate(data);
  };

  if (isSessionExpired === "login") {
    return <Navigate to="dashboard" />;
  }

  return (
    <Grid className="h-[100vh] place-items-center bg-[#F9FAFB]">
      <Col className="w-[100%] max-w-[480px]">
        <div className="space-y-6">
          <div>
            <Logo className="m-auto w-[34%]" />
          </div>
          <h1 className="heading text-center font-bold">
            Log in to your account
          </h1>

          <div className="mt-8 space-y-3 rounded-md bg-white p-9 shadow">
            <form className="space-y-3" onSubmit={handleSubmit(submitHandler)}>
              <FormLabel
                label="Email address"
                ratio="12:12"
                gap="3"
                args={{
                  label: { className: "tracking-tight font-slate-700" },
                  input: {
                    autoFocus: "true",
                    disabled: mutation.isPending,

                    ...register("email", {
                      onBlur: (e) => {
                        const result = validateEmail(e.target.value);
                        if (result !== true)
                          toast.error(result, {
                            id: "email-error",
                          });
                      },
                    }),
                  },
                }}
              />
              <FormLabel
                label="Password"
                ratio="12:12"
                gap="3"
                args={{
                  input: {
                    disabled: mutation.isPending,
                    type: "password",
                    ...register("password", {
                      onBlur: (e) => {
                        const result = validatePassword(e.target.value);
                        if (result !== true)
                          toast.error(result, {
                            id: "password-error",
                          });
                      },
                    }),
                  },
                  label: {
                    className: "tracking-tight font-slate-700",
                  },
                }}
              />
              <div>
                <Button
                  className="mt-4 w-full bg-indigo-700 py-3.5 text-white enabled:hover:bg-indigo-800"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? (
                    <div>
                      <BiLoaderAlt className="animate-rotate m-auto text-2xl" />
                    </div>
                  ) : (
                    <span className="text-xl">Log In</span>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Col>
    </Grid>
  );
}
