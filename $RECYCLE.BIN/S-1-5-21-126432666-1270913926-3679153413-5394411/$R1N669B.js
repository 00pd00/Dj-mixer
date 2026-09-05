import React from 'react';
import Translate from '@docusaurus/Translate';
import IconEdit from '@theme/Icon/Edit';

export default function EditThisPage({editUrl}) {
  // Create a history/commits URL from the edit URL
  const historyUrl = editUrl?.replace('/-/blob/', '/-/commits/');
  
  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      {historyUrl && (
        <a href={historyUrl} target="_blank" rel="noreferrer noopener">
          <IconEdit />
          <Translate
            id="theme.common.viewHistory"
            description="The link label to view page history">
            View History
          </Translate>
        </a>
      )}
      
    </div>
  );
}
