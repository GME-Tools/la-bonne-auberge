import axios from 'axios';
import { NotionRenderer } from 'react-notion-x'
import { Collection } from 'react-notion-x/build/third-party/collection';
import React, { useCallback, useEffect, useState } from 'react'

import 'react-notion-x/src/styles.css'
import './Blog.css';
import { useParams } from 'react-router-dom';
import { Box, Fab, Zoom } from '@mui/material';
import useScrollTrigger from "@mui/material/useScrollTrigger";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function Blog() {
  let { pageId } = useParams();
  pageId = pageId ? pageId : "7017ce4b249c47a0ae78471aeaa2e80a";
  const [recordMap, setRecordMap] = useState();

  const getData = async () => {
    const map = await axios.get("https://Notion-API.bcoudrin.repl.co/"+pageId);
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
    // eslint-disable-next-line
  }, [])

  return <React.Fragment>
    <NotionRenderer
      recordMap={recordMap}
      fullPage={true}
      components={{
        Collection
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
  </React.Fragment>
}

export default Blog;