(function ($) {
    'use strict';

	/* ================================
       Smooth Scroller And Title Animation Js Start
    ================================ */
    if ($('#smooth-wrapper').length && $('#smooth-content').length) {
        gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

        gsap.config({
            nullTargetWarn: false,
        });

        let smoother = ScrollSmoother.create({
            wrapper: "#smooth-wrapper",
            content: "#smooth-content",
            smooth: 2,
            effects: true,
            smoothTouch: 0.1,
            normalizeScroll: false,
            ignoreMobileResize: true,
        });
    }

	 /* ================================
       Text Anim Js Start
    ================================ */

      if (
    typeof SplitText !== "undefined" &&
        document.querySelectorAll(".split-title").length > 0
        ) {
    document.querySelectorAll(".split-title").forEach((title) => {

        // split by words + chars (IMPORTANT)
        const split = new SplitText(title, {
        type: "words,chars"
        });

        // add class to chars
        split.chars.forEach((char) => {
        char.classList.add("char");
        });

        // GSAP animation
        gsap.to(split.chars, {
        scrollTrigger: {
            trigger: title,
            start: "top 90%",
            toggleActions: "play none none none"
        },
        duration: 0.8,
        clipPath: "inset(0% 0% -15% 0%)",
        x: 0,
        opacity: 1,
        ease: "power4.out",
        stagger: 0.03
        });

    });
    }

     if ($(".wa_title_spilt_1").length) {

    gsap.registerPlugin(SplitText, ScrollTrigger);

    document.querySelectorAll(".wa_title_spilt_1").forEach((atEl) => {

        const atSplit = new SplitText(atEl, {
            type: "words,chars",
            wordsClass: "word",
            charsClass: "char",
        });

        let atDuration = parseFloat(atEl.getAttribute("data-speed")) || 0.6; 
        let atDelay = parseFloat(atEl.getAttribute("data-delay")) || 0;

        if (window.innerWidth <= 768) {
            atDuration = atDuration * 0.5; 
        }

        gsap.set(atSplit.words, {
            willChange: "transform",
            perspective: 1000,
            transformStyle: "preserve-3d",
        });

        gsap.set(atSplit.chars, {
            willChange: "transform",
            opacity: 0,
            rotateX: -80,
            transformOrigin: "center center -10px",
        });

        gsap.set(atEl, {
            perspective: 1000,
            transformStyle: "preserve-3d",
        });

        gsap.to(atSplit.chars, {
            scrollTrigger: {
                trigger: atEl,
                start: "top 85%", 
            },
            opacity: 1,
            rotateX: 0,
            duration: atDuration,
            delay: atDelay,
            ease: "power2.out", 
            stagger: {
                each: 0.025, 
                from: "center",
            },
        });

    });

    }

     if (typeof gsap !== "undefined") {
          gsap.registerPlugin(ScrollTrigger, SplitText);

          let mm = gsap.matchMedia();

          mm.add("(min-width: 1200px)", () => {

              let splits = [];

              // ===== tz-sub-tilte =====
              $('.tz-sub-tilte').each(function (index, el) {

              let split = new SplitText(el, {
                  type: "lines,words,chars",
                  linesClass: "split-line"
              });

              splits.push(split);

              gsap.set(split.chars, {
                  opacity: 0,
                  x: 7
              });

              gsap.to(split.chars, {
                  scrollTrigger: {
                  trigger: el,
                  start: "top 90%",
                  end: "top 60%",
                  scrub: 1
                  },
                  x: 0,
                  opacity: 1,
                  duration: 0.7,
                  stagger: 0.2
              });
              });

              // ===== tz-itm-title =====
              $('.tz-itm-title').each(function (index, el) {

              let split = new SplitText(el, {
                  type: "lines,words,chars",
                  linesClass: "split-line"
              });

              splits.push(split);

              gsap.set(split.chars, {
                  opacity: 0.3,
                  x: -7
              });

              gsap.to(split.chars, {
                  scrollTrigger: {
                  trigger: el,
                  start: "top 92%",
                  end: "top 60%",
                  scrub: 1
                  },
                  x: 0,
                  opacity: 1,
                  duration: 0.7,
                  stagger: 0.2
              });
              });

              // ðŸ”¥ MOST IMPORTANT PART
              ScrollTrigger.refresh();

              // ðŸ”¥ cleanup on breakpoint change
              return () => {
              splits.forEach(split => split.revert());
              ScrollTrigger.getAll().forEach(st => st.kill());
              };

          });
    }

     gsap.utils.toArray('.tm-gsap-animate-circle').forEach((el, index) => {
        let arspin = gsap.timeline({
            scrollTrigger: {
                trigger: el,
                scrub: 1,
                start: "top 100%",
                end: "top -50%",
                toggleActions: "play none none reverse",
                markers: false
            }
        })

        arspin
        .set(el, {transformOrigin: 'center center'})
        .fromTo(el, { rotate: 0}, { rotate: 180, duration: 2, immediateRender: false})
    });


    initRipples();

    /*=============================================
        =              Ripples Init               =
    =============================================*/
    function initRipples() {

        $(".ripple-image").each(function () {

            var $container = $(this);
            var $img = $container.find("img").first();

            if (!$img.length) return;

            var img = new Image();
            img.src = $img.attr("src");

            img.onload = function () {

                var imgURL = img.src;

                $container.css({
                    "background-image": "url(" + imgURL + ")",
                    "background-size": "cover",
                    "background-position": "center center"
                });

                if (typeof $container.ripples === "function") {
                    $container.ripples({
                        resolution: 400,
                        perturbance: 0.03,
                        imageUrl: imgURL
                    });
                }

                $img.hide();
            };

        });
    }

    document.addEventListener("DOMContentLoaded", () => {
  const initialClipPaths = [
    "polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)",
    "polygon(33.33% 0%, 33.33% 0%, 33.33% 0%, 33.33% 0%)",
    "polygon(65.66% 0%, 66.66% 0%, 66.66% 0%, 66.66% 0%)",
    "polygon(0% 33.33%, 0% 33.33%, 0% 33.33%, 0% 33.33%)",
    "polygon(33.33% 33.33%, 33.33% 33.33%, 33.33% 33.33%, 33.33% 33.33%)",
    "polygon(65.66% 33.33%, 66.66% 33.33%, 66.66% 33.33%, 66.66% 33.33%)",
    "polygon(0% 66.66%, 0% 66.66%, 0% 66.66%, 0% 66.66%)",
    "polygon(33.33% 66.66%, 33.33% 66.66%, 33.33% 66.66%, 33.33% 66.66%)",
    "polygon(65.66% 66.66%, 66.66% 66.66%, 66.66% 66.66%, 66.66% 66.66%)",
  ];

  const finalClipPaths = [
    "polygon(0% 0%, 34.33% 0%, 34.33% 34.33%, 0% 34.33%)",
    "polygon(32.33% 0%, 66.66% 0%, 66.66% 33.33%, 33.33% 34.33%)",
    "polygon(65.66% 0%, 100% 0%, 100% 33.33%, 65.66% 34.33%)",
    "polygon(0% 33.33%, 33.33% 33.33%, 33.33% 66.66%, 0% 66.66%)",
    "polygon(30.33% 33.33%, 66.66% 33.33%, 66.66% 66.66%, 33.33% 66.66%)",
    "polygon(65.66% 33.33%, 100% 32.33%, 100% 66.66%, 65.66% 66.66%)",
    "polygon(0% 65.66%, 33.33% 66.66%, 33.33% 100%, 0% 100%)",
    "polygon(30.33% 66.66%, 66.66% 65.66%, 66.66% 100%, 33.33% 100%)",
    "polygon(65.66% 66.66%, 100% 65.66%, 100% 100%, 65.66% 100%)",
  ];

  // Create mask divs for each wrapper
  document.querySelectorAll(".clip-animation").forEach((wrapper) => {
    const img = wrapper.querySelector(
      ".clip-animation-img[data-animate='true']",
    );
    if (!img) return;
    const url = img.src;

    // Remove old masks if any (reuse safe)
    wrapper.querySelectorAll(".mask").forEach((m) => m.remove());

    for (let i = 0; i < 9; i++) {
      const mask = document.createElement("div");
      mask.className = `mask mask-${i + 1}`;
      Object.assign(mask.style, {
        backgroundImage: `url(${url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "absolute",
        inset: "0",
      });
      wrapper.appendChild(mask);
    }
  });

  // Animate masks
  gsap.utils.toArray(".clip-animation").forEach((wrapper) => {
    const masks = wrapper.querySelectorAll(".mask");
    if (!masks.length) return;

    gsap.set(masks, { clipPath: (i) => initialClipPaths[i] });

    const order = [
      [".mask-1"],
      [".mask-2", ".mask-4"],
      [".mask-3", ".mask-5", ".mask-7"],
      [".mask-6", ".mask-8"],
      [".mask-9"],
    ];

    const tl = gsap.timeline({
      scrollTrigger: { trigger: wrapper, start: "top 75%" },
    });

    order.forEach((targets, i) => {
      const validTargets = targets
        .map((c) => wrapper.querySelector(c))
        .filter((el) => el); // filter out nulls

      if (validTargets.length) {
        tl.to(
          validTargets,
          {
            clipPath: (j, el) => finalClipPaths[Array.from(masks).indexOf(el)],
            duration: 1,
            ease: "power4.out",
            stagger: 0.1,
          },
          i * 0.125,
        );
      }
    });
  });
});

  
     /* ================================
       Service Panel Js Start
    ================================ */

	  gsap.registerPlugin(ScrollTrigger);

    let mm = gsap.matchMedia();

    mm.add("(min-width: 1200px)", () => {

    document.querySelectorAll(".scale-up-img").forEach((section) => {

        let tl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom center",
            scrub: 1,
            markers: false,
        }
        });

        tl.to(section.querySelector(".scale-up"), {
        scale: 1.15,
        duration: 1,
        ease: "none"
        });

    });

    });
	

})(jQuery);

