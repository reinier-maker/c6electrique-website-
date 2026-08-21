import { createBrowserRouter } from "react-router";
import { Root } from "./pages/Root";
import { HomePage } from "./pages/HomePage";
import { VerhaalPage } from "./pages/VerhaalPage";
import { NieuwsbriefPage } from "./pages/NieuwsbriefPage";
import { NieuwsbriefArchiefPage } from "./pages/NieuwsbriefArchiefPage";
import { NieuwsbriefArchiefDetailPage } from "./pages/NieuwsbriefArchiefDetailPage";
import { ContactPage } from "./pages/ContactPage";
import { AdminPage } from "./pages/AdminPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: HomePage },
      { path: "verhaal", Component: VerhaalPage },
      { path: "nieuwsbrief", Component: NieuwsbriefPage },
      { path: "nieuwsbrief/archief", Component: NieuwsbriefArchiefPage },
      { path: "nieuwsbrief/archief/:slug", Component: NieuwsbriefArchiefDetailPage },
      { path: "contact", Component: ContactPage },
      { path: "admin", Component: AdminPage },
    ],
  },
]);
