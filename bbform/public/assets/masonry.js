$(document).ready(function () {
  $(".arch-slider").slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: false,
    arrows: true,
    variableWidth: true,
    prevArrow:
      '<div class="prev"><svg width="23" height="39" viewBox="0 0 23 39" style="transform: scale(1);"><path id="_250_middle_right_copy_3" data-name="250 middle right  copy 3" class="slideshow-arrow" d="M154.994,259.522L153.477,261l-18.471-18,18.473-18,1.519,1.48L138.044,243Z" transform="translate(-133 -225)"></path></svg></div>',
    nextArrow:
      '<div class="next"><svg width="23" height="39" viewBox="0 0 23 39" style="transform: scale(1);"><path id="_250_middle_right_copy_2" data-name="250 middle right  copy 2" class="slideshow-arrow" d="M857.005,231.479L858.5,230l18.124,18-18.127,18-1.49-1.48L873.638,248Z" transform="translate(-855 -230)"></path></svg></div>',
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });

  $(window).on("load resize", slederResizer);

  function slederResizer() {
    $(".slick-slide").each(function () {
      var w = 0;
      $(this)
        .find("img")
        .each(function () {
          if ($(this).width() > w) {
            w = $(this).width();
          }
        });
      $(this).css("width", w);
    });
  }
  slederResizer();

  $(".arch-slider").slickLightbox({
    itemSelector: ".arc-link",
  });
});

// Main content container
var $container = $(".arch-slider-item");

function loadmas() {
  $container.packery({
    // selector for entry content
    itemSelector: ".arc-link-wrap",
    percentPosition: true,
  });
}

// Masonry + ImagesLoaded
$container.imagesLoaded(function () {
  loadmas();
});

$(window).resize(function () {
  loadmas();
});
