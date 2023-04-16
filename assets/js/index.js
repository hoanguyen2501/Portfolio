$(document).ready(() => {
    /*=============== Change BACKGROUND HEADER ===============*/
    function scrollHeader() {
        const header = $("#header");
        // When the scroll is greater than 50 viewport height, add scroll-header class to header tag
        if (this.scrollY >= 50) {
            header.addClass("scroll-header");
        } else {
            header.removeClass("scroll-header");
        }
    }

    $(window).scroll(scrollHeader);

    /*=============== Import Skills From JSON ===============*/
    function importSkills() {
        let skillHtml = "";
        $.getJSON("/assets/data/skills.json", function (json) {
            json.forEach((item) => {
                let html = `<div class="skills__group">
                                <div class="skills__data">
                                    <img
                                        src="${item.img}"
                                        alt="HTML"
                                        class="skills__img"
                                    />
                                    <h3 class="skills__name">${item.name}</h3>
                                </div>
                            </div>`;
                $(".skills__box").append(html);
            });
        });
    }
    importSkills();

    /*=============== Import Project From JSON ===============*/
    function importProjects() {
        let projects = [];
        $.getJSON("/assets/data/projects.json", {
            tags: "mount rainier",
            tagmode: "any",
            format: "json"
        }, function (json) {
            json.forEach((item) => {
                let html = `<div class="projects__group">
                            <div class="projects__card">
                                <div class="projects__img">
                                    <img
                                        src="${item.img}"
                                        alt="The Coffee Shop"
                                    />
                                    <div class="overlay">
                                        <a
                                            href="${item.source}"
                                            target="_blank"
                                            class="overlay__button"
                                        >
                                            <i
                                                class="bx bxl-github overlay__icon"
                                            ></i>
                                        </a>
                                    </div>
                                </div>
                                <h3 class="projects__title">${item.name}</h3>
                                <span class="projects__button"
                                    >Details
                                    <i
                                        class="bx bx-right-arrow-alt projects__icon"
                                    ></i
                                ></span>
                                <div class="projects__modal">
                                    <div class="projects__modal-content">
                                        <i
                                            class="bx bx-x projects__modal-close"
                                        ></i>
                                        <h2 
                                            class="projects__modal-title"
                                            >${item.name}</h2>
                                        <p class="projects__modal-description">${item.description}</p>
                                        <h3 class="projects__modal-subtitle">Technologies we used</h3>
                                        <ul class="projects__modal-list">
                                            <li class="projects__modal-item">Frontend: ${item.technologies.frontend.join(", ")}
                                            </li>
                                            ${item.technologies.backend === undefined ? "" : `<li class="projects__modal-item">Backend: ${item.technologies.backend.join(", ")}
                                            </li>`}
                                            
                                        </ul>
                                        <a
                                            href="${item.source}"
                                            target="_blank"
                                            class="projects__modal-link button"
                                            >Source
                                            <i
                                                class="bx bxl-github projects__modal-icon"
                                            ></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>`;
                $('.projects__content').append(html);
            });
        });
    }
    importProjects();

    async function fetchData(type = "skills") {
        let response;
        type === "skills" ?
            response = await fetch("skills.json")
            :
            response = await fetch("http://localhost:5500/assets/data/projects.json");
        const data = await response.json();
        return data;
    }

    // $(document).on('click', '.projects__button', function (event) {
    //     const modalElement = $(this).siblings(".projects__modal");
    //     modalElement.toggleClass("active-modal");
    // });

    // $(document).on('click', '.projects__modal-close', function (event) {
    //     const parentElement = $(this).closest(".projects__modal");
    //     parentElement.removeClass("active-modal");
    // });

    /*=============== PROJECTS MODAL ===============*/
    // const modalBtns = $(".projects__button"),
    //     modalCloseBtns = $(".projects__modal-close"),
    //     modalViews = $(".projects__modal"),
    //     modalContents = $(".projects__modal-content");

    // modalBtns.click(function (event) {
    //     const modalElement = $(this).siblings(".projects__modal");
    //     modalElement.toggleClass("active-modal");

    //     // if (modalElement.hasClass("active-modal")) {
    //     //     $("body").css({
    //     //         overflow: "hidden",
    //     //     });
    //     // } else {
    //     //     $("body").css({
    //     //         overflow: "auto",
    //     //     });
    //     // }
    // });

    // modalCloseBtns.click(function (event) {
    //     const parentElement = $(this).closest(".projects__modal");
    //     parentElement.removeClass("active-modal");
    // });

    // modalContents.click(function (event) {
    //     event.stopPropagation();
    // });

    // modalViews.click(function (event) {
    //     $(this).removeClass("active-modal");
    // });

    const copyright = $(".footer__copy");
    var currentYear = new Date().getFullYear();
    var textCopyright = copyright.html(
        `<i class="bx bx-copyright footer__copy-icon"></i> ${currentYear}, HoangNB. All rights reserved`
    );
    /*=============== MIXITUP FILTER PORTFOLIO ===============*/

    /* Link active work */

    /*=============== SWIPER TESTIMONIAL ===============*/

    /*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
    const sections = $("section[id]");
    function scrollActive() {
        let windowTopOffset = $(window).scrollTop();
        sections.each(function (index, element) {
            let offsetTop = $(element).offset().top;
            let outerHeight = $(this).outerHeight(true);

            if (
                windowTopOffset > offsetTop - 56 &&
                windowTopOffset < offsetTop + outerHeight
            ) {
                let elementId = $(element).attr("id");
                // Toggle active class for menu icon
                {
                    $(".nav__link.nav__link--active").removeClass(
                        "nav__link--active"
                    );
                    $(".nav__link[href='#" + elementId + "']").addClass(
                        "nav__link--active"
                    );
                }

                // Toggle active class for menu text
                {
                    $(".nav__link-text.nav__link-text--active").removeClass(
                        "nav__link-text--active"
                    );
                    $(".nav__link-text[href='#" + elementId + "']").addClass(
                        "nav__link-text--active"
                    );
                }
            }
        });
    }
    $(window).scroll(scrollActive);
    /*=============== LIGHT DARK THEME ===============*/
    function toggleTheme() {
        const themeBtn = $("#theme-button");
        const lightTheme = "light-theme";
        const sunIconTheme = "bx-sun";

        // Previously selected to topic (if user selected)
        const selectedTheme = localStorage.getItem("selected-theme");
        const selectedIcon = localStorage.getItem("selected-icon");

        // We obtain the current theme that the interface has by validating the dark-theme class
        const getCurrentTheme = () =>
            $("body").hasClass(lightTheme) ? "light" : "dark";
        const getCurrentIcon = () =>
            themeBtn.hasClass(sunIconTheme) ? "bx bx-sun" : "bx bx-moon";

        // We validate if the user previously chosen topic
        if (selectedTheme) {
            // If the validattion is fulfilled, we ask what issue was to know if we activated or unactivated dark theme
            selectedTheme === "light"
                ? $("body").addClass(lightTheme)
                : $("body").removeClass(lightTheme);

            selectedIcon === "bx bx-sun"
                ? themeBtn.addClass(sunIconTheme)
                : themeBtn.removeClass(sunIconTheme);
        }

        // Activated / Unactivated the theme manually with the button
        themeBtn.click(function (event) {
            // Add or remove the light / icon theme
            $("body").toggleClass(lightTheme);
            $(this).toggleClass(sunIconTheme);

            // We save the theme & the current icon that the user chose
            localStorage.setItem("selected-theme", getCurrentTheme());
            localStorage.setItem("selected-icon", getCurrentIcon());
        });
    }
    /*=============== SCROLL REVEAL ANIMATION ===============*/
    function enableScrollReveal() {
        const scrollReveal = ScrollReveal({
            origin: "top",
            distance: "60px",
            duration: 2000,
            delay: 400,
            reset: true,
        });

        scrollReveal.reveal("#home");
        scrollReveal.reveal("#about");
        scrollReveal.reveal("#skills");
        scrollReveal.reveal("#projects");
        scrollReveal.reveal("#contact");
        // scrollReveal.reveal(".home__handle", { delay: 700 });
        // scrollReveal.reveal(".home__social, .home__scroll", {
        //     delay: 700,
        //     origin: "bottom",
        // });
    }
    enableScrollReveal();
    /*=============== CHANGE BACKGROUND FOR LIGHT THEME ===============*/
});
