// التأكد إن محتوى الموقع موجود
if (typeof siteContent === "undefined") {
  console.error("ملف content.js مش متوصل!");
} else {

  // النصوص الرئيسية
  document.getElementById("introText").textContent =
    siteContent.introText;

  document.getElementById("storyText").textContent =
    siteContent.storyText;

  document.getElementById("storyDate").textContent =
    siteContent.storyDate;

  document.getElementById("closingTitle").textContent =
    siteContent.closingTitle;

  document.getElementById("closingText").textContent =
    siteContent.closingText;

  // صورة الصفحة الرئيسية
  const heroPhoto = document.getElementById("heroPhoto");

  if (siteContent.heroImage) {
    heroPhoto.innerHTML = `
      <img src="${siteContent.heroImage}" alt="ذكرياتنا">
    `;
  }

  // معرض الصور
  const gallery = document.getElementById("gallery");

  siteContent.memories.forEach(memory => {
    const card = document.createElement("article");
    card.className = "gallery-card";

    if (memory.image) {
      const img = document.createElement("img");
      img.src = memory.image;
      img.alt = memory.title;
      card.appendChild(img);
    } else {
      const placeholder = document.createElement("div");
      placeholder.className = "photo-placeholder";
      placeholder.style.height = "280px";
      placeholder.textContent = "الصورة هتتحط هنا ♡";
      card.appendChild(placeholder);
    }

    const title = document.createElement("h3");
    title.textContent = memory.title;

    const description = document.createElement("p");
    description.textContent = memory.description;

    card.append(title, description);
    gallery.appendChild(card);
  });

  // الخط الزمني
  const timeline = document.getElementById("timelineItems");

  siteContent.timeline.forEach(item => {
    const element = document.createElement("div");
    element.className = "timeline-item";

    const date = document.createElement("span");
    date.className = "eyebrow";
    date.textContent = item.date;

    const title = document.createElement("h3");
    title.textContent = item.title;

    const description = document.createElement("p");
    description.textContent = item.description;

    element.append(date, title, description);
    timeline.appendChild(element);
  });

  // الرسالة
  document.getElementById("letterTitle").textContent =
    siteContent.letterTitle;

  document.getElementById("letterBody").textContent =
    siteContent.letterBody;

  document.getElementById("signature").textContent =
    siteContent.signature;

  // فتح وقفل الرسالة
  const modal = document.getElementById("letterModal");

  document.getElementById("letterBtn").addEventListener("click", () => {
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  });

  function closeLetter() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  }

  document.getElementById("closeModal").addEventListener(
    "click", closeLetter
  );

  document.getElementById("modalBackdrop").addEventListener(
    "click", closeLetter
  );

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeLetter();
  });

  // زر بداية الحكاية
  document.getElementById("startBtn").addEventListener("click", () => {
    document.getElementById("story").scrollIntoView({
      behavior: "smooth"
    });
  });

  // ظهور العناصر أثناء النزول
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach(element => {
    observer.observe(element);
  });

  console.log("الموقع اشتغل بنجاح ❤️");
}