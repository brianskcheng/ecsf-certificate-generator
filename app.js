(() => {
  // --- DOM refs ---
  const nameInput = document.getElementById('recipientName');
  const occasionSelect = document.getElementById('occasion');
  const customOccasionInput = document.getElementById('customOccasion');
  const descriptionInput = document.getElementById('description');
  const dateInput = document.getElementById('certDate');
  const certIdInput = document.getElementById('certId');
  const signedByInput = document.getElementById('signedBy');
  const sigTitleInput = document.getElementById('sigTitle');
  const exportBtn = document.getElementById('exportBtn');
  const sigCanvas = document.getElementById('sigCanvas');
  const clearSigBtn = document.getElementById('clearSig');

  const prevName = document.getElementById('prevName');
  const prevOccasion = document.getElementById('prevOccasion');
  const prevDescription = document.getElementById('prevDescription');
  const prevDate = document.getElementById('prevDate');
  const prevCertId = document.getElementById('prevCertId');
  const prevSigTitle = document.getElementById('prevSigTitle');
  const prevSigImage = document.getElementById('prevSigImage');
  const prevSigCursive = document.getElementById('prevSigCursive');
  const cert = document.getElementById('certificate');
  const wrapper = document.getElementById('previewWrapper');
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebarToggle');
  const sigModeCursive = document.getElementById('sigModeCursive');
  const sigModeDraw = document.getElementById('sigModeDraw');
  const sigPadGroup = document.getElementById('sigPadGroup');

  let sigMode = 'cursive'; // 'cursive' or 'draw'

  // --- Defaults ---
  dateInput.value = new Date().toISOString().split('T')[0];
  certIdInput.value = generateCertId();
  updatePreview();
  scalePreview();
  window.addEventListener('resize', scalePreview);

  // --- Sidebar toggle ---
  sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    setTimeout(scalePreview, 320);
  });

  // --- Signature mode toggle ---
  sigModeCursive.addEventListener('click', () => {
    sigMode = 'cursive';
    sigModeCursive.classList.add('active');
    sigModeDraw.classList.remove('active');
    sigPadGroup.classList.add('hidden');
    updatePreview();
  });

  sigModeDraw.addEventListener('click', () => {
    sigMode = 'draw';
    sigModeDraw.classList.add('active');
    sigModeCursive.classList.remove('active');
    sigPadGroup.classList.remove('hidden');
    updatePreview();
  });

  // --- Event listeners ---
  nameInput.addEventListener('input', updatePreview);
  occasionSelect.addEventListener('change', () => {
    customOccasionInput.classList.toggle('hidden', occasionSelect.value !== 'custom');
    updatePreview();
  });
  customOccasionInput.addEventListener('input', updatePreview);
  descriptionInput.addEventListener('input', updatePreview);
  dateInput.addEventListener('input', updatePreview);
  certIdInput.addEventListener('input', updatePreview);
  signedByInput.addEventListener('input', updatePreview);
  sigTitleInput.addEventListener('input', updatePreview);
  exportBtn.addEventListener('click', exportPDF);

  // --- Generate certificate ID ---
  function generateCertId() {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const seq = String(Math.floor(Math.random() * 9000) + 1000);
    return `ECSF-${y}${m}-${seq}`;
  }

  // --- Live preview ---
  function updatePreview() {
    prevName.textContent = nameInput.value || 'Recipient Name';

    const occasion = occasionSelect.value === 'custom'
      ? (customOccasionInput.value || 'Occasion')
      : occasionSelect.value;
    prevOccasion.textContent = occasion;

    if (descriptionInput.value.trim()) {
      prevDescription.textContent = 'for ' + descriptionInput.value.trim();
      prevDescription.classList.remove('hidden');
    } else {
      prevDescription.textContent = '';
      prevDescription.classList.add('hidden');
    }

    if (dateInput.value) {
      const d = new Date(dateInput.value + 'T00:00:00');
      prevDate.textContent = d.toLocaleDateString('en-GB', {
        day: 'numeric', month: 'long', year: 'numeric'
      });
    } else {
      prevDate.textContent = '';
    }

    prevCertId.textContent = certIdInput.value ? 'Ref: ' + certIdInput.value : '';
    prevSigTitle.textContent = sigTitleInput.value || '';

    // Signature mode
    if (sigMode === 'cursive') {
      prevSigCursive.textContent = signedByInput.value || 'Signature';
      prevSigCursive.classList.remove('hidden');
      prevSigImage.classList.add('hidden');
    } else {
      prevSigCursive.classList.add('hidden');
      if (hasSig) prevSigImage.classList.remove('hidden');
    }
  }

  // --- Scale preview to fit container ---
  function scalePreview() {
    const ww = wrapper.clientWidth;
    const wh = wrapper.clientHeight;
    if (!ww || !wh) return;
    const scale = Math.min(ww / 1122, wh / 794, 1);
    cert.style.transform = `scale(${scale})`;
    cert.style.position = 'absolute';
    cert.style.left = ((ww - 1122 * scale) / 2) + 'px';
    cert.style.top = ((wh - 794 * scale) / 2) + 'px';
  }

  // =====================
  // SIGNATURE PAD
  // =====================
  const ctx = sigCanvas.getContext('2d');
  let drawing = false;
  let hasSig = false;

  function getPos(e) {
    const rect = sigCanvas.getBoundingClientRect();
    const scaleX = sigCanvas.width / rect.width;
    const scaleY = sigCanvas.height / rect.height;
    const source = e.touches ? e.touches[0] : e;
    return {
      x: (source.clientX - rect.left) * scaleX,
      y: (source.clientY - rect.top) * scaleY
    };
  }

  function startDraw(e) {
    e.preventDefault();
    drawing = true;
    hasSig = true;
    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  }

  function draw(e) {
    if (!drawing) return;
    e.preventDefault();
    const pos = getPos(e);
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#1A1A1A';
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  }

  function stopDraw() {
    if (!drawing) return;
    drawing = false;
    updateSigPreview();
  }

  sigCanvas.addEventListener('mousedown', startDraw);
  sigCanvas.addEventListener('mousemove', draw);
  sigCanvas.addEventListener('mouseup', stopDraw);
  sigCanvas.addEventListener('mouseleave', stopDraw);
  sigCanvas.addEventListener('touchstart', startDraw, { passive: false });
  sigCanvas.addEventListener('touchmove', draw, { passive: false });
  sigCanvas.addEventListener('touchend', stopDraw);

  clearSigBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, sigCanvas.width, sigCanvas.height);
    hasSig = false;
    prevSigImage.classList.add('hidden');
    prevSigImage.src = '';
  });

  function updateSigPreview() {
    if (!hasSig) return;
    const dataUrl = sigCanvas.toDataURL('image/png');
    prevSigImage.src = dataUrl;
    prevSigImage.classList.remove('hidden');
  }

  // --- PDF Export ---
  async function exportPDF() {
    exportBtn.disabled = true;
    exportBtn.textContent = 'Generating...';

    // Save current styles
    const savedTransform = cert.style.transform;
    const savedPosition = cert.style.position;
    const savedLeft = cert.style.left;
    const savedTop = cert.style.top;

    try {
      // Reset to full size for capture
      cert.style.transform = 'none';
      cert.style.position = 'static';
      cert.style.left = '';
      cert.style.top = '';
      wrapper.style.overflow = 'visible';

      const canvas = await html2canvas(cert, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#FFFFFF',
        width: 1122,
        height: 794
      });

      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });

      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const imgData = canvas.toDataURL('image/png');

      pdf.addImage(imgData, 'PNG', 0, 0, pageW, pageH);

      const fileName = (nameInput.value || 'certificate').replace(/\s+/g, '_');
      pdf.save(`ECSF_Certificate_${fileName}.pdf`);
    } catch (err) {
      console.error('PDF export error:', err);
      alert('PDF generation failed. Please try again.');
    } finally {
      // Restore styles
      cert.style.transform = savedTransform;
      cert.style.position = savedPosition;
      cert.style.left = savedLeft;
      cert.style.top = savedTop;
      wrapper.style.overflow = '';
      scalePreview();
      exportBtn.disabled = false;
      exportBtn.textContent = 'Export PDF';
    }
  }
})();
