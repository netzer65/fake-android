const AndroidOS = (() => {
  const STORAGE_KEY = 'android_web_os_state_v2';
  const UNLOCK_WINDOW_MS = 5 * 60 * 1000;

  let liveBattery = {
    supported: false,
    level: 94,
    charging: false
  };

  const I18N = {
    de: {
      locale: 'de-DE',
      osName: 'Android 16',
      quickSettings: 'Schnelleinstellungen',
      wifi: 'WLAN',
      darkMode: 'Dunkelmodus',
      dnd: 'Nicht stören',
      calculator: 'Rechner',
      settings: 'Einstellungen',
      lockScreen: 'Bildschirm sperren',
      unlock: 'Entsperren',
      unlockPinTitle: 'PIN eingeben',
      unlockHint: 'Mit PIN entsperren oder direkt wischen',
      wrongPin: 'Falsche PIN',
      clear: 'Löschen',
      back: 'Zurück',
      home: 'Startbildschirm',
      lock: 'Sperren',
      powerOff: 'Ausschalten',
      restart: 'Neu starten',
      finished: 'Fertig!',
      searchSettings: 'Einstellungen durchsuchen',
      netTitle: 'Netzwerk und Internet',
      netSub: 'Mobilfunk, WLAN, Hotspot',
      connTitle: 'Verbundene Geräte',
      connSub: 'Bluetooth, Koppeln',
      appsTitle: 'Apps',
      appsSub: 'Assistent, zuletzt geöffnete Apps, Standard-Apps',
      notifTitle: 'Benachrichtigungen',
      notifSub: 'Benachrichtigungsverlauf, Unterhaltungen',
      soundTitle: 'Ton und Vibration',
      soundSub: 'Lautstärke und Haptik',
      modesTitle: 'Modi',
      modesSub: 'Nicht stören, Nachtruhe, Fahren',
      displayTitle: 'Display und Touch',
      displaySub: 'Dunkelmodus, Schriftgröße, Touch',
      styleTitle: 'Hintergrundbild und Stil',
      styleSub: 'Farben, thematische Symbole, App-Raster',
      batteryTitle: 'Akku',
      batterySub: (lvl, chg) => chg ? `${lvl}% · Lädt` : `${lvl}% · Geräteakku`,
      accountTitle: 'Google-Konto',
      accountSub: (name, email) => `${name} · ${email}`,
      familyTitle: 'Family Link',
      familySub: (active, limit) => active ? `Aktiv · Tageslimit ${limit} Min.` : 'Verwaltet · Bildschirmzeit & App-Limits',
      systemTitle: 'System & Sicherung',
      systemSub: 'Sprache, PIN, Tastatur, Backup, Neustart & Ausschalten',
      oskTitle: 'Bildschirmtastatur (Gboard-OSK)',
      oskSub: 'Virtuelle Tastatur bei Fokus auf Textfeldern einblenden',
      saved: 'Gespeichert.'
    },
    en: {
      locale: 'en-US',
      osName: 'Android 16',
      quickSettings: 'Quick Settings',
      wifi: 'Wi-Fi',
      darkMode: 'Dark theme',
      dnd: 'Do Not Disturb',
      calculator: 'Calculator',
      settings: 'Settings',
      lockScreen: 'Lock screen',
      unlock: 'Unlock',
      unlockPinTitle: 'Enter PIN',
      unlockHint: 'Unlock with PIN or swipe/tap to unlock',
      wrongPin: 'Incorrect PIN',
      clear: 'Clear',
      back: 'Back',
      home: 'Home',
      lock: 'Lock',
      powerOff: 'Power off',
      restart: 'Restart',
      finished: 'Done!',
      searchSettings: 'Search settings',
      netTitle: 'Network and internet',
      netSub: 'Mobile, Wi-Fi, hotspot',
      connTitle: 'Connected devices',
      connSub: 'Bluetooth, pairing',
      appsTitle: 'Apps',
      appsSub: 'Assistant, recent apps, default apps',
      notifTitle: 'Notifications',
      notifSub: 'Notification history, conversations',
      soundTitle: 'Sound and vibration',
      soundSub: 'Volume and haptics',
      modesTitle: 'Modes',
      modesSub: 'Do Not Disturb, Bedtime, Driving',
      displayTitle: 'Display and touch',
      displaySub: 'Dark theme, font size, touch',
      styleTitle: 'Wallpaper and style',
      styleSub: 'Colours, themed icons, app grid',
      batteryTitle: 'Battery',
      batterySub: (lvl, chg) => chg ? `${lvl}% · Charging` : `${lvl}% · Device battery`,
      accountTitle: 'Google Account',
      accountSub: (name, email) => `${name} · ${email}`,
      familyTitle: 'Family Link',
      familySub: (active, limit) => active ? `Active · ${limit} min daily limit` : 'Supervised · Screen time & app limits',
      systemTitle: 'System & Backup',
      systemSub: 'Language, PIN, keyboard, backup, restart & power off',
      oskTitle: 'On-screen keyboard (Gboard OSK)',
      oskSub: 'Show virtual keyboard when focusing text inputs',
      saved: 'Saved.'
    },
    fr: {
      locale: 'fr-FR',
      osName: 'Android 16',
      quickSettings: 'Réglages rapides',
      wifi: 'Wi-Fi',
      darkMode: 'Mode sombre',
      dnd: 'Ne pas déranger',
      calculator: 'Calculatrice',
      settings: 'Paramètres',
      lockScreen: 'Verrouiller l’écran',
      unlock: 'Déverrouiller',
      unlockPinTitle: 'Saisir le code PIN',
      unlockHint: 'Déverrouiller par PIN ou glisser pour ouvrir',
      wrongPin: 'Code PIN incorrect',
      clear: 'Effacer',
      back: 'Retour',
      home: 'Accueil',
      lock: 'Verrouiller',
      powerOff: 'Éteindre',
      restart: 'Redémarrer',
      finished: 'Terminé !',
      searchSettings: 'Rechercher dans les paramètres',
      netTitle: 'Réseau et Internet',
      netSub: 'Mobile, Wi-Fi, point d’accès',
      connTitle: 'Appareils connectés',
      connSub: 'Bluetooth, association',
      appsTitle: 'Applications',
      appsSub: 'Assistant, applis récentes, par défaut',
      notifTitle: 'Notifications',
      notifSub: 'Historique, conversations',
      soundTitle: 'Son et vibrations',
      soundSub: 'Volume et retour haptique',
      modesTitle: 'Modes',
      modesSub: 'Ne pas déranger, Coucher, Conduite',
      displayTitle: 'Affichage et tactile',
      displaySub: 'Thème sombre, taille du texte, tactile',
      styleTitle: 'Fond d’écran et style',
      styleSub: 'Couleurs, icônes thématiques, grille',
      batteryTitle: 'Batterie',
      batterySub: (lvl, chg) => chg ? `${lvl}% · En charge` : `${lvl}% · Batterie de l’appareil`,
      accountTitle: 'Compte Google',
      accountSub: (name, email) => `${name} · ${email}`,
      familyTitle: 'Family Link',
      familySub: (active, limit) => active ? `Actif · Limite ${limit} min/j` : 'Contrôle parental · Temps d’écran et applis',
      systemTitle: 'Système et sauvegarde',
      systemSub: 'Langue, PIN, clavier, sauvegarde, redémarrer et éteindre',
      oskTitle: 'Clavier virtuel (Gboard OSK)',
      oskSub: 'Afficher le clavier à l’écran lors de la saisie',
      saved: 'Enregistré.'
    },
    es: {
      locale: 'es-ES',
      osName: 'Android 16',
      quickSettings: 'Ajustes rápidos',
      wifi: 'Wi-Fi',
      darkMode: 'Modo oscuro',
      dnd: 'No molestar',
      calculator: 'Calculadora',
      settings: 'Ajustes',
      lockScreen: 'Bloquear pantalla',
      unlock: 'Desbloquear',
      unlockPinTitle: 'Introducir PIN',
      unlockHint: 'Desbloquear con PIN o deslizar para abrir',
      wrongPin: 'PIN incorrecto',
      clear: 'Borrar',
      back: 'Atrás',
      home: 'Inicio',
      lock: 'Bloquear',
      powerOff: 'Apagar',
      restart: 'Reiniciar',
      finished: '¡Listo!',
      searchSettings: 'Buscar en ajustes',
      netTitle: 'Red e Internet',
      netSub: 'Móvil, Wi-Fi, zona Wi-Fi',
      connTitle: 'Dispositivos conectados',
      connSub: 'Bluetooth, vinculación',
      appsTitle: 'Apps',
      appsSub: 'Asistente, apps recientes, predeterminadas',
      notifTitle: 'Notificaciones',
      notifSub: 'Historial, conversaciones',
      soundTitle: 'Sonido y vibración',
      soundSub: 'Volumen y vibración háptica',
      modesTitle: 'Modos',
      modesSub: 'No molestar, Descanso, Conducción',
      displayTitle: 'Pantalla y toque',
      displaySub: 'Tema oscuro, tamaño de fuente, toque',
      styleTitle: 'Fondo de pantalla y estilo',
      styleSub: 'Colores, iconos temáticos, cuadrícula',
      batteryTitle: 'Batería',
      batterySub: (lvl, chg) => chg ? `${lvl}% · Cargando` : `${lvl}% · Batería del dispositivo`,
      accountTitle: 'Cuenta de Google',
      accountSub: (name, email) => `${name} · ${email}`,
      familyTitle: 'Family Link',
      familySub: (active, limit) => active ? `Activo · Límite ${limit} min/día` : 'Supervisión · Tiempo de pantalla y apps',
      systemTitle: 'Sistema y copia de seguridad',
      systemSub: 'Idioma, PIN, teclado, copia, reiniciar y apagar',
      oskTitle: 'Teclado en pantalla (Gboard OSK)',
      oskSub: 'Mostrar teclado virtual al enfocar campos de texto',
      saved: 'Guardado.'
    },
    ja: {
      locale: 'ja-JP',
      osName: 'Android 16',
      quickSettings: 'クイック設定',
      wifi: 'Wi-Fi',
      darkMode: 'ダークテーマ',
      dnd: 'マナーモード',
      calculator: '電卓',
      settings: '設定',
      lockScreen: '画面をロック',
      unlock: 'ロック解除',
      unlockPinTitle: 'PINを入力',
      unlockHint: 'PINで解除するかスワイプ/タップで開く',
      wrongPin: 'PINが正しくありません',
      clear: '消去',
      back: '戻る',
      home: 'ホーム',
      lock: 'ロック',
      powerOff: '電源を切る',
      restart: '再起動',
      finished: '完了!',
      searchSettings: '設定を検索',
      netTitle: 'ネットワークとインターネット',
      netSub: 'モバイル、Wi-Fi、テザリング',
      connTitle: '接続済みのデバイス',
      connSub: 'Bluetooth、ペア設定',
      appsTitle: 'アプリ',
      appsSub: 'アシスタント、最近のアプリ、デフォルト',
      notifTitle: '通知',
      notifSub: '通知履歴、会話',
      soundTitle: '音とバイブレーション',
      soundSub: '音量と触覚フィードバック',
      modesTitle: 'モード',
      modesSub: 'マナーモード、おやすみ時間、運転モード',
      displayTitle: 'ディスプレイとタッチ',
      displaySub: 'ダークテーマ、フォントサイズ、タッチ',
      styleTitle: '壁紙とスタイル',
      styleSub: 'カラー、テーマアイコン、グリッド',
      batteryTitle: 'バッテリー',
      batterySub: (lvl, chg) => chg ? `${lvl}% · 充電中` : `${lvl}% · デバイスバッテリー`,
      accountTitle: 'Google アカウント',
      accountSub: (name, email) => `${name} · ${email}`,
      familyTitle: 'ファミリー リンク',
      familySub: (active, limit) => active ? `有効 · 1日${limit}分の上限` : '管理 · スクリーンタイムとアプリ制限',
      systemTitle: 'システムとバックアップ',
      systemSub: '言語、PIN、キーボード、バックアップ、再起動と電源オフ',
      oskTitle: '画面キーボード (Gboard OSK)',
      oskSub: '入力欄フォーカス時に仮想キーボードを表示',
      saved: '保存しました。'
    }
  };

  function createDefaultState() {
    return {
      hasData: false,
      oobeCompleted: false,
      poweredOff: false,
      locked: true,
      lastUnlockedAt: 0,
      lockPin: '',
      oskEnabled: false,
      deviceName: 'Pixel 10',
      userName: 'Guest',
      language: 'de',
      theme: 'ocean',
      mode: 'light',
      brightness: 100,
      wifi: true,
      bluetooth: true,
      dnd: false,
      batteryLevel: 94,
      batteryCharging: false,
      googleAccount: {
        signedIn: true,
        name: 'Guest User',
        email: 'guest.user@example.com',
        syncDrive: true,
        syncPhotos: true,
        syncContacts: true,
        storageUsedGb: 18.4,
        storageTotalGb: 100
      },
      familyLink: {
        enabled: true,
        parentName: 'Alex Morgan',
        parentEmail: 'parent.family@example.com',
        dailyLimitMinutes: 180,
        usedMinutesToday: 42,
        bedtimeEnabled: true,
        bedtimeStart: '22:00',
        bedtimeEnd: '07:00',
        blockedApps: ['musik.html']
      },
      timers: [
        { id: 't1', label: 'Focus Timer', duration: 1500, remaining: 1500, running: false, endAt: null }
      ],
      tasks: [
        { id: 's1', text: 'Review project checklist', done: false },
        { id: 's2', text: 'Check calendar schedule', done: true },
        { id: 's3', text: 'Install system updates', done: false }
      ],
      notes: [
        { id: 'n1', title: 'Welcome to Android Web OS', body: 'All apps share Material You themes, timers, notes, tasks, and calendar items via localStorage.', updated: 'Today' },
        { id: 'n2', title: 'Quick tip', body: 'Pull down or tap the top status bar to open Quick Settings at any time.', updated: 'Yesterday' }
      ],
      calendarEvents: [
        { id: 'c1', date: '2026-11-22', title: 'Weekly Sync & Planning', time: '19:30' },
        { id: 'c2', date: '2026-11-24', title: 'Design Review', time: '10:00' }
      ],
      gallery: [
        { id: 'g1', title: 'Coastal Horizon', tag: 'Nature', color1: '#0061A4', color2: '#D1E4FF', icon: 'wb_twilight' },
        { id: 'g2', title: 'Pine Forest Trail', tag: 'Outdoors', color1: '#2D6A4F', color2: '#B7E4C7', icon: 'forest' },
        { id: 'g3', title: 'Urban Geometry', tag: 'Architecture', color1: '#6750A4', color2: '#EADDFF', icon: 'apartment' },
        { id: 'g4', title: 'Desk Workspace', tag: 'Studio', color1: '#8B5000', color2: '#FFDCBE', icon: 'devices' }
      ],
      contacts: [
        { id: 'p1', name: 'Alex Morgan', role: 'Engineering', phone: '+1 555 014 8920', color: '#0061A4' },
        { id: 'p2', name: 'Samira Patel', role: 'Product Design', phone: '+1 555 019 3314', color: '#2D6A4F' },
        { id: 'p3', name: 'Kenji Sato', role: 'Systems & QA', phone: '+1 555 017 6641', color: '#6750A4' }
      ]
    };
  }

  function normalizeLang(lang) {
    if (!lang) return 'de';
    const l = String(lang).toLowerCase();
    if (l.startsWith('en')) return 'en';
    if (l.startsWith('fr')) return 'fr';
    if (l.startsWith('es')) return 'es';
    if (l.startsWith('ja')) return 'ja';
    return 'de';
  }

  function getLang(state = getState()) {
    return normalizeLang(state.language);
  }

  function t(key, state = getState(), ...args) {
    const lang = getLang(state);
    const val = (I18N[lang] && I18N[lang][key] !== undefined) ? I18N[lang][key] : I18N.de[key];
    if (typeof val === 'function') return val(...args);
    return val !== undefined ? val : key;
  }

  function hasRawStorage() {
    try {
      return localStorage.getItem(STORAGE_KEY) !== null;
    } catch (e) {
      return false;
    }
  }

  function getState() {
    const base = createDefaultState();
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return base;
      const parsed = JSON.parse(raw);
      return {
        ...base,
        ...parsed,
        googleAccount: { ...base.googleAccount, ...(parsed.googleAccount || {}) },
        familyLink: { ...base.familyLink, ...(parsed.familyLink || {}) }
      };
    } catch (e) {
      return base;
    }
  }

  function saveState(next) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch (e) {}
    applyAppearance(next);
  }

  function updateState(mutator) {
    const current = getState();
    const updated = mutator(current) || current;
    if (updated.oobeCompleted) {
      updated.hasData = true;
    }
    saveState(updated);
    return updated;
  }

  function getBatteryInfo(state = getState()) {
    if (liveBattery.supported) {
      return {
        supported: true,
        level: liveBattery.level,
        charging: liveBattery.charging
      };
    }
    return {
      supported: false,
      level: typeof state.batteryLevel === 'number' ? state.batteryLevel : 94,
      charging: !!state.batteryCharging
    };
  }

  function syncDeviceBattery(onUpdate) {
    if (typeof navigator !== 'undefined' && typeof navigator.getBattery === 'function') {
      navigator.getBattery().then((bm) => {
        const applyBattery = () => {
          liveBattery = {
            supported: true,
            level: Math.round((bm.level || 0) * 100),
            charging: !!bm.charging
          };
          updateState(s => {
            s.batteryLevel = liveBattery.level;
            s.batteryCharging = liveBattery.charging;
          });
          if (typeof onUpdate === 'function') onUpdate(getBatteryInfo());
        };
        applyBattery();
        bm.addEventListener('levelchange', applyBattery);
        bm.addEventListener('chargingchange', applyBattery);
      }).catch(() => {
        if (typeof onUpdate === 'function') onUpdate(getBatteryInfo());
      });
    } else if (typeof onUpdate === 'function') {
      onUpdate(getBatteryInfo());
    }
  }

  function requireUnlocked(redirectToLock = true) {
    const st = getState();
    const unlocked = !st.locked && isUnlockedRecently(st);
    if (!unlocked && redirectToLock) {
      const currentFile = (window.location.pathname.split('/').pop() || 'start.html') + (window.location.search || '');
      const target = (currentFile && currentFile !== 'lockscreen.html' && currentFile !== 'bootscreen.html' && currentFile !== 'index.html')
        ? `lockscreen.html?next=${encodeURIComponent(currentFile)}`
        : 'lockscreen.html';
      window.location.replace(target);
    }
    return unlocked;
  }

  function isUnlockedRecently(state = getState()) {
    if (state.locked) return false;
    if (!state.lastUnlockedAt) return false;
    return (Date.now() - Number(state.lastUnlockedAt)) <= UNLOCK_WINDOW_MS;
  }

  function markUnlocked() {
    return updateState(s => {
      s.locked = false;
      s.poweredOff = false;
      s.lastUnlockedAt = Date.now();
    });
  }

  function lockDevice(goToLock = false) {
    updateState(s => {
      s.locked = true;
    });
    if (goToLock) {
      window.location.href = 'lockscreen.html';
    }
  }

  function powerOffDevice(goToBoot = true) {
    updateState(s => {
      s.poweredOff = true;
      s.locked = true;
    });
    if (goToBoot) {
      window.location.href = 'bootscreen.html';
    }
  }

  function rebootDevice(goToBoot = true) {
    updateState(s => {
      s.poweredOff = false;
      s.locked = true;
    });
    if (goToBoot) {
      window.location.href = 'bootscreen.html';
    }
  }

  function factoryReset(goToOobe = true) {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
    const fresh = createDefaultState();
    applyAppearance(fresh);
    if (goToOobe) {
      window.location.href = 'oobe.html';
    }
  }

  function exportStateJson() {
    const st = getState();
    return JSON.stringify(st, null, 2);
  }

  function importStateJson(jsonText) {
    const parsed = JSON.parse(jsonText);
    if (!parsed || typeof parsed !== 'object') {
      throw new Error('Invalid JSON structure');
    }
    const base = createDefaultState();
    const merged = {
      ...base,
      ...parsed,
      googleAccount: { ...base.googleAccount, ...(parsed.googleAccount || {}) },
      familyLink: { ...base.familyLink, ...(parsed.familyLink || {}) },
      hasData: true,
      oobeCompleted: true,
      poweredOff: false,
      locked: true,
      lastUnlockedAt: 0
    };
    saveState(merged);
    return merged;
  }

  function applyAppearance(state = getState()) {
    const lang = getLang(state);
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('data-theme', state.theme || 'ocean');
    document.documentElement.setAttribute('data-mode', state.mode || 'light');
    document.documentElement.style.setProperty('--sys-brightness', (state.brightness || 100) / 100);
  }

  function formatTime(dateObj = new Date(), state = getState()) {
    const locale = (I18N[getLang(state)] || I18N.de).locale;
    return dateObj.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });
  }

  function formatDate(dateObj = new Date(), state = getState()) {
    const locale = (I18N[getLang(state)] || I18N.de).locale;
    return dateObj.toLocaleDateString(locale, { weekday: 'short', day: 'numeric', month: 'long' });
  }

  function formatSeconds(sec) {
    const s = Math.max(0, Math.floor(sec));
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const r = s % 60;
    if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(r).padStart(2, '0')}`;
    return `${String(m).padStart(2, '0')}:${String(r).padStart(2, '0')}`;
  }

  function getActiveTimers() {
    const state = getState();
    const now = Date.now();
    return (state.timers || []).map(tItem => {
      if (tItem.running && tItem.endAt) {
        const rem = Math.max(0, Math.ceil((tItem.endAt - now) / 1000));
        return { ...tItem, remaining: rem, finished: rem === 0 };
      }
      return { ...tItem, finished: tItem.remaining === 0 };
    });
  }

  function showToast(msg) {
    let el = document.getElementById('sys-toast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'sys-toast';
      el.style.cssText = [        'position:fixed',        'bottom:64px',        'left:50%',        'transform:translateX(-50%) translateY(16px)',        'z-index:120',        'background:var(--md-sys-color-inverse-surface, #313033)',        'color:var(--md-sys-color-inverse-on-surface, #F4EFF4)',        'padding:11px 18px',        'border-radius:999px',        'font-family:var(--font-sans)',        'font-size:13px',        'font-weight:600',        'box-shadow:0 8px 24px rgba(0,0,0,0.28)',        'opacity:0',        'pointer-events:none',        'transition:opacity 0.22s ease, transform 0.22s ease',        'max-width:90vw',        'text-align:center'      ].join(';');
      document.body.appendChild(el);
    }
    el.textContent = msg;
    requestAnimationFrame(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateX(-50%) translateY(0)';
    });
    clearTimeout(el._t);
    el._t = setTimeout(() => {
      el.style.opacity = '0';
      el.style.transform = 'translateX(-50%) translateY(16px)';
    }, 3200);
  }

  function mountDynamicIsland(isSetup = false) {
    if (isSetup) return;
    if (document.getElementById('ios-island-wrap')) return;
    const shell = document.querySelector('.android-shell');
    const statusEl = document.getElementById('sys-status-bar');
    if (!shell || !statusEl) return;

    const wrap = document.createElement('div');
    wrap.id = 'ios-island-wrap';
    wrap.className = 'ios-island-wrap';
    wrap.innerHTML = `
      <div class="ios-dynamic-island" id="ios-dynamic-island" title="Dynamic Island (iOS Live Activity)">
        <div class="ios-island-compact">
          <span style="display:inline-flex;align-items:center;gap:7px;">
            <span class="ios-island-dot" id="island-dot"></span>
            <span id="island-title">Dynamic Island</span>
          </span>
          <span id="island-badge" style="font-family:var(--font-mono);font-weight:700;color:#7DD3FC;">--:--</span>
        </div>
        <div class="ios-island-expanded" id="island-expanded">
          <div id="island-detail" style="opacity:0.88;">Live Activity aktiv</div>
          <div class="ios-island-actions">
            <button type="button" class="ios-island-btn primary" id="island-toggle-focus">Fokus-Modus</button>
            <a href="uhr.html" class="ios-island-btn">Uhr</a>
            <a href="musik.html" class="ios-island-btn">Musik</a>
          </div>
        </div>
      </div>
    `;
    statusEl.insertAdjacentElement('afterend', wrap);

    const island = document.getElementById('ios-dynamic-island');
    island.addEventListener('click', (e) => {
      if (e.target.closest('a, button')) return;
      island.classList.toggle('expanded');
    });

    document.getElementById('island-toggle-focus').addEventListener('click', (e) => {
      e.stopPropagation();
      const next = updateState(s => { s.dnd = !s.dnd; });
      showToast(next.dnd ? 'iOS Fokus / Nicht stören aktiviert' : 'iOS Fokus / Nicht stören deaktiviert');
      updateDynamicIsland();
    });

    updateDynamicIsland();
  }

  function updateDynamicIsland() {
    const titleEl = document.getElementById('island-title');
    const badgeEl = document.getElementById('island-badge');
    const detailEl = document.getElementById('island-detail');
    const dotEl = document.getElementById('island-dot');
    if (!titleEl || !badgeEl || !detailEl || !dotEl) return;

    const st = getState();
    const activeTimers = getActiveTimers().filter(item => item.running || item.finished);

    if (activeTimers.length > 0) {
      const t0 = activeTimers[0];
      titleEl.textContent = t0.label || 'Timer';
      badgeEl.textContent = t0.finished ? t('finished', st) : formatSeconds(t0.remaining);
      detailEl.textContent = `Aktiver Timer: ${t0.label || 'Timer'} · ${t0.finished ? t('finished', st) : formatSeconds(t0.remaining) + ' verbleibend'}`;
      dotEl.style.background = '#38BDF8';
      return;
    }

    if (st.dnd) {
      titleEl.textContent = 'Fokus aktiv';
      badgeEl.textContent = 'DND';
      detailEl.textContent = 'Mitteilungen werden im iOS-Fokusmodus gedämpft.';
      dotEl.style.background = '#A78BFA';
      return;
    }

    const bat = getBatteryInfo(st);
    titleEl.textContent = st.deviceName || 'iOS Live Pill';
    badgeEl.textContent = `${bat.level}%`;
    detailEl.textContent = `Gerät: ${st.deviceName || 'Pixel 10'} · Akku ${bat.level}% · Tippen zum Ein-/Ausklappen`;
    dotEl.style.background = '#34D399';
  }

  /* === Gboard-like Optional On-Screen Keyboard Controller === */
  const ROWS_LETTERS = [    ['q', 'w', 'e', 'r', 't', 'z', 'u', 'i', 'o', 'p', 'ü'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ö', 'ä'],
    ['SHIFT', 'y', 'x', 'c', 'v', 'b', 'n', 'm', 'ß', 'BACKSPACE'],
    ['?123', ',', 'SPACE', '.', 'ENTER']
  ];

  const ROWS_SYMBOLS = [    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-'],
    ['@', '#', '€', '%', '&', '*', '+', '/', '(', ')', '='],
    ['!', '?', ':', ';', '"', "'", '_', '~', '[', 'BACKSPACE'],
    ['ABC', ',', 'SPACE', '.', 'ENTER']
  ];

  let activeInput = null;
  let shiftActive = false;
  let symMode = false;
  let oskEl = null;
  let oskListenersAttached = false;

  function isOskEnabled(state = getState()) {
    return Boolean(state && state.oskEnabled);
  }

  function setOskEnabled(enabled) {
    const next = updateState(s => {
      s.oskEnabled = Boolean(enabled);
    });
    if (!next.oskEnabled) {
      closeOsk();
    } else if (activeInput && document.activeElement === activeInput) {
      openOsk(activeInput);
    }
    return next.oskEnabled;
  }

  function isTextInput(el) {
    if (!el || el.disabled || el.readOnly) return false;
    if (el.closest && el.closest('#gboard-osk')) return false;
    if (el.tagName === 'TEXTAREA') return true;
    if (el.tagName === 'INPUT') {
      const tType = (el.type || 'text').toLowerCase();
      return ['text', 'search', 'email', 'url', 'tel', 'number', 'password'].includes(tType);
    }
    return Boolean(el.isContentEditable);
  }

  function dispatchInputEvents(el) {
    el.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
  }

  function insertTextAtCursor(el, text) {
    if (el.isContentEditable) {
      document.execCommand('insertText', false, text);
      dispatchInputEvents(el);
      return;
    }
    const start = typeof el.selectionStart === 'number' ? el.selectionStart : el.value.length;
    const end = typeof el.selectionEnd === 'number' ? el.selectionEnd : el.value.length;
    const val = String(el.value || '');
    el.value = val.slice(0, start) + text + val.slice(end);
    const nextPos = start + text.length;
    try {
      el.setSelectionRange(nextPos, nextPos);
    } catch (_) {}
    dispatchInputEvents(el);
  }

  function backspaceAtCursor(el) {
    if (el.isContentEditable) {
      document.execCommand('delete', false, null);
      dispatchInputEvents(el);
      return;
    }
    const start = typeof el.selectionStart === 'number' ? el.selectionStart : el.value.length;
    const end = typeof el.selectionEnd === 'number' ? el.selectionEnd : el.value.length;
    const val = String(el.value || '');
    if (start !== end) {
      el.value = val.slice(0, start) + val.slice(end);
      try { el.setSelectionRange(start, start); } catch (_) {}
      dispatchInputEvents(el);
    } else if (start > 0) {
      el.value = val.slice(0, start - 1) + val.slice(end);
      try { el.setSelectionRange(start - 1, start - 1); } catch (_) {}
      dispatchInputEvents(el);
    }
  }

  function pressEnter(el) {
    if (el.tagName === 'TEXTAREA' || el.isContentEditable) {
      insertTextAtCursor(el, '\n');
      return;
    }
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', bubbles: true }));
    const form = el.form || (el.closest && el.closest('form'));
    if (form && typeof form.requestSubmit === 'function') {
      form.requestSubmit();
    }
    closeOsk();
  }

  function renderKeys() {
    if (!oskEl) return;
    const keysWrap = oskEl.querySelector('#gboard-keys');
    const targetBadge = oskEl.querySelector('#gboard-target-name');
    if (targetBadge && activeInput) {
      const label = activeInput.placeholder || activeInput.ariaLabel || activeInput.id || activeInput.tagName.toLowerCase();
      targetBadge.textContent = label;
    }

    const layout = symMode ? ROWS_SYMBOLS : ROWS_LETTERS;
    keysWrap.innerHTML = layout.map(row => {
      const rowHtml = row.map(key => {
        if (key === 'SHIFT') {
          return `<button type="button" class="gboard-key fn ${shiftActive ? 'active' : ''}" data-key="SHIFT" title="Groß/Klein"><span class="material-symbols-rounded" style="font-size:18px;">shift</span></button>`;
        }
        if (key === 'BACKSPACE') {
          return `<button type="button" class="gboard-key fn" data-key="BACKSPACE" title="Löschen"><span class="material-symbols-rounded" style="font-size:18px;">backspace</span></button>`;
        }
        if (key === '?123') {
          return `<button type="button" class="gboard-key fn" data-key="?123">?123</button>`;
        }
        if (key === 'ABC') {
          return `<button type="button" class="gboard-key fn active" data-key="ABC">ABC</button>`;
        }
        if (key === 'SPACE') {
          return `<button type="button" class="gboard-key space" data-key="SPACE">Leertaste</button>`;
        }
        if (key === 'ENTER') {
          return `<button type="button" class="gboard-key enter" data-key="ENTER" title="Eingabe"><span class="material-symbols-rounded" style="font-size:19px;">keyboard_return</span></button>`;
        }
        const shown = !symMode && shiftActive ? key.toUpperCase() : key;
        return `<button type="button" class="gboard-key" data-char="${encodeURIComponent(shown)}">${shown}</button>`;
      }).join('');
      return `<div class="gboard-row">${rowHtml}</div>`;
    }).join('');
  }

  function ensureOskElement() {
    if (oskEl && document.body.contains(oskEl)) return oskEl;
    const shell = document.querySelector('.android-shell') || document.body;
    oskEl = document.createElement('div');
    oskEl.id = 'gboard-osk';
    oskEl.className = 'gboard-osk';
    oskEl.setAttribute('role', 'region');
    oskEl.setAttribute('aria-label', 'Bildschirmtastatur');
    oskEl.innerHTML = `
      <div class="gboard-topstrip">
        <span style="font-weight:700;display:inline-flex;align-items:center;gap:6px;">
          <span class="material-symbols-rounded" style="font-size:17px;">keyboard</span>
          Gboard
        </span>
        <span class="gboard-target-pill" id="gboard-target-name">Eingabe</span>
        <button type="button" class="icon-btn" id="gboard-close-btn" title="Tastatur ausblenden" style="width:30px;height:30px;">
          <span class="material-symbols-rounded" style="font-size:18px;">keyboard_hide</span>
        </button>
      </div>
      <div id="gboard-keys"></div>
    `;

    oskEl.addEventListener('mousedown', e => e.preventDefault());
    oskEl.addEventListener('pointerdown', e => e.preventDefault());

    oskEl.addEventListener('click', e => {
      const closeBtn = e.target.closest('#gboard-close-btn');
      if (closeBtn) {
        closeOsk();
        return;
      }
      const keyBtn = e.target.closest('.gboard-key');
      if (!keyBtn || !activeInput) return;

      const special = keyBtn.dataset.key;
      if (special === 'SHIFT') {
        shiftActive = !shiftActive;
        renderKeys();
        return;
      }
      if (special === '?123') {
        symMode = true;
        renderKeys();
        return;
      }
      if (special === 'ABC') {
        symMode = false;
        renderKeys();
        return;
      }
      if (special === 'BACKSPACE') {
        backspaceAtCursor(activeInput);
        return;
      }
      if (special === 'SPACE') {
        insertTextAtCursor(activeInput, ' ');
        return;
      }
      if (special === 'ENTER') {
        pressEnter(activeInput);
        return;
      }
      if (keyBtn.dataset.char !== undefined) {
        const ch = decodeURIComponent(keyBtn.dataset.char);
        insertTextAtCursor(activeInput, ch);
        if (!symMode && shiftActive) {
          shiftActive = false;
          renderKeys();
        }
      }
    });

    shell.appendChild(oskEl);
    renderKeys();
    return oskEl;
  }

  function openOsk(inputEl) {
    if (!isOskEnabled() || !isTextInput(inputEl)) return;
    activeInput = inputEl;
    const el = ensureOskElement();
    renderKeys();
    el.classList.add('open');
    const shell = document.querySelector('.android-shell');
    if (shell) shell.classList.add('osk-open');
    try {
      inputEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    } catch (_) {}
  }

  function closeOsk() {
    if (oskEl) oskEl.classList.remove('open');
    const shell = document.querySelector('.android-shell');
    if (shell) shell.classList.remove('osk-open');
    activeInput = null;
  }

  function attachOskListeners() {
    if (oskListenersAttached) return;
    oskListenersAttached = true;

    document.addEventListener('focusin', e => {
      if (!isOskEnabled()) return;
      if (isTextInput(e.target)) {
        openOsk(e.target);
      }
    });

    document.addEventListener('click', e => {
      if (!oskEl || !oskEl.classList.contains('open')) return;
      if (oskEl.contains(e.target) || isTextInput(e.target)) return;
      closeOsk();
    });
  }

  function mountShell(options = {}) {
    const { showGestureBar = true, isLockscreen = false, isSetup = false } = options;
    const st = getState();
    applyAppearance(st);

    const statusEl = document.getElementById('sys-status-bar');
    if (statusEl) {
      const bat = getBatteryInfo(st);
      statusEl.innerHTML = `
        <div class="status-left">
          <span id="sb-clock">--:--</span>
          <span style="opacity:0.65;">${t('osName', st)}</span>
          <a href="uhr.html" id="sb-timer-pill" class="status-pill" style="display:none;">
            <span class="material-symbols-rounded" style="font-size:14px;">timer</span>
            <span id="sb-timer-text">00:00</span>
          </a>
        </div>
        <div class="status-right">
          <span id="sb-dnd" class="material-symbols-rounded" style="font-size:16px; display:none;">do_not_disturb_on</span>
          <span id="sb-wifi" class="material-symbols-rounded" style="font-size:17px;">wifi</span>
          <span class="material-symbols-rounded" style="font-size:17px;">signal_cellular_alt</span>
          <span style="display:inline-flex;align-items:center;gap:2px;">
            <span class="material-symbols-rounded filled" style="font-size:17px;" id="sb-bat-icon">${bat.charging ? 'battery_charging_full' : 'battery_full'}</span>
            <span id="sb-bat-val">${bat.level}%</span>
          </span>
        </div>
      `;

      let clockTapCount = 0;
      let clockTapTimer = null;
      const sbClockEl = document.getElementById('sb-clock');
      if (sbClockEl && !isSetup) {
        sbClockEl.addEventListener('click', (e) => {
          e.stopPropagation();
          clockTapCount++;
          clearTimeout(clockTapTimer);
          clockTapTimer = setTimeout(() => { clockTapCount = 0; }, 700);
          if (clockTapCount >= 3) {
            clockTapCount = 0;
            const next = updateState(s => {
              s.easterEggClockSpin = !s.easterEggClockSpin;
            });
            document.documentElement.classList.toggle('ee-spin', !!next.easterEggClockSpin);
            showToast(next.easterEggClockSpin
              ? 'Easter Egg #1 aktiv: Zeit-Wirbel & Retro-Akzent!'
              : 'Easter Egg #1 deaktiviert.');
          }
        });
      }
      if (st.easterEggClockSpin) {
        document.documentElement.classList.add('ee-spin');
      }

      statusEl.addEventListener('click', (e) => {
        if (isSetup) return;
        if (e.target.closest('#sb-timer-pill')) return;
        toggleQS(true);
      });
    }

    const qsRoot = document.getElementById('sys-qs-root');
    if (qsRoot && !isSetup) {
      qsRoot.innerHTML = `
        <div class="qs-backdrop" id="qs-backdrop"></div>
        <div class="qs-panel" id="qs-panel">
          <div class="qs-header">
            <div>
              <div id="qs-date" style="font-size:13px; color:var(--md-sys-color-on-surface-variant); font-weight:600;"></div>
              <div style="font-size:12px; opacity:0.75;">${t('quickSettings', st)}</div>
            </div>
            <div style="display:flex; gap:8px;">
              <a href="einstellungen.html" class="icon-btn" title="${t('settings', st)}">
                <span class="material-symbols-rounded">settings</span>
              </a>
              <button class="icon-btn" onclick="AndroidOS.lockDevice(true)" title="${t('lockScreen', st)}">
                <span class="material-symbols-rounded">lock</span>
              </button>
            </div>
          </div>
          <div class="qs-grid">
            <button class="qs-tile ${st.wifi ? 'active' : ''}" id="qs-wifi">
              <span class="material-symbols-rounded">wifi</span>
              <span>${t('wifi', st)}</span>
            </button>
            <button class="qs-tile ${st.mode === 'dark' ? 'active' : ''}" id="qs-dark">
              <span class="material-symbols-rounded">dark_mode</span>
              <span>${t('darkMode', st)}</span>
            </button>
            <button class="qs-tile ${st.dnd ? 'active' : ''}" id="qs-dnd">
              <span class="material-symbols-rounded">do_not_disturb_on</span>
              <span>${t('dnd', st)}</span>
            </button>
            <a href="rechner.html" class="qs-tile">
              <span class="material-symbols-rounded">calculate</span>
              <span>${t('calculator', st)}</span>
            </a>
          </div>
          <div class="qs-brightness">
            <span class="material-symbols-rounded" style="font-size:20px;">brightness_medium</span>
            <input type="range" id="qs-bright-range" min="45" max="100" value="${st.brightness || 100}">
          </div>
        </div>
      `;

      document.getElementById('qs-backdrop').addEventListener('click', () => toggleQS(false));
      document.getElementById('qs-wifi').addEventListener('click', (e) => {
        const next = updateState(s => { s.wifi = !s.wifi; });
        e.currentTarget.classList.toggle('active', next.wifi);
        refreshStatusIcons();
      });
      document.getElementById('qs-dark').addEventListener('click', (e) => {
        const next = updateState(s => { s.mode = s.mode === 'dark' ? 'light' : 'dark'; });
        e.currentTarget.classList.toggle('active', next.mode === 'dark');
      });
      document.getElementById('qs-dnd').addEventListener('click', (e) => {
        const next = updateState(s => { s.dnd = !s.dnd; });
        e.currentTarget.classList.toggle('active', next.dnd);
        refreshStatusIcons();
      });
      document.getElementById('qs-bright-range').addEventListener('input', (e) => {
        updateState(s => { s.brightness = Number(e.target.value); });
      });
    }

    const navRoot = document.getElementById('sys-gesture-nav');
    if (navRoot && showGestureBar && !isLockscreen && !isSetup) {
      navRoot.innerHTML = `
        <button class="gesture-action" onclick="history.back()" title="${t('back', st)}">
          <span class="material-symbols-rounded" style="font-size:20px;">arrow_back_ios_new</span>
        </button>
        <button class="gesture-pill" onclick="window.location.href='start.html'" title="${t('home', st)}"></button>
        <button class="gesture-action" onclick="AndroidOS.lockDevice(true)" title="${t('lock', st)}">
          <span class="material-symbols-rounded" style="font-size:20px;">lock</span>
        </button>
      `;
    }

    function refreshStatusIcons() {
      const cur = getState();
      const wifiEl = document.getElementById('sb-wifi');
      const dndEl = document.getElementById('sb-dnd');
      const batVal = document.getElementById('sb-bat-val');
      const batIcon = document.getElementById('sb-bat-icon');
      const bat = getBatteryInfo(cur);
      if (wifiEl) wifiEl.textContent = cur.wifi ? 'wifi' : 'wifi_off';
      if (dndEl) dndEl.style.display = cur.dnd ? 'inline-flex' : 'none';
      if (batVal) batVal.textContent = `${bat.level}%`;
      if (batIcon) batIcon.textContent = bat.charging ? 'battery_charging_full' : 'battery_full';
    }

    function tick() {
      const cur = getState();
      const now = new Date();
      const sbClock = document.getElementById('sb-clock');
      const qsDate = document.getElementById('qs-date');
      if (sbClock) sbClock.textContent = formatTime(now, cur);
      if (qsDate) qsDate.textContent = formatDate(now, cur);

      const active = getActiveTimers().filter(item => item.running || item.finished);
      const pill = document.getElementById('sb-timer-pill');
      const pillTxt = document.getElementById('sb-timer-text');
      if (pill && pillTxt) {
        if (active.length > 0) {
          pill.style.display = 'inline-flex';
          pillTxt.textContent = active[0].finished ? t('finished', cur) : formatSeconds(active[0].remaining);
        } else {
          pill.style.display = 'none';
        }
      }
      refreshStatusIcons();
      updateDynamicIsland();
    }

    if (!isSetup) {
      attachOskListeners();
    }
    mountDynamicIsland(isSetup);
    syncDeviceBattery(() => {
      refreshStatusIcons();
      updateDynamicIsland();
    });
    tick();
    setInterval(tick, 1000);
  }

  function toggleQS(open) {
    const bd = document.getElementById('qs-backdrop');
    const pn = document.getElementById('qs-panel');
    if (!bd || !pn) return;
    bd.classList.toggle('open', open);
    pn.classList.toggle('open', open);
  }

  return {
    STORAGE_KEY,
    I18N,
    createDefaultState,
    normalizeLang,
    getLang,
    t,
    hasRawStorage,
    getState,
    saveState,
    updateState,
    getBatteryInfo,
    syncDeviceBattery,
    isUnlockedRecently,
    requireUnlocked,
    markUnlocked,
    lockDevice,
    powerOffDevice,
    rebootDevice,
    factoryReset,
    exportStateJson,
    importStateJson,
    applyAppearance,
    formatTime,
    formatDate,
    formatSeconds,
    getActiveTimers,
    showToast,
    mountShell,
    mountDynamicIsland,
    updateDynamicIsland,
    toggleQS,
    isOskEnabled,
    setOskEnabled,
    openOsk,
    closeOsk
  };
})();
