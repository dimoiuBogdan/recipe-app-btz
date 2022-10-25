import React, { FC } from "react";
import { RecipeStepsModel } from "../../models/RecipeModels";
import { MAX_STEPTS_LENGTH, STEPS } from "../../services/RecipeStepsService";

type RecipePreparationProps = {
  steps: RecipeStepsModel[];
};
const RecipePreparation: FC<RecipePreparationProps> = ({ steps }) => {
  const getContent = () => {
    if (steps) {
      return steps.map((step, index) => {
        const { description } = step;

        return <Step description={description} index={index} key={index} />;
      });
    }

    return "-";
  };

  if (!steps || !steps.length) {
    return <></>;
  }

  return (
    <div className="my-4">
      <div className="flex items-baseline">
        <div className="mb-2 text-lg font-medium">Preparation</div>
        <div className="text-zinc-500 ml-1">({steps.length} steps)</div>
      </div>
      <div>{getContent()}</div>
    </div>
  );
};

export default RecipePreparation;

type StepProps = {
  index: number;
  description: string;
};
const Step: FC<StepProps> = ({ description, index }) => {
  const getStepNumber = () => {
    let content = "Next";

    if (index < MAX_STEPTS_LENGTH) {
      content = STEPS[index];
    }

    return <span className="text-orange-600">{content}</span>;
  };

  return (
    <div className="mb-5">
      <div className="font-medium text-zinc-600">{getStepNumber()} Step</div>
      <div className="text-zinc-700">{description}</div>
    </div>
  );
};
