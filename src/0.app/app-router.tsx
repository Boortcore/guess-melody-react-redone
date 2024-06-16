import { createBrowserRouter, RouterProvider } from "react-router-dom";
import WelcomeScreen from '../1.pages/welcome';
import GameScreen from '../1.pages/game';
import FailScreen from '../1.pages/fail';
import SuccessScreen from '../1.pages/success';
import AppLayout from "../2.widgets/app-layout";
import { ROUTER_PATHS } from "../5.shared/constants/routes";
import { StartGameButton, StartNewGameButton } from "../3.features/start-game";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout/>,
    children: [
      {
        path: "/",
        element: <WelcomeScreen><StartGameButton/></WelcomeScreen>,
      },
      {
        path: ROUTER_PATHS.GAME,
        element: <GameScreen/>,
      },
      {
        path: ROUTER_PATHS.FAIL,
        element: <FailScreen><StartNewGameButton/></FailScreen>,
      },     
      {
        path: `${ROUTER_PATHS.SUCCESS}/:id`,
        element: <SuccessScreen><StartNewGameButton/></SuccessScreen>,
      },
    ]
  }
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
