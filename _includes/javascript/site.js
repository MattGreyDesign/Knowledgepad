{% include /javascript/_tilt.jquery.min.js %}
{% include /javascript/_isotope.js %}

// quick search regex
var qsRegex;
var buttonFilter;

// init Isotope
var $isotopeGrid = $('.isotopeGrid').isotope({
  itemSelector: '.resource-tile-sort',
  layoutMode: 'masonry',
  filter: function() {
    var $this = $(this);
    var searchResult = qsRegex ? $this.text().match( qsRegex ) : true;
    var buttonResult = buttonFilter ? $this.is( buttonFilter ) : true;
    return searchResult && buttonResult;
  }
});

$('#categoryFilters').on( 'click', 'button', function() {
  buttonFilter = $( this ).attr('data-filter');
  $isotopeGrid.isotope();
});

// use value of search field to filter
var $quicksearch = $('#quicksearch').keyup( debounce( function() {
  qsRegex = new RegExp( $quicksearch.val(), 'gi' );
  $isotopeGrid.isotope();
}) );

// change is-checked class on buttons
$('.button-toggle-group').each( function( i, buttonGroup ) {
  var $buttonGroup = $( buttonGroup );
  $buttonGroup.on( 'click', 'button', function() {
    $buttonGroup.find('.button-toggle--is-checked').removeClass('button-toggle--is-checked');
    $( this ).addClass('button-toggle--is-checked');
  });
});

$isotopeGrid.on( 'arrangeComplete', function( event, filteredItems ) {
    //console.log( filteredItems.length );
    if(filteredItems.length == 0){
      $(".no-results").show();
    }else{
      $(".no-results").hide();
    }
});

// debounce so filtering doesn't happen every millisecond
function debounce( fn, threshold ) {
  var timeout;
  return function debounced() {
    if ( timeout ) {
      clearTimeout( timeout );
    }
    function delayed() {
      fn();
      timeout = null;
    }
    setTimeout( delayed, threshold || 100 );
  };
}

// Hover tilt effect
$('.js-tilt').tilt({
  maxTilt: 3,
  glare: true,
  maxGlare: .1,
  scale: 1.02
})
