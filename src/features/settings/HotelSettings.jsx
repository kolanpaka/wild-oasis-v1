import { useForm } from "react-hook-form";
import FormLabel from "../../UI/FormLabel";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getSettings, updateSettings } from "../../services/settingsAPI";

export default function HotelSettings() {
  const { register, reset } = useForm();

  const queryClient = useQueryClient();
  const { isLoading } = useQuery({
    queryKey: ["settings"],
    queryFn: async () => {
      try {
        const data = await getSettings();
        if (!data) {
          throw new Error("No Default Settings avaliable");
        }
        reset(data);
        return data;
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  const mutation = useMutation({
    mutationFn: updateSettings,
    onSuccess: () => {
      toast.success("Your changes have been saved.");
    },
    onError: () => {
      toast.error("Unable to save your changes at the moment.");
    },
    onSettled: () => {
      queryClient.invalidateQueries(["settings"]);
    },
  });

  function onBlurHandler(e) {
    mutation.mutate({ [e.target.name]: e.target.value });
  }

  return (
    <div className="mt-8 space-y-3 rounded-md bg-white p-9 shadow">
      <form className="space-y-3">
        <FormLabel
          label="Minimum nights/booking"
          ratio="3:4"
          args={{
            label: { className: "text-slate-700  text-md" },
            input: {
              disabled: isLoading || mutation.isPending,
              type: "number",
              className: "font-sono",
              ...register("min_nights", {
                onBlur: onBlurHandler,
              }),
            },
          }}
        />
        <FormLabel
          label="Maximum nights/booking"
          ratio="3:4"
          args={{
            label: { className: "text-slate-700  text-md" },
            input: {
              type: "number",
              className: "font-sono",
              disabled: isLoading || mutation.isPending,
              ...register("max_nights", {
                onBlur: onBlurHandler,
              }),
            },
          }}
        />
        <FormLabel
          label="Maximum guests/booking"
          ratio="3:4"
          args={{
            label: { className: "text-slate-700 text-md" },
            input: {
              type: "number",
              className: "font-sono",
              disabled: isLoading || mutation.isPending,
              ...register("max_guests", {
                onBlur: onBlurHandler,
              }),
            },
          }}
        />
        <FormLabel
          label="Breakfast price"
          ratio="3:4"
          args={{
            label: { className: "text-slate-700  text-md" },
            input: {
              type: "number",
              className: "font-sono",
              disabled: isLoading || mutation.isPending,
              ...register("breakfast_price", {
                onBlur: onBlurHandler,
              }),
            },
          }}
        />
      </form>
    </div>
  );
}
