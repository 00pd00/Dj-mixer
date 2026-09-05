import React from 'react';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

// Fix for duplicate content in GitLab artifacts
export default function Root({children}) {
  React.useEffect(() => {
    if (ExecutionEnvironment.canUseDOM) {
      // Remove duplicate skip links that appear during hydration
      const skipLinks = document.querySelectorAll('[aria-label="Skip to main content"]');
      if (skipLinks.length > 1) {
        // Keep only the first one, remove others
        for (let i = 1; i < skipLinks.length; i++) {
          skipLinks[i].remove();
        }
      }

      // Fix for duplicate pages stacked vertically
      // This handles cases where the entire page content is duplicated
      const body = document.body;
      const allDivs = Array.from(body.children);
      
      // Find all root-level divs that might be duplicates
      const rootDivs = allDivs.filter(el => 
        el.tagName === 'DIV' && 
        el.querySelector('[class*="layout"]') || 
        el.querySelector('[class*="navbar"]') ||
        el.querySelector('header') ||
        el.querySelector('main')
      );

      // If we have more than one root div with full page content, remove the first one (server-rendered)
      if (rootDivs.length > 1) {
        console.log('Detected duplicate page content, removing duplicate...');
        rootDivs[0].remove();
      }

      // Additional cleanup: remove any hidden duplicate content
      const hiddenDuplicates = document.querySelectorAll('.duplicate-content-hidden');
      hiddenDuplicates.forEach(el => el.remove());
    }
  }, []);

  return <>{children}</>;
}
