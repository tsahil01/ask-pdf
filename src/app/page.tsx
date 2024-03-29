import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
    <MaxWidthWrapper className="border border-black">
      <div className="">
        <Button>I am a Button of very good person</Button>
      </div>
    </MaxWidthWrapper>
    </>
  );
}
