import React from "react";
import AppRoutes from "./Auth/Routes";
import { AppBarDrawer } from "./components/AppBar/AppBarDrawe";

function App() {
 
  return (<>
  <AppBarDrawer >
  <AppRoutes />

  </AppBarDrawer>

  </>
  );
}

export default App;
