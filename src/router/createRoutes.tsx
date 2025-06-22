import { createBrowserRouter } from "react-router";
import { BetsLayout, ActiveBetsLayout, RootLayout } from "../layouts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <BetsLayout /> },
      { path: "my-bets", element: <ActiveBetsLayout /> },
    ],
  },
]);

export { router };
