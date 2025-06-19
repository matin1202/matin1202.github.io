// assets/js/mermaid_animation.js
document.addEventListener('DOMContentLoaded', function () {
  const animationBlocks = document.querySelectorAll('.mermaid-animation-block');

  animationBlocks.forEach(block => {
    const id = block.id;
    const graphContainerId = `${id}-graph`;
    const graphContainer = document.getElementById(graphContainerId);
    
    if (!graphContainer) return;

    // 데이터 가져오기
    const interval = parseInt(block.dataset.interval, 10);
    const frames = JSON.parse(block.dataset.frames);
    if (frames.length === 0) return;

    // 컨트롤 버튼
    const playBtn = block.querySelector('.play-btn');
    const pauseBtn = block.querySelector('.pause-btn');

    let currentFrameIndex = 0;
    let intervalId = null;
    let isPlaying = true;

    // 특정 프레임을 렌더링하는 함수
    const renderFrame = async (index) => {
      if (!window.mermaid) return;
      const mermaidCode = frames[index];
      
      // Mermaid API를 사용하여 SVG로 렌더링
      try {
        // 렌더링 전 컨테이너 비우기
        graphContainer.innerHTML = 'Rendering...';
        const { svg } = await mermaid.render(graphContainerId + '-svg', mermaidCode);
        graphContainer.innerHTML = svg;
      } catch (e) {
        graphContainer.innerHTML = `<pre class="error">Mermaid Render Error:\n${e.message}</pre>`;
        // 에러 발생 시 애니메이션 중지
        if (intervalId) clearInterval(intervalId);
      }
    };

    // 애니메이션 루프를 시작하는 함수
    const startAnimation = () => {
      if (intervalId) clearInterval(intervalId); // 기존 루프 제거
      
      intervalId = setInterval(() => {
        currentFrameIndex = (currentFrameIndex + 1) % frames.length;
        renderFrame(currentFrameIndex);
      }, interval);

      isPlaying = true;
      if(playBtn) playBtn.style.display = 'none';
      if(pauseBtn) pauseBtn.style.display = 'inline-flex';
    };

    // 애니메이션을 중지하는 함수
    const stopAnimation = () => {
      if (intervalId) clearInterval(intervalId);
      intervalId = null;
      isPlaying = false;
      if(playBtn) playBtn.style.display = 'inline-flex';
      if(pauseBtn) pauseBtn.style.display = 'none';
    };

    // 컨트롤 버튼에 이벤트 리스너 추가
    if(pauseBtn) pauseBtn.addEventListener('click', stopAnimation);
    if(playBtn) playBtn.addEventListener('click', () => {
        // 현재 프레임 즉시 렌더링 후 다음 프레임부터 애니메이션 시작
        renderFrame(currentFrameIndex);
        startAnimation();
    });

    // 초기화: 첫 프레임 렌더링 후 애니메이션 시작
    renderFrame(0);
    startAnimation();
  });
});
