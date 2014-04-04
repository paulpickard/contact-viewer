(function(){

  'use strict';

  var api_key = 'appydays';

  var contacts = [];

  var contact;

  function getContacts(callback){

    $.get( 'http://contacts.tinyapollo.com/contacts?key=' + api_key, function(data){
      contacts = data.contacts;

      callback();
    });

  }

  function saveContact(callback){

    if ( contact ) {

      $.ajax({
        url: 'http://contacts.tinyapollo.com/contacts/' + contact._id + '?key=' + api_key,
        method: 'PUT',
        data: {
          name: contact.name,
          title: contact.title,
          email: contact.email,
          phone: contact.phone,
          twitterId: contact.twitter
        },
        success: function(){
          callback();
        }
      });

    }

  };

  $( document ).on( 'pagebeforeshow', '#home', function(){
    getContacts(function(){
      var contact_list = $( '#contact_list' );

      contact_list.empty();

      for ( var i in contacts ) {
        var a = $( '<a href="#show">' + contacts[i].name + '</a>' ).data( 'contact', contacts[i] );

        contact_list.append( $( '<li></li>' ).append( a ) );
      }

      contact_list.listview( 'refresh' );
    });
  });

  $( document ).on( 'click', '#contact_list a', function(e){
    contact = $( this ).data( 'contact' );
  });

  $( document ).on( 'pagebeforeshow', '#show', function(e, ui){
    if ( !contact ) {
      $.mobile.navigate( '#home' );
      return;
    }

    $( '#show_title' ).text( contact.title );
    $( '#show_name' ).text( contact.name );
    $( '#show_phone' ).text( contact.phone );
    $( '#show_email' ).text( contact.email );
    $( '#show_twitter' ).text( contact.twitter );
  });

  $( document ).on( 'pagebeforeshow', '#edit', function(e, ui){
    console.log( contact );

    if ( !contact ) {
      $.mobile.navigate( '#home' );
      return;
    }

    $( '#edit_title' ).val( contact.title ).selectmenu( 'refresh' );
    $( '#edit_name' ).val( contact.name );
    $( '#edit_phone' ).val( contact.phone );
    $( '#edit_email' ).val( contact.email );
    $( '#edit_twitter' ).val( contact.twitter );
  });

  $( document ).on( 'submit', '#edit_form', function(e){
    e.preventDefault();

    contact.title = $( '#edit_title' ).val();
    contact.name = $( '#edit_name' ).val();
    contact.phone = $( '#edit_phone' ).val();
    contact.email = $( '#edit_email' ).val();
    contact.twitter = $( '#edit_twitter' ).val();

    saveContact(function(){
      $.mobile.navigate( '#home' );
    });
  });

})();