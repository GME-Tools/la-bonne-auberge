import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { CssBaseline } from "@mui/material";

import Footer from 'components/Footer/Footer';
import Landing from "pages/Landing/Landing";
import Campaigns from "pages/Campaigns/Campaigns";
//import Admin from "pages/Admin";
//import DiceTableAdmin from "pages/DiceTable/DiceTableAdmin";
//import DiceTable from "pages/DiceTable";

import * as routes from "config/routes"

function Admin() { return <div>Admin</div> }
function Blog() { return <div>Blog</div> }
function DiceTableAdmin() { return <div>Dice Table Admin</div> }
function DiceTable() { return <div>Dice Table</div> }

function LandingRoutes() {
  return (
    <Routes>
      <Route path={routes.DICETABLEBASE} element={<DiceTableAdmin />} />
      <Route path={routes.DICETABLE} element={<DiceTable />} />
      <Route path={routes.DICE_TEST} element={<DiceTable />} />
      <Route path={routes.ABOUT} element={<Landing />} />
      <Route path={routes.GM} element={<Admin />} />
      <Route path={routes.CAMPAIGNS} element={<Campaigns />} />
      <Route path={routes.BLOG} element={<Blog />} />
      <Route path={routes.ROOT} element={<Landing />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <CssBaseline />
      <main className="mainWrapper">
        <LandingRoutes />
      </main>
      <footer className="footerWrapper">
        <Footer />
      </footer>
    </Router>
  );
}

export default App;
