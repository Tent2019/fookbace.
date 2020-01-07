$(document).ready(function() {

    let isDrop = false;
    // DROP POST
    $('#drop_post').hide();
    $('#template_unit').click(function() {

      $('.header').css('z-index',0) 
      $('.nav').css('z-index',0) 

      if(isDrop === false) {
        isDrop = true;
        let x_backdrop = $('<div></div>');
        x_backdrop.attr('class','backdrop');
        $(this).css('height','100px');
        $('#drop_post').show()   
        let x_drop_post = $('#post_unit')
        x_drop_post.css('position','absolute')               
        x_drop_post.css('z-index',1)                                      
        $('body').append(x_backdrop);     

        $('#post_unit').mouseleave(function() {
          $('#template_unit').css('height','45px');
          $('#drop_post').hide();
          x_drop_post.css('position','relative')               
          x_drop_post.css('z-index',0) 
          $('.header').css('z-index',1) 
          $('.nav').css('z-index',1) 
          x_backdrop.remove()                                     
          isDrop = false;
        })              
      } else {
        return;
      }

    });   

    // post button
    $('#post_button').mouseover(function () {
      $(this).css('background-color','gold');
        $(this).mouseleave(function() {
          $(this).css('background-color', '#ffeb99');
      })
    })

    //post_unit_drop_option_each
    $('.post_unit_drop_option_each').mouseover(function () {
      $(this).css('background-color','silver');
        $(this).mouseleave(function() {
          $(this).css('background-color', '#f2f2f2');
      })
    })
              
    // side blink 
    let x_nav_unit = $('.clickable');
    x_nav_unit.mouseover(function() {          
      $(this).css('background-color','silver');
      $(this).mouseleave(function() {
        $(this).css('background-color', '#f2f2f2');
      })
    })
    
    // head blink 
    let x_header_unit = $('.header_unit');
    x_header_unit.mouseover(function() {
      $(this).css('background-color','#ffeb99');
      $(this).mouseleave(function() {
        $(this).css('background-color', 'gold');
      })
    })

    // like & comment blink
    $('.posted_unit_extend_like').mouseover(function() {
        $(this).css('background-color','#e6e6e6');
        $(this).mouseleave(function() {
          $(this).css('background-color', 'white');
      })
    })

    $('.posted_unit_extend_comment').mouseover(function() {
        $(this).css('background-color','#e6e6e6');
        $(this).mouseleave(function() {
          $(this).css('background-color', 'white');
      })
    })
    
    // drop comment
    $('.drop_comment').hide();
    $('.posted_unit_extend_comment').click(function() {
      $('.drop_comment').show(); 
      // $('.posted_unit').mouseleave(function() {
      //   $('.drop_comment').hide(); 
      // })         
    })


    

    // !! Bug search
    $('#search_drop').hide();        
    $('#search').click(function() {          
      $('.nav').css('z-index',-1);               
      $('#search_drop').css('z-index',-1);
      $('#search_drop').show();          
      $(this).mouseleave(function() {
        $('#search_drop').hide(); 
        $('.nav').css('z-index',1);       
      })
    })

    


})

