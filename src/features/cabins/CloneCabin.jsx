import { useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { cloneCabin } from "../../services/cabinAPI";

export default function CloneCabin({
  tableRow,
  children,
  className,
  closeMenu,
}) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (cloneObject) => {
      await toast.promise(
        cloneCabin(cloneObject),
        {
          loading: "Creating a copy of the existing cabin…",
          success: "Successfully duplicated the cabin configuration.",
          error: "Failed to duplicate the cabin. Please try again.",
        },
        {
          loading: {
            duration: 1500,
          },
          success: {
            duration: 2000,
          },
        },
      );
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },

    onSettled: () => {
      closeMenu();
    },
  });

  return (
    <div onClick={() => mutation.mutate(tableRow)} className={className || ""}>
      {children}
    </div>
  );
}
