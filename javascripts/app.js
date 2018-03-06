'use strict'

// Import node modules.
import 'babel-polyfill'
import DocReady from 'es6-docready'
import $ from 'jquery'
import 'jquery-ui-bundle'
import Foundation from 'foundation-sites'
import Vue from 'vue/dist/vue.js'
import AOS from 'aos'
import axios from 'axios'

// Must wait until DOM is ready before initiating the modules.
DocReady(async () => {
  console.log("DOM is ready. Let's party")

  // Render template with Vue.
  // Get specimen json.
  var element = document.getElementById('vue-specimen')
  if (element !== null) {
    var getData = await axios.get('./data-specimen.json')
    var specimen = new Vue({
      el: '#vue-specimen',
      data: {
        items: getData.data
      }
    })
  }

  // Initiate foundation.
  // Must do it after Vue has rendered the view.
  $(document).foundation()

  // Scroll up.
  var scrollUp = $('.button-arrow-up')
  scrollUp.click(function () {
    // Must add 'html' to the target for Firefox.
    $('body, html').animate({ scrollTop: 0 },
        600,
        'easeOutExpo',
      function () {
          //
      })
    return false
  })

  // Scale the cell item.
  $('.cell-item a').on('click', function(event) {
    event.preventDefault()
    var $this = $(this)
    var parent = $this.closest('.cell')
    var context = $this.closest('.row')

    parent.addClass('large-6 active').removeClass('large-3')
    parent.siblings('.cell').addClass('large-2').removeClass('large-3 large-6 active')
    context.siblings('.row-scale').find('.cell').addClass('large-3').removeClass('large-2 large-6 active')

    $('html, body').animate({
      scrollTop: $(this).offset().top - 225 // Create white space & ensure item is always centered in viewport
    }, '', function() {
      //
    })
  })

  // Reset scaled items.
  $('.row-scale').on('click', function(event) {
    // Stop the click event propagating to the child elements.
    if (event.target !== this) {
      return
    }
    console.log('reset scale.')

    // Look for all .row-scale and reset.
    $('.row-scale').find('.cell').addClass('large-3').removeClass('large-2 large-6 active')
    return false
  })

  // Make sure item is always centered in viewport when you click on the flex item.
  $('.flex-item a').on('click', function(event) {
    event.preventDefault()
    $('html, body').animate({
      scrollTop: $(this).offset().top - 225
    }, '', function() {
      //
    })
  })

  // Get Z Foundation media query screen size.
  // http://foundation.zurb.com/sites/docs/javascript-utilities.html#mediaquery
  function getZFcurrentMediaQuery () {
    return Foundation.MediaQuery.current
  }

  window.addEventListener('resize', () => {
    var current = getZFcurrentMediaQuery()
    console.log('Screen size: ' + current)
  })

  // https://stackoverflow.com/questions/10328665/how-to-detect-browser-minimize-and-maximize-state-in-javascript
  document.addEventListener('visibilitychange', () => {
    console.log(document.hidden, document.visibilityState)
  }, false)

  // AOS scroll reveal.
  // http://michalsnik.github.io/aos/
  // https://css-tricks.com/aos-css-driven-scroll-animation-library/
  AOS.init({
      duration: 1200,
  })
})
