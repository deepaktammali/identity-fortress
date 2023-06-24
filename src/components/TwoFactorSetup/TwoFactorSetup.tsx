import SetupStep from "./steps/Setup";

interface Props {}

// type Step = {
//   state: StepState;
//   label: string;
// };

// export type ReducerState = {
//   activeStep: number;
//   steps: Step[];
// };

// export type ReducerAction = {
//   type: "complete";
// };

// const reducer: Reducer<ReducerState, ReducerAction> = (prevState, action) => {
//   switch (action.type) {
//     case "complete": {
//       const newState = produce(prevState, (draft) => {
//         draft.activeStep = draft.activeStep + 1;
//         draft.steps[draft.activeStep].state = StepState.available;
//       });
//       return newState;
//     }
//   }
// };

// const initialState: ReducerState = {
//   activeStep: 0,
//   steps: [
//     {
//       state: StepState.available,
//       label: "Two Factor Setup",
//     },
//     {
//       state: StepState.disabled,
//       label: "Complete",
//     },
//   ],
// };

const TwoFactorSetup = ({}: Props) => {
  // const [state, dispatch] = useReducer(reducer, initialState);

  // const StepElement = useMemo(() => {
  //   switch (state.activeStep) {
  //     case 0: {
  //       return <SetupStep dispatch={dispatch} />;
  //     }
  //     case 1: {
  //       return <CompleteStep />;
  //     }
  //   }
  // }, [state]);

  return (
    <div className="max-w-[--layout-width] w-full flex flex-col gap-4">
      <h1 className="text-lg font-medium w-full text-center">
        Enable Two Factor Setup
      </h1>
      <div className="flex flex-col gap-4">
        {/* <Stepper
          steps={state.steps}
          selectedStep={state.activeStep}
          onStepClick={(e) => e.preventDefault()}
          className="w-max"
        ></Stepper> */}
        {/* {StepElement} */}
        <SetupStep />
      </div>
    </div>
  );
};

export default TwoFactorSetup;
