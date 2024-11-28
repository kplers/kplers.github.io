document.addEventListener('DOMContentLoaded', function() {
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach(function(codeBlock) {
      const container = codeBlock.parentNode;
      const wrapper = document.createElement('div');
      wrapper.className = 'code-wrapper';
      container.parentNode.insertBefore(wrapper, container);
      wrapper.appendChild(container);
      
      const copyButton = document.createElement('button');
      copyButton.className = 'copy-button';
      copyButton.innerHTML = '<i class="fas fa-copy"></i>';
      
      copyButton.addEventListener('click', function() {
        navigator.clipboard.writeText(codeBlock.textContent);
        copyButton.innerHTML = '<i class="fas fa-check"></i>';
        setTimeout(() => {
          copyButton.innerHTML = '<i class="fas fa-copy"></i>';
        }, 2000);
      });
      
      wrapper.appendChild(copyButton);
    });
  });