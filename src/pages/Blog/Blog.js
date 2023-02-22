import axios from "axios";
import { NotionRenderer } from 'react-notion-x';
import { Collection } from 'react-notion-x/build/third-party/collection';
import { Pdf } from 'react-notion-x/build/third-party/pdf'
import React, { useCallback, useEffect, useState } from 'react';
import { getPageTitle } from "notion-utils";

import 'react-notion-x/src/styles.css';
import './Blog.css';
import { Box, Fab, Typography, Zoom } from '@mui/material';
import useScrollTrigger from "@mui/material/useScrollTrigger";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const mapPageUrl = (pageId) => {
  pageId = (pageId || '').replace(/-/g, '')
  return "/blog/"+pageId
}

const pageMap = {
  home: "7017ce4b249c47a0ae78471aeaa2e80a",
  campaigns: "abc53481a7e041f7b399cb0f98ae77dc",
  oneshots: "2f9d210d9a1b43f99ae4cab4e1b32730",
  modules: "9ea3cd9f820a49a0b44b053164280b4f",
  guides: "de9e7266f7a54ebf91cb954778ca5963",
  about: "21b8f1809dfe4404b711a025358f066d"
}

function Blog(props) {
  const { page } = props;
  const [recordMap, setRecordMap] = useState();

  const getData = async () => {
    const map = await axios.get("https://Notion-API.bcoudrin.repl.co/page/" + pageMap[page]);
    setRecordMap(map.data);
  }

  const trigger = useScrollTrigger({
    
    disableHysteresis: true,
    threshold: 100,
  });

  const scrollToTop = useCallback(() => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }, []);
  
  useEffect(() => {
    getData();
    scrollToTop();
    // eslint-disable-next-line
  }, [page])

  return (
    <div className="blogWrapper">
      <div className="blogHeroContent">
        <Typography variant="h2" sx={{fontSize: "40px"}} gutterBottom>La Bonne Auberge</Typography>
        <Typography variant="h5" sx={{fontSize: "20px"}} paragraph>Un blog sur le Jeu de Rôle en Solo</Typography>
      </div>

      {
        (page !== "home") &&
        <div style={{padding: "20px 110px 0px 110px", marginBottom: "-50px"}}><Typography variant="h4" sx={{color: "black"}}>{getPageTitle(recordMap)}</Typography></div>
      }
      <NotionRenderer
        recordMap={recordMap}
        fullPage={false}
        mapPageUrl={mapPageUrl}
        components={{
          Collection,
          Pdf
        }}/>
      <Zoom in={trigger}>
        <Box
          role="presentation"
          sx={{
            position: "fixed",
            bottom: 80,
            right: 80,
            zIndex: 1,
          }}
        >
          <Fab onClick={scrollToTop} ><KeyboardArrowUpIcon /></Fab>
        </Box>
      </Zoom>
    </div>
  )
}

export default Blog;