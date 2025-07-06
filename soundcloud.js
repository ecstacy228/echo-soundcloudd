if (window.location.hostname.includes('soundcloud.com')) {
  const setupEchoIntegration = () => {
    const audioElements = document.querySelectorAll('audio');
    
    if (audioElements.length > 0) {
      const audio = audioElements[0];
      
      audio.addEventListener('play', () => {
        window.postMessage({
          type: 'ECHO_PLAY',
          payload: {
            title: document.title.replace(' | SoundCloud', ''),
            artist: document.querySelector('.playbackSoundBadge__titleContextContainer a')?.textContent || 'Unknown Artist',
            artwork: document.querySelector('.playbackSoundBadge__avatar span')?.style.backgroundImage.match(/url\("(.*)"\)/)?.[1] || ''
          }
        }, '*');
      });

      audio.addEventListener('pause', () => {
        window.postMessage({ type: 'ECHO_PAUSE' }, '*');
      });
    }
  };

  const checkInterval = setInterval(() => {
    if (document.querySelector('audio')) {
      clearInterval(checkInterval);
      setupEchoIntegration();
    }
  }, 1000);
}
