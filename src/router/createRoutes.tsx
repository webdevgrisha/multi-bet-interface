import { createBrowserRouter } from "react-router";
import { BetsLayout, MyBetsLayout, RootLayout } from "../layouts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <BetsLayout /> },
      { path: "my-bets", element: <MyBetsLayout /> },
    ],
  },
]);

export { router };
