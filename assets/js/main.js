// Konfigurasi Supabase: ganti dengan URL dan Anon Public Key proyek Anda dari dashboard Supabase
const SUPABASE_CONFIG = {
  url: "https://gexirwvmlpsobfxjshwj.supabase.co",
  anonKey: "sb_publishable_HmzKaRWP-82MhACjrsx5Tw_rmcpkusB",
};

const isSupabaseConfigured = () => {
  return (
    SUPABASE_CONFIG.url.startsWith("https://") &&
    !SUPABASE_CONFIG.url.includes("xyzcompany") &&
    SUPABASE_CONFIG.anonKey.length > 20
  );
};

let supabaseClient = null;
if (window.supabase && isSupabaseConfigured()) {
  try {
    supabaseClient = window.supabase.createClient(
      SUPABASE_CONFIG.url,
      SUPABASE_CONFIG.anonKey,
    );
  } catch (err) {
    console.warn("Gagal menginisialisasi Supabase client:", err);
  }
}

// Data simulasi awal agar website langsung dapat diuji tanpa konfigurasi database
let localMessages = [
  {
    id: 1,
    name: "Dimas Wahyu",
    email: "dimas@kampus.id",
    message: "Desain baru ini jauh lebih bersih, modern, dan nyaman dibaca.",
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 2,
    name: "Siti Aisyah",
    email: "siti@example.com",
    message:
      "Portofolionya keren Kak Hendrik! Sukses selalu untuk program EKSIS!",
    created_at: new Date(Date.now() - 10800000).toISOString(),
  },
  {
    id: 3,
    name: "Budi Santoso",
    email: "budi@example.com",
    message: "Inspiratif sekali buat kami yang baru belajar web engineering.",
    created_at: new Date(Date.now() - 1800000).toISOString(),
  },
];

document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");
  const rootElement = document.documentElement;

  function applyTheme(theme) {
    if (theme === "dark") {
      rootElement.setAttribute("data-theme", "dark");
      if (themeIcon) themeIcon.className = "fa-solid fa-sun";
      if (themeToggle) {
        themeToggle.setAttribute("aria-label", "Beralih ke mode terang");
        themeToggle.setAttribute("title", "Beralih ke mode terang");
      }
    } else {
      rootElement.removeAttribute("data-theme");
      if (themeIcon) themeIcon.className = "fa-solid fa-moon";
      if (themeToggle) {
        themeToggle.setAttribute("aria-label", "Beralih ke mode gelap");
        themeToggle.setAttribute("title", "Beralih ke mode gelap");
      }
    }
  }

  const savedTheme = localStorage.getItem("eksis_theme");
  const systemPrefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(savedTheme || (systemPrefersDark ? "dark" : "light"));

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isCurrentlyDark = rootElement.getAttribute("data-theme") === "dark";
      const nextTheme = isCurrentlyDark ? "light" : "dark";
      applyTheme(nextTheme);
      localStorage.setItem("eksis_theme", nextTheme);
    });
  }

  const mobileToggle = document.getElementById("mobile-toggle");
  const navLinks = document.getElementById("nav-links");

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      mobileToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        mobileToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const messageTextarea = document.getElementById("message");
  const charCounter = document.getElementById("char-count");

  if (messageTextarea && charCounter) {
    const maxLimit = 1000;
    function updateCounter() {
      const currentLength = messageTextarea.value.length;
      charCounter.textContent = `${currentLength} / ${maxLimit}`;
    }
    messageTextarea.addEventListener("input", updateCounter);
    updateCounter();
  }

  // Menyamarkan alamat email untuk melindungi privasi pengunjung di kontak publik
  function maskEmail(email) {
    if (!email || !email.includes("@")) return "anonymized";
    const parts = email.split("@");
    return parts[0].charAt(0) + "***@" + parts[1];
  }

  // Mencegah kerentanan XSS saat merender input pengguna ke DOM
  function escapeHTML(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function formatDate(isoString) {
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return "Baru saja";
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mei",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Okt",
      "Nov",
      "Des",
    ];
    const pad = (n) => String(n).padStart(2, "0"); // taste-skill-ignore
    return `${pad(d.getDate())} ${months[d.getMonth()]} ${d.getFullYear()}, ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }

  const messageListContainer = document.getElementById("message-list");

  function renderMessages(items) {
    if (!messageListContainer) return;

    if (!items || items.length === 0) {
      messageListContainer.innerHTML =
        '<p style="font-style:italic; color:var(--muted);">Belum ada pesan tersimpan.</p>';
      return;
    }

    messageListContainer.innerHTML = items
      .map(
        (msg) => `
      <div class="card" style="padding:1.2rem;">
        <div style="display:flex; justify-content:space-between; font-size:0.85rem; color:var(--muted); margin-bottom:0.35rem;">
          <strong style="color:var(--text);">
            ${escapeHTML(msg.name)} 
            <span style="font-weight:normal;">(${escapeHTML(maskEmail(msg.email))})</span>
          </strong>
          <span>${formatDate(msg.created_at)}</span>
        </div>
        <div style="font-size:0.95rem; color:var(--muted);">
          ${escapeHTML(msg.message).replace(/\n/g, "<br>")}
        </div>
      </div>
    `,
      )
      .join("");
  }

  async function loadMessages() {
    if (supabaseClient) {
      try {
        const { data, error } = await supabaseClient
          .from("messages")
          .select("id, name, email, message, created_at")
          .order("id", { ascending: false })
          .limit(5);

        if (error) throw error;
        renderMessages(data);
        return;
      } catch (err) {
        console.warn(
          "Gagal memuat pesan dari Supabase, beralih ke data lokal:",
          err,
        );
      }
    }
    renderMessages(localMessages);
  }

  loadMessages();

  const contactForm = document.getElementById("contact-form");
  const alertBox = document.getElementById("contact-alert");
  const alertText = document.getElementById("contact-alert-text");
  const closeAlertBtn = document.getElementById("close-alert");
  const submitBtn = document.getElementById("submit-btn");

  function showAlert(message, type = "success") {
    if (!alertBox || !alertText) return;
    alertText.textContent = message;
    alertBox.style.display = "flex";
    if (type === "error") {
      alertBox.style.background = "#fef2f2";
      alertBox.style.color = "#991b1b";
    } else {
      alertBox.style.background = "var(--surface)";
      alertBox.style.color = "var(--text)";
    }

    setTimeout(() => {
      alertBox.style.display = "none";
    }, 6000);
  }

  if (closeAlertBtn && alertBox) {
    closeAlertBtn.addEventListener("click", () => {
      alertBox.style.display = "none";
    });
  }

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const nameInput = document.getElementById("name");
      const emailInput = document.getElementById("email");
      const msgInput = document.getElementById("message");

      const name = nameInput ? nameInput.value.trim() : "";
      const email = emailInput ? emailInput.value.trim() : "";
      const message = msgInput ? msgInput.value.trim() : "";

      if (!name || name.length < 2) {
        showAlert("Silakan isi nama lengkap minimal 2 karakter.", "error");
        if (nameInput) nameInput.focus();
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        showAlert(
          "Format email tidak valid (contoh: nama@domain.com).",
          "error",
        );
        if (emailInput) emailInput.focus();
        return;
      }

      if (!message || message.length < 5) {
        showAlert(
          "Pesan terlalu pendek, mohon ketik minimal 5 karakter.",
          "error",
        );
        if (msgInput) msgInput.focus();
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Mengirim Pesan...";
      }

      try {
        if (supabaseClient) {
          const { error } = await supabaseClient
            .from("messages")
            .insert([{ name, email, message }]);

          if (error) throw error;
        } else {
          const newMsg = {
            id: Date.now(),
            name,
            email,
            message,
            created_at: new Date().toISOString(),
          };
          localMessages.unshift(newMsg);
          localMessages = localMessages.slice(0, 5);
        }

        showAlert(`Terima kasih, ${name}! Pesanmu berhasil terkirim.`);
        contactForm.reset();
        if (charCounter) charCounter.textContent = "0 / 1000";
        await loadMessages();
      } catch (err) {
        console.error("Error pengiriman pesan:", err);
        showAlert(
          "Gagal mengirim pesan ke database. Silakan coba lagi.",
          "error",
        );
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = "Kirim Pesan";
        }
      }
    });
  }
});
