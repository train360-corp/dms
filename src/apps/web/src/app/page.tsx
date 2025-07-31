import AnimatedGridPattern from "@train360-corp/dms/components/ui/shadcn-io/animated-grid-pattern";
import { cn } from "@train360-corp/dms/lib/utils";
import { H1, P } from "@train360-corp/dms/components/ui/text";



export default function Home() {
  return (
    <div
      className="relative flex h-screen w-screen items-center justify-center overflow-hidden bg-background">
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
        )}
      />
      <div className="relative z-10 text-center">
        <H1>{"ProjDocs DMS"}</H1>
        <P className="text-muted-foreground">
          {"A document management system for the modern era."}
        </P>
      </div>
    </div>
  );
}
