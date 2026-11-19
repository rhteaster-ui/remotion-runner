import { Composition } from "remotion";
import { XiiclassReview } from "./XiiclassReview";

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="XiiclassReview"
        component={XiiclassReview}
        durationInFrames={1140}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};