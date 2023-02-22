import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { CssBaseline } from "@mui/material";

import Footer from 'components/Footer/Footer';
import Landing from "pages/Landing/Landing";
import Campaigns from "pages/Campaigns/Campaigns";
import GMAdmin from "pages/GMAdmin/GMAdmin";
import Blog from "pages/Blog/Blog";
import Article from "pages/Blog/Article";
//import DiceTableAdmin from "pages/DiceTable/DiceTableAdmin";
//import DiceTable from "pages/DiceTable";

import * as routes from "config/routes"

function DiceTableAdmin() { return <div>Dice Table Admin</div> }
function DiceTable() { return <div>Dice Table</div> }

function LandingRoutes() {
  return (
    <Routes>
      <Route path={routes.DICETABLEBASE} element={<DiceTableAdmin />} />
      <Route path={routes.DICETABLE} element={<DiceTable />} />
      <Route path={routes.GM} element={<GMAdmin />} />
      <Route path={routes.CAMPAIGNS} element={<Campaigns />} />
      <Route path={routes.BLOG} element={<Blog page="home" />} />
      <Route path={routes.BLOGCAMP} element={<Blog page="campaigns" />} />
      <Route path={routes.BLOGOS} element={<Blog page="oneshots" />} />
      <Route path={routes.BLOGMOD} element={<Blog page="modules" />} />
      <Route path={routes.BLOGGUI} element={<Blog page="guides" />} />
      <Route path={routes.BLOGAB} element={<Blog page="about" />} />
      <Route path={routes.BLOG+'/:pageId'} element={<Article />} />
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
