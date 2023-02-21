import axios from 'axios';
import { NotionRenderer } from 'react-notion-x'
import { Collection } from 'react-notion-x/build/third-party/collection';
import { useEffect, useState } from 'react'

import 'react-notion-x/src/styles.css'
import './Blog.css';

function Blog() {
  const [recordMap, setRecordMap] = useState();

  const getData = async () => {
    const map = await axios.get("https://Notion-API.bcoudrin.repl.co");
    setRecordMap(map.data);
  }

  useEffect(() => {
    getData();
  }, [])

  return <NotionRenderer
    recordMap={recordMap}
    fullPage={true}
    components={{
      Collection
    }}/>
}

export default Blog;