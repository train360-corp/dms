import { ReactNode } from "react";



export const PageContent = ({children}: {
  children?: ReactNode;
}) => (
  <div className="@container/main flex flex-1 flex-col gap-2 max-h-full">
    <div className="flex flex-col gap-4 p-4 md:gap-6 md:p-6 h-full">
      {children}
    </div>
  </div>
);