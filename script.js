
document.addEventListener('DOMContentLoaded', () => {
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const mobileNav = document.querySelector('.mobile-nav');
  const languageSelectDesktop = document.getElementById('languageSelectDesktop');
  const languageSelectMobile = document.getElementById('languageSelectMobile');

  const logoText = document.querySelector('.logo');
  const contactLink = document.querySelector('.contact-link');
  const footerTitle = document.getElementById('footerTitle');
  const phone = document.getElementById('phone');
  const email = document.getElementById('email');
  const sliderSection = document.querySelector('.slider');
  const gallerySection = document.querySelector('.gallery');
  const sliderSlides = document.querySelectorAll('.slider .slide');
  const captions = document.querySelectorAll('.slider .caption');
  const flowerCards = document.querySelectorAll('.gallery .flower');
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const closeButton = document.querySelector('.modal .close');

  const servicesNavLink = document.querySelector('.mobile-nav a[href="#services"]');

  const productCategorySections = document.querySelectorAll('.product-category-section');
  const backToMainButtons = document.querySelectorAll('.back-to-main-button');

  let currentSlide = 0;
  let sliderInterval;

  const languageData = {
    hy: {
      logo: "Bloom Armenia",
      contact: "Կապ մեզ հետ",
      mobileNavLinks: {
        about: "Մեր Մասին",
        services: "Տեսականի",
        contact: "Կապ մեզ հետ"
      },
      phone: "📞 Հեռախոսահամար՝ 096434430",
      email: "📧 Էլ. հասցե՝ arsen.melitossian@shnikmail.ru",
      captions: [
        "Վարդ — Ամենահայտնի սերը խորհրդանշող ծաղիկն է, որը տարբեր գույներով ունի տարբեր նշանակություններ (կարմիրը՝ սեր, սպիտակը՝ մաքրություն)",
        "Շուշան — Հաճախ ասոցացվում է մաքրության և վերածննդի հետ, հատկապես սպիտակ շուշանը կրոնական խորհրդանիշ է։",
        "Կակաչները — Գարնան առաջին բերանդներից մեկն է, որը խորհրդանշում է սեր և նոր սկիզբ։",
        "Իռիս — Նրբագեղ կապույտ կամ մանուշակագույն ծաղիկ է, որը հաճախ օգտագործվում է հարսանեկան կոմպոզիցիաներում՝ խորհրդանշելով հավատարմություն և հույս։"
      ],
      flowerNames: ["Վարդ", "Շուշան", "Իռիս", "Կակաչներ", "Քրիզանթեմ", "Գլադիոլուս", "Փիոն", "Խատուտիկ", "Հասմիկ"],
      flowerTitles: [
        "Ինչպես խնամել վարդը", "Ինչպես խնամել շուշանը", "Ինչպես խնամել իռիսը", "Ինչպես խնամել կակաչները",
        "Ինչպես խնամել քրիզանթեմը", "Ինչպես խնամել գլադիոլուսը", "Ինչպես խնամել փիոնը",
        "Ինչպես խնամել խատուտիկը", "Ինչպես խնամել հասմիկը"
      ],
      flowerDescs: [
        "1. Արևի լույս - Վարդին պետք է օրական առնվազն 6 ժամ արև։<br>2. Ջրում - Ջրիր շաբաթը 2-3 անգամ, միայն արմատային մասում։<br>3. Հողը - Լավ ջրաթափվող և հարուստ հումուսով։<br>4. Սնուցում - Ամեն 2 շաբաթը մեկ օգտագործիր հատուկ պարարտանյութ։<br>5. Կտրտում - Հեռացրու չոր կամ հիվանդացած տերևները, ինչպես նաև մարած ծաղիկները։<br>6. Ձմեռային պաշտպանություն - Եթե ցուրտ է, ծածկիր բույսը կամ տեղափոխիր ներքին տարածք։",
        "1. Արևի լույս - Շուշանին անհրաժեշտ է լուսավոր տեղ, սակայն անմիջական արևը վնասակար է։<br>2. Ջրում - Ջրիր թույլ, օրական մի քանի անգամ քիչ-քիչ։<br>3. Հողը - Լավ ջրաթափվող, փխրուն հող։<br>4. Սնուցում - Օգտագործիր բուսական պարարտանյութեր։<br>5. Կտրտում - Հեռացրու մարած ծաղիկները և չոր տերևները։<br>6. Ձմեռային պաշտպանություն - Պաշտպանիր ցրտից։",
        "1. Արևի լույս - Իռիսը սիրում է արևոտ տեղեր։<br>2. Ջրում - Ջրի չափը միջին է, չպետք է գերաչայլ լինի։<br>3. Հողը - Լավ ջրաթափվող, միջին հարստությամբ հող։<br>4. Սնուցում - Օգտագործիր բազմազան պարարտանյութեր։<br>5. Կտրտում - Հեռացրու հիվանդ տերևները։<br>6. Ձմեռային պաշտպանություն - Անհրաժեշտության դեպքում ծածկիր։",
        "1. Արևի լույս - Կակաչները պետք է ունենան լուսավոր տարածք։<br>2. Ջրում - Ջրի չափը միջին է, չափավոր ջրումը։<br>3. Հողը - Ջրաթափող հող, հարուստ հումուսով։<br>4. Սնուցում - Օգտագործիր բնական պարարտանյութեր։<br>5. Կտրտում - Հեռացրու չոր ծաղիկները։<br>6. Ձմեռային պաշտպանություն - Պաշտպանիր ցրտից։",
        "1. Արևի լույս - Քրիզանթեմին անհրաժեշտ է քիչ արև։<br>2. Ջրում - Ջրի չափը մեծ չէ, խուսափիր գերլցումից։<br>3. Հողը - Լավ ջրաթափվող հող։<br>4. Սնուցում - Օգտագործիր հատուկ պարարտանյութեր։<br>5. Կտրտում - Հեռացրու չոր տերևները։<br>6. Ձմեռային պաշտպանություն - Ծածկիր կամ տեղափոխիր։",
        "1. Արևի լույս - Գլադիոլուսը սիրում է արևոտ վայրեր։<br>2. Ջրում - Ջրիր կանոնավոր, չափավոր։<br>3. Հողը - Լավ ջրաթափող հող։<br>4. Սնուցում - Օգտագործիր բուսական պարարտանյութեր։<br>5. Կտրտում - Հեռացրու չոր ծաղիկները։<br>6. Ձմեռային պաշտպանություն - Պաշտպանիր ցրտից։",
        "1. Արևի լույս - Փիոնը սիրում է արևոտ տեղեր։<br>2. Ջրում - Ջրի չափը միջին է, անհրաժեշտության դեպքում ջուր ավելացրու։<br>3. Հողը - Հարուստ հումուսով հող։<br>4. Սնուցում - Օգտագործիր հատուկ պարարտանյութեր։<br>5. Կտրտում - Հեռացրու չոր տերևները։<br>6. Ձմեռային պաշտպանություն - Ծածկիր ցրտից։",
        "1. Արևի լույս - Խատուտիկը նախընտրում է թաքնված լույս։<br>2. Ջրում - Ջրի չափը փոքր է, խուսափիր գերլցումից։<br>3. Հողը - Լավ ջրաթափող հող։<br>4. Սնուցում - Օգտագործիր բնական պարարտանյութեր։<br>5. Կտրտում - Հեռացրու չոր տերևները։<br>6. Ձմեռային պաշտպանություն - Պաշտպանիր ցրտից։",
        "1. Արևի լույս - Հասմիկը սիրում է արևոտ և լուսավոր վայրեր։<br>2. Ջրում - Ջրի չափը միջին է։<br>3. Հողը - Լավ ջրաթափող հող։<br>4. Սնուցում - Օգտագործիր բուսական պարարտանյութեր։<br>5. Կտրտում - Հեռացրու չոր տերևները։<br>6. Ձմեռային պաշտպանություն - Պաշտպանիր ցրտից։"
      ],
      assortmentModalContent: {
        title: "Մեր Տեսականին",
        description: `
                    <p>Ընտրեք Ձեզ հետաքրքրող բաժինը:</p>
                    <ul>
                        <li><a href="flowers.html" class="assortment-option" data-option="flowers-section">Ծաղիկներ</a></li>
                        <li><a href="vegetables.html" class="assortment-option" data-option="vegetables-section">Բանջարեղեն</a></li>
                        <li><a href="#" class="assortment-option" data-option="houseplants-section">Տնային Բույսեր</a></li>
                        <li><a href="#" class="assortment-option" data-option="accessories-section">Աքսեսուարներ</a></li>
                    </ul>
                `
      }
    },
    en: {
      logo: "Bloom Armenia",
      contact: "Contact Us",
      mobileNavLinks: {
        about: "About Us",
        services: "Assortment",
        contact: "Contact Us"
      },
      phone: "📞 Phone: 096434430",
      email: "📧 Email: arsen.melitossian@shnikmail.ru",
      captions: [
        "Rose — The most famous flower symbolizing love. Its colors have different meanings (red = love, white = purity).",
        "Lily — Often associated with purity and rebirth, especially the white lily in religious contexts.",
        "Tulips — One of the first signs of spring, symbolizing love and new beginnings.",
        "Iris — A graceful blue or purple flower used in weddings, symbolizing loyalty and hope."
      ],
      flowerNames: ["Rose", "Lily", "Iris", "Poppies", "Chrysanthemum", "Gladiolus", "Peony", "Dandelion", "Jasmine"],
      flowerTitles: [
        "How to care for a rose", "How to care for a lily", "How to care for an iris", "How to care for poppies",
        "How to care for a chrysanthemum", "How to care for a gladiolus", "How to care for a peony",
        "How to care for a dandelion", "How to care for jasmine"
      ],
      flowerDescs: [
        "1. Sunlight - A rose needs at least 6 hours of sunlight daily.<br>2. Watering - Water 2-3 times a week, only at the root.<br>3. Soil - Should be well-drained and rich in humus.<br>4. Feeding - Use special rose fertilizer every 2 weeks.<br>5. Pruning - Remove dry or diseased leaves and faded flowers to promote new growth.<br>6. Winter protection - Cover the plant or bring indoors if it is cold.",
        "1. Sunlight - Lilies need indirect light; direct sun can damage them.<br>2. Watering - Water lightly several times daily.<br>3. Soil - Well-drained, loose soil.<br>4. Feeding - Use organic fertilizers.<br>5. Pruning - Remove wilted flowers and dry leaves.<br>6. Winter protection - Protect from frost.",
        "1. Sunlight - Iris prefers sunny locations.<br>2. Watering - Moderate watering; avoid overwatering.<br>3. Soil - Well-drained, moderately fertile soil.<br>4. Feeding - Use balanced fertilizers.<br>5. Pruning - Remove diseased leaves.<br>6. Winter protection - Cover if necessary.",
        "1. Sunlight - Poppies need bright locations.<br>2. Watering - Moderate watering.<br>3. Soil - Well-drained, humus-rich soil.<br>4. Feeding - Use natural fertilizers.<br>5. Pruning - Remove dry flowers.<br>6. Winter protection - Protect from frost.",
        "1. Sunlight - Chrysanthemums prefer less sun.<br>2. Watering - Avoid overwatering.<br>3. Soil - Well-drained soil.<br>4. Feeding - Use special fertilizers.<br>5. Pruning - Remove dry leaves.<br>6. Winter protection - Cover or move indoors.",
        "1. Sunlight - Gladiolus likes sunny spots.<br>2. Watering - Water regularly but moderately.<br>3. Soil - Well-drained soil.<br>4. Feeding - Use organic fertilizers.<br>5. Pruning - Remove dry flowers.<br>6. Winter protection - Protect from frost.",
        "1. Sunlight - Peonies prefer sunny places.<br>2. Watering - Moderate watering, increase if needed.<br>3. Soil - Humus-rich soil.<br>4. Feeding - Use special fertilizers.<br>5. Pruning - Remove dry leaves.<br>6. Winter protection - Cover from frost.",
        "1. Sunlight - Dandelion prefers hidden light.<br>2. Watering - Low water needs; avoid overwatering.<br>3. Soil - Well-drained soil.<br>4. Feeding - Use natural fertilizers.<br>5. Pruning - Remove dry leaves.<br>6. Winter protection - Protect from frost.",
        "1. Sunlight - Jasmine likes sunny and bright places.<br>2. Watering - Moderate watering.<br>3. Soil - Well-drained soil.<br>4. Feeding - Use organic fertilizers.<br>5. Pruning - Remove dry leaves.<br>6. Winter protection - Protect from frost."
      ],
      assortmentModalContent: {
        title: "Our Assortment",
        description: `
                    <p>Choose a section that interests you:</p>
                    <ul>
                        <li><a href="flowers.html" class="assortment-option" data-option="flowers-section">Flowers</a></li>
                        <li><a href="vegetables.html" class="assortment-option" data-option="vegetables-section">Vegetables</a></li>
                        <li><a href="#" class="assortment-option" data-option="houseplants-section">Houseplants</a></li>
                        <li><a href="#" class="assortment-option" data-option="accessories-section">Accessories</a></li>
                    </ul>
                `
      }
    },
    ru: {
      logo: "Bloom Armenia",
      contact: "Связаться с нами",
      mobileNavLinks: {
        about: "О нас",
        services: "Ассортимент",
        contact: "Связаться с нами"
      },
      phone: "📞 Телефон: 096434430",
      email: "📧 Эл. адрес: arsen.melitossian@shnikmail.ru",
      captions: [
        "Роза — Самый известный цветок, символизирующий любовь. Разные цвета имеют разное значение (красный — любовь, белый — чистота).",
        "Лилия — Часто ассоциируется с чистотой и возрождением, особенно белая лилия в религиозном контексте.",
        "Тюльпаны — Один из первых признаков весны, символизирует любовь и новое начало.",
        "Ирис — Элегантный синий или фиолетовый цветок, символизирующий верность и надежду."
      ],
      flowerNames: ["Роза", "Лилия", "Ирис", "Мак", "Хризантема", "Гладиолус", "Пион", "Одуванчик", "Жасмин"],
      flowerTitles: [
        "Как ухаживать за розой", "Как ухаживать за лилией", "Как ухаживать за ирисом", "Как ухаживать за маком",
        "Как ухаживать за хризантемой", "Как ухаживать за гладиолусом", "Как ухаживать за пионом",
        "Как ухаживать за одуванчиком", "Как ухаживать за жасмином"
      ],
      flowerDescs: [
        "1. Солнечный свет - Розе нужно минимум 6 часов солнечного света в день.<br>2. Полив - Поливайте 2-3 раза в неделю, только у корня.<br>3. Почва - Должна быть хорошо дренированной и богатой гумусом.<br>4. Удобрение - Используйте специальное удобрение для роз каждые 2 недели.<br>5. Обрезка - Удаляйте сухие или больные листья и увядшие цветы для стимулирования нового роста.<br>6. Зимняя защита - Накрывайте растение или переносите в помещение при холоде.",
        "1. Солнечный свет - Лилии нуждаются в рассеянном свете; прямое солнце может повредить их.<br>2. Полив - Полив легкий, несколько раз в день.<br>3. Почва - Хорошо дренированная, рыхлая почва.<br>4. Удобрение - Используйте органические удобрения.<br>5. Обрезка - Удаляйте увядшие цветы и сухие листья.<br>6. Зимняя защита - Защищайте от мороза.",
        "1. Солнечный свет - Ирис предпочитает солнечные места.<br>2. Полив - Умеренный полив; избегайте переувлажнения.<br>3. Почва - Хорошо дренированная, средне плодородная почва.<br>4. Удобрение - Используйте сбалансированные удобрения.<br>5. Обрезка - Удаляйте больные листья.<br>6. Зимняя защита - При необходимости накрывайте.",
        "1. Солнечный свет - Маки нуждаются в ярком освещении.<br>2. Полив - Умеренный полив.<br>3. Почва - Хорошо дренированная, богатая гумусом почва.<br>4. Удобрение - Используйте натуральные удобрения.<br>5. Обрезка - Удаляйте сухие цветы.<br>6. Зимняя защита - Защищайте от мороза.",
        "1. Солнечный свет - Хризантемы предпочитают меньше солнца.<br>2. Полив - Избегайте переувлажнения.<br>3. Почва - Хорошо дренированная почва.<br>4. Удобрение - Используйте специальные удобрения.<br>5. Обрезка - Удаляйте сухие листья.<br>6. Зимняя защита - Накрывайте или переносите в помещение.",
        "1. Солнечный свет - Гладиолусы любят солнечные места.<br>2. Полив - Поливайте регулярно, умеренно.<br>3. Почва - Хорошо дренированная почва.<br>4. Удобрение - Используйте органические удобрения.<br>5. Обрезка - Удаляйте сухие цветы.<br>6. Зимняя защита - Защищайте от мороза.",
        "1. Солнечный свет - Пионы предпочитают солнечные места.<br>2. Полив - Умеренный полив, при необходимости увеличьте.<br>3. Почва - Богатая гумусом почва.<br>4. Удобрение - Используйте специальные удобрения.<br>5. Обрезка - Удаляйте сухие листья.<br>6. Зимняя защита - Защищайте от мороза.",
        "1. Солнечный свет - Одуванчик предпочитает тень.<br>2. Полив - Низкие потребности в воде; избегайте переувлажнения.<br>3. Почва - Хорошо дренированная почва.<br>4. Удобрение - Используйте натуральные удобрения.<br>5. Обрезка - Удаляйте сухие листья.<br>6. Зимняя защита - Защищайте от мороза.",
        "1. Солнечный свет - Жасмин любит солнечные и светлые места.<br>2. Полив - Умеренный полив.<br>3. Почва - Хорошо дренированная почва.<br>4. Удобрение - Используйте органические удобрения.<br>5. Обрезка - Удаляйте сухие листья.<br>6. Зимняя защита - Защищайте от мороза."
      ],
      assortmentModalContent: {
        title: "Наш Ассортимент",
        description: `
                    <p>Выберите интересующий раздел:</p>
                    <ul>
                        <li><a href="flowers.html" class="assortment-option" data-option="flowers-section">Цветы</a></li>
                        <li><a href="vegetables.html" class="assortment-option" data-option="vegetables-section">Овощи</a></li>
                        <li><a href="#" class="assortment-option" data-option="houseplants-section">Комнатные Растения</a></li>
                        <li><a href="#" class="assortment-option" data-option="accessories-section">Аксессуары</a></li>
                    </ul>
                `
      }
    }
  };

  const updateUI = (lang) => {
    const data = languageData[lang];
    if (!data) return;

    logoText.textContent = data.logo;
    contactLink.textContent = data.contact;

    footerTitle.textContent = data.contact;
    phone.textContent = data.phone;
    email.textContent = data.email;

    captions.forEach((el, index) => {
      el.textContent = data.captions[index];
    });

    const flowerNameElements = document.querySelectorAll('.gallery .flower p');
    flowerNameElements.forEach((el, index) => {
      if (data.flowerNames && data.flowerNames[index]) {
        el.textContent = data.flowerNames[index];
      }
    });

    const mobileNavLinks = mobileNav.querySelectorAll('a');
    if (mobileNavLinks.length >= 3) {
      mobileNavLinks[0].textContent = data.mobileNavLinks.about;
      mobileNavLinks[1].textContent = data.mobileNavLinks.services;
      mobileNavLinks[2].textContent = data.mobileNavLinks.contact;
    }

    if (languageSelectDesktop) {
      languageSelectDesktop.value = lang;
    }
    if (languageSelectMobile) {
      languageSelectMobile.value = lang;
    }
  };

  const showNextSlide = () => {
    sliderSlides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % sliderSlides.length;
    sliderSlides[currentSlide].classList.add('active');
  };

  const showInfo = (index) => {
    const lang = (languageSelectDesktop && languageSelectDesktop.value) ||
      (languageSelectMobile && languageSelectMobile.value) ||
      'hy';
    const data = languageData[lang];
    modalTitle.textContent = data.flowerTitles[index];
    modalDesc.innerHTML = data.flowerDescs[index];
    modal.style.display = 'flex';
  };

  const hideAllProductSections = () => {
    productCategorySections.forEach(section => {
      section.style.display = 'none';
    });
  };

  const showMainContent = () => {
    hideAllProductSections();
    sliderSection.style.display = 'block';
    gallerySection.style.display = 'grid';

    if (mobileNav.classList.contains('active')) {
      mobileNav.classList.remove('active');
      hamburgerMenu.setAttribute('aria-expanded', 'false');
    }
    closeModal();

    if (!sliderInterval) {
      sliderInterval = setInterval(showNextSlide, 5000);
    }
  };

  const showAssortmentOptions = (event) => {
    event.preventDefault();

    if (sliderInterval) {
      clearInterval(sliderInterval);
      sliderInterval = null;
    }

    const lang = (languageSelectDesktop && languageSelectDesktop.value) ||
      (languageSelectMobile && languageSelectMobile.value) ||
      'hy';
    const data = languageData[lang].assortmentModalContent;
    modalTitle.textContent = data.title;
    modalDesc.innerHTML = data.description;
    modal.style.display = 'flex';

    const assortmentOptions = modalDesc.querySelectorAll('.assortment-option');
    assortmentOptions.forEach(option => {
      option.addEventListener('click', (e) => {
        const selectedSectionId = e.target.dataset.option;

        hideAllProductSections();
        sliderSection.style.display = 'none';
        gallerySection.style.display = 'none';

        const targetSection = document.getElementById(selectedSectionId);
        if (targetSection) {
          targetSection.style.display = 'block';
        }
        closeModal();
        if (mobileNav.classList.contains('active')) {
          mobileNav.classList.remove('active');
          hamburgerMenu.setAttribute('aria-expanded', 'false');
        }
      });
    });
  };

  const closeModal = () => {
    modal.style.display = 'none';
  };

  if (languageSelectDesktop) {
    languageSelectDesktop.addEventListener('change', () => {
      const lang = languageSelectDesktop.value;
      updateUI(lang);
    });
  }

  if (languageSelectMobile) {
    languageSelectMobile.addEventListener('change', () => {
      const lang = languageSelectMobile.value;
      updateUI(lang);
    });
  }

  hamburgerMenu.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
    const isExpanded = hamburgerMenu.getAttribute('aria-expanded') === 'true' || false;
    hamburgerMenu.setAttribute('aria-expanded', !isExpanded);
  });

  flowerCards.forEach(card => {
    card.addEventListener('click', () => {
      const index = card.dataset.flowerIndex;
      showInfo(index);
    });
  });

  if (servicesNavLink) {
    servicesNavLink.addEventListener('click', showAssortmentOptions);
  }

  backToMainButtons.forEach(button => {
    button.addEventListener('click', showMainContent);
  });

  closeButton.addEventListener('click', closeModal);

  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });


  const initialLang = (languageSelectDesktop && languageSelectDesktop.value) ||
    (languageSelectMobile && languageSelectMobile.value) ||
    'hy';
  updateUI(initialLang);
  sliderInterval = setInterval(showNextSlide, 5000);
  showMainContent();
});
