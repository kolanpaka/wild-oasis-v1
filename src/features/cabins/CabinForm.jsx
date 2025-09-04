import TextArea from "../../UI/TextArea";
import FormLabel from "../../UI/FormLabel";
import Button from "../../UI/Button";
import { HiXMark } from "react-icons/hi2";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin, updateCabin } from "../../services/cabinAPI";
import toast from "react-hot-toast";
import compareObj from "../../utils/compareObj";


export default function CabinForm({ closeModal, tableRow = {}, closeMenu }) {
  const isUpdate = Object.keys(tableRow).length !== 0;
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: tableRow,
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: isUpdate ? updateCabin : createCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      toast.success(
        isUpdate
          ? "Your cabin details have been successfully updated."
          : "Your new cabin is ready!",
        {
          duration: 3000,
        },
      );
    },
    onError: (error) => {
      toast.error(error.message, {
        duration: 5000,
      });
    },
    onSettled: () => {
      closeModal();
      isUpdate && closeMenu();
    },
  });

  function submitHandler(data) {
    if (isUpdate) {
      
      data = { id: data.id, ...compareObj(tableRow, data) };
      if (Object.keys(data).includes("cabin_image")) {
        data["oldImgPath"] = tableRow.cabin_image;
      }
    }
    mutation.mutate(data);
  }

  
  return (
    <form
      className="relative w-[900px] space-y-3 rounded-md bg-white p-9 shadow"
      onSubmit={handleSubmit(submitHandler)}
    >
      <div
        className="absolute top-3 right-4 w-fit cursor-pointer rounded-md border-2 border-white p-1 text-2xl font-bold text-slate-700 hover:bg-slate-100 active:border-indigo-700"
        onClick={closeModal}
      >
        <HiXMark className="stroke-1" />
      </div>

      <FormLabel
        label="cabinName"
        ratio="4:4:3"
        errorMessage={errors["cabin"]?.message}
        args={{
          input: {
            disabled: mutation.isPending,
            ...register("cabin", {
              required: "*cabinName is required",
            }),
          },
        }}
      />
      <FormLabel
        label="Maximum capacity"
        ratio="4:4:3"
        errorMessage={errors["capacity"]?.message}
        args={{
          input: {
            disabled: mutation.isPending,
            ...register("capacity", {
              required: "*Maximum capacity is required",
            }),
          },
        }}
      />
      <FormLabel
        label="Regular price"
        ratio="4:4:3"
        errorMessage={errors["price"]?.message}
        args={{
          input: {
            disabled: mutation.isPending,
            ...register("price", { required: "*Regular price is required" }),
          },
        }}
      />
      <FormLabel
        label="Discount"
        ratio="4:4:3"
        errorMessage={errors["Discount"]?.message}
        args={{
          input: {
            disabled: mutation.isPending,
            type: "number",
            step: "0.01",
            ...register("Discount", {
              required: "*Discount is required",
              validate: (discountValue) => {
                const price = getValues("price");

                if (!price) return "*Please enter the regular price first";
                if (+discountValue > +price)
                  return "*Discount should be less than price";
                return true;
              },
            }),
          },
        }}
      />

      <FormLabel
        label="Upload Image"
        ratio="4:4:3"
        errorMessage={errors["cabin_image"]?.message}
        args={{
          input: {
            disabled: mutation.isPending,
            type: "file",
            accept: "image/*",
            className: "cursor-pointer",
            ...register(
              "cabin_image",
              isUpdate
                ? {}
                : {
                    required: "*cabin Image is required",
                  },
            ),
          },
        }}
      />
      <FormLabel
        label="Description for Cabin"
        ratio="4:4:3"
        errorMessage={errors["description"]?.message}
      >
        <TextArea
          disabled={mutation.isPending}
          id="Description for website"
          rows="4"
          {...register("description", {
            required: "*Description for Cabin is required",
          })}
        ></TextArea>
      </FormLabel>

      <div className="mt-4 flex justify-end gap-4">
        <Button
          className="border-2 border-slate-200 text-slate-700"
          type="reset"
          disabled={mutation.isPending}
        >
          Cancel
        </Button>
        <Button
          className="bg-indigo-700 font-bold text-white enabled:hover:bg-indigo-800"
          disabled={mutation.isPending}
        >
          {isUpdate ? "Update cabin" : "Create new cabin"}
        </Button>
      </div>
    </form>
  );
}
