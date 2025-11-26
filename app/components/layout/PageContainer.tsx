import type { FC, ReactNode } from "react";

type PageContainerProps = {
  children: ReactNode;
};

const PageContainer: FC<PageContainerProps> = ({ children }) => {
  return <main className="page-container">{children}</main>;
};

export default PageContainer;
