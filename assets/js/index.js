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

    window.addEventListener("scroll", scrollHeader);

    /*=============== PROJECTS MODAL ===============*/
    const modalBtns = $(".projects__button"),
        modalCloseBtns = $(".projects__modal-close"),
        modalViews = $(".projects__modal"),
        modalContents = $(".projects__modal-content");

    modalBtns.click(function (event) {
        const modalElement = $(this).siblings(".projects__modal");
        modalElement.addClass("active-modal");
    });

    modalCloseBtns.click(function (event) {
        const parentElement = $(this).closest(".projects__modal");
        parentElement.removeClass("active-modal");
    });

    modalContents.click(function (event) {
        event.stopPropagation();
    });

    modalViews.click(function (event) {
        $(this).removeClass("active-modal");
    });

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
                $(".nav__link.active").removeClass("active");
                $(".nav__link[href='#" + elementId + "']").addClass("active");
            }
        });
    }
    $(window).scroll(scrollActive);
    /*=============== LIGHT DARK THEME ===============*/
    function toggleTheme() {
        const themeBtn = $("#theme-button");
        const lightTheme = "light-theme";
        const sunIconTheme = "bx-sun";
        const darkIconTheme = "bx-moon";

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

    /*=============== CHANGE BACKGROUND FOR LIGHT THEME ===============*/
});
