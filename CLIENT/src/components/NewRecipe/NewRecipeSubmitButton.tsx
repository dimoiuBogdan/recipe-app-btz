import React, { FC } from "react";
import { getSubmitButtonLabel } from "../../services/AuthService";

type NewRecipeSubmitButtonProps = {
  isSubmitting: boolean;
};
const NewRecipeSubmitButton: FC<NewRecipeSubmitButtonProps> = ({
  isSubmitting,
}) => {
  return (
    <button
      className="my-4 text-white text-lg font-medium w-full bg-gradient-to-r from-orange-300 to-orange-600 rounded-full py-1.5 shadow-sm hover:shadow-md disabled:opacity-40"
      type="submit"
      disabled={isSubmitting}
    >
      {getSubmitButtonLabel(
        isSubmitting,
        "CREATING RECIPE...",
        "CREATE RECIPE"
      )}
    </button>
  );
};

export default NewRecipeSubmitButton;
