import axios from "axios";
import { NotionRenderer } from 'react-notion-x';
import { Collection } from 'react-notion-x/build/third-party/collection';
import { Pdf } from 'react-notion-x/build/third-party/pdf'
import React, { useCallback, useEffect, useState } from 'react';
import {Helmet} from "react-helmet";

import 'react-notion-x/src/styles.css';
import './Blog.css';
import { useParams } from 'react-router-dom';
import { Box, Fab, Zoom } from '@mui/material';
import Hero from "components/Hero/Hero";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { getPageTitle } from "notion-utils";
import { defaultMapImageUrl as mapImageUrl } from "react-notion-x";

const mapPageUrl = (pageId) => {
  pageId = (pageId || '').replace(/-/g, '')
  return "/blog/"+pageId
}

const getCoverImage = (recordMap) => {
  const pageBlock = recordMap.block && recordMap.block[Object.keys(recordMap.block)[0]]?.value
  if (pageBlock && pageBlock.format) {
    return mapImageUrl(pageBlock.format.page_cover, pageBlock);
  }
  return null;
}

const getCoverImagePosition = (recordMap) => {
  const pageBlock = recordMap.block && recordMap.block[Object.keys(recordMap.block)[0]]?.value
  if (pageBlock && pageBlock.format) {
    return 100*pageBlock.format.page_cover_position;
  }
  return 0;
}

function Blog() {
  let { pageId } = useParams();
  const [recordMap, setRecordMap] = useState();

  const getData = async () => {
    const map = await axios.get("https://notion-api-coq4.onrender.com/page/"+pageId);
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
  }, [pageId])

  return (
    <div className="blogWrapper">
      { recordMap &&
        <Helmet>
          <meta
            name="description"
            content={getPageTitle(recordMap)}
          />
          <title>La Bonne Auberge - {getPageTitle(recordMap)}</title>
        </Helmet>
      }
      { recordMap && <Hero image={getCoverImage(recordMap)} position={getCoverImagePosition(recordMap)} align="center" title={getPageTitle(recordMap)} /> }
      <NotionRenderer
        recordMap={recordMap}
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
