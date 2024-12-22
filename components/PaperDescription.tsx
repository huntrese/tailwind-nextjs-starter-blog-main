"use client"
import React, { useEffect, useState } from 'react';

const PaperDescription = ({ paperId }: { paperId: string }) => {
  const [paperInfo, setPaperInfo] = useState<any>(null);

  useEffect(() => {
    const fetchPaperInfo = async () => {
      try {
        const response = await fetch(
          `https://api.semanticscholar.org/graph/v1/paper/${paperId}?fields=abstract,tldr`
        );
        const data = await response.json();
        setPaperInfo(data);
      } catch (error) {
        console.error('Failed to fetch paper info:', error);
      }
    };

    fetchPaperInfo();
  }, [paperId]);

  if (!paperInfo) {
    return <div>Loading...</div>;
  }

  // Extract abstract and TL;DR from the response and ensure they are strings
  const abstract = typeof paperInfo.abstract === 'string' ? paperInfo.abstract : JSON.stringify(paperInfo.abstract);
  const tldr = typeof paperInfo.tldr === 'string' ? paperInfo.tldr : JSON.stringify(paperInfo.tldr["text"]);

  return (
    <div className="paper-description">
      <h3>Paper Description</h3>
      <p>{abstract || 'No abstract available.'}</p>
      {tldr && <p><strong>TL;DR:</strong> {tldr}</p>}
    </div>
  );
};

export default PaperDescription;
<script
  src="https://giscus.app/client.js"
  data-repo="your-username/your-repository" 
  data-repo-id="your-repository-id"
  data-category="General"
  data-category-id="your-category-id"
  data-mapping="pathname"
  data-strict="0"
  data-theme="light"
  data-lang="en"
  crossorigin="anonymous">
</script>
