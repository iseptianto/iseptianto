$(document).ready(function() {

  // with jQuery
  var $container = $('.grid').isotope({
    itemSelector: '.grid-item',
    layoutMode: 'packery',
    columnWidth: '.grid-sizer',
    packery: {
      gutter: '.gutter-sizer'
    }
  });

   //Add the class selected to the item that is clicked, and remove from the others
   var $optionSets = $('#filters'),
   $optionLinks = $optionSets.find('a');

   $optionLinks.click(function(){
   var $this = $(this);
   // don't proceed if already selected
   if ( $this.hasClass('selected') ) {
     return false;
   }
   var $optionSet = $this.parents('#filters');
   $optionSets.find('.selected').removeClass('selected');
   $this.addClass('selected');

   //When an item is clicked, sort the items.
   var selector = $(this).attr('data-filter');
   $container.isotope({ filter: selector });

   return false;
   });

  // layout Isotope after each image loads
  $container.imagesLoaded().progress( function() {
    $container.isotope('layout');
  });
  
  //****************************
  // Isotope Load more button
  //****************************
  var initShow = 15; //number of items loaded on init & onclick load more button
  var counter = initShow; //counter for load more button
  var iso = $container.data('isotope'); // get Isotope instance

  loadMore(initShow); //execute function onload

  function loadMore(toShow) {
    $container.find(".hidden").removeClass("hidden");

    var hiddenElems = iso.filteredItems.slice(toShow, iso.filteredItems.length).map(function(item) {
      return item.element;
    });
    $(hiddenElems).addClass('hidden');
    $container.isotope('layout');

    //when no more to load, hide show more button
    if (hiddenElems.length == 0) {
      jQuery("#load-more").hide();
    } else {
      jQuery("#load-more").show();
    };

  }

  //append load more button
  $container.after('<button id="load-more"> Load More</button>');

  //when load more button clicked
  $("#load-more").click(function() {
    if ($('#filters').data('clicked')) {
      //when filter button clicked, set initial value for counter
      counter = initShow;
      $('#filters').data('clicked', false);
    } else {
      counter = counter;
    };

    counter = counter + initShow;

    loadMore(counter);
  });

  //when filter button clicked
  $("#filters").click(function() {
    $(this).data('clicked', true);

    loadMore(initShow);
  });
  
  
});