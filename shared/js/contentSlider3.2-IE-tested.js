var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

$(document).ready(function(){
		
// ********************************************************************************* DO NOT EDIT ********************************************************************************* //
	
	// GLOBAL VARIABLES - DO NOT CHANGE
	var currentPosition = $(".slidesContainer > li").index($(".first"));
	var slidesContainerWidth = $(".slidesContainer").width();	
	var slidesTotal = $(".slidesContainer > li").length;
	var autoSlide;
	var restartSlideDelay = autoSlideDelay;
	var selectorClasses = selectorLinkClasses;
	var pauseActivated = false;
	var playActivated = false;
	
	//IE6 ADJUSTMENTS
	$(".slidesContainer > li").addClass("slide");  		// B/C IE6 DOES NOT LIKE CHILD SELECTORS
	$(".slideSelectors > li").addClass("selector");		// B/C IE6 DOES NOT LIKE CHILD SELECTORS
	
	$("a, .control").hover(function(){					// B/C IE6 DOES NOT A TAGS WITHOUT AN HREF OR RESPECT :HOVER
		$(this).css({"cursor":"pointer"});
	});
	
	// ADD selectorClasses TO .first SLIDE'S SELECTOR LINK
	var selectorClassStart = $(".first").attr("id");
	$(".slideSelectors > li a[rel=#" + selectorClassStart + "]").addClass(selectorClasses);
	
	// SLIDE FROM OPTIONS ("left" || "right")
	if(slideFromThe == "right"){
	
		slideDirection = -slidesContainerWidth;	
	
	} else if(slideFromThe == "left"){
	
		slideDirection = slidesContainerWidth;
		
	}
	
	// INITIAL SLIDE POSTIONS
	$(".slidesContainer > li").css({"left": slideDirection });
	$(".first").css({"left": "0" });
	
	// FUNCTION - NEXT SLIDE
	function slideNext() {
		
		var currentSlide = $(".slidesContainer > li").eq(currentPosition);
		
		
		
		$(currentSlide).
			animate({
				"left":slideDirection
			}).
			next("li").
				css({
					"left":-slideDirection
				}).
				animate({
					"left":"0"
				});
		
		if(currentPosition == slidesTotal-1){
			
			$(".slidesContainer > li").
				eq(0).
				css({
					"left":-slideDirection
				}).
				animate({
					"left":"0"
				});
			
			currentPosition = 0;
			
			// CHANGE BACKGROUNDS OF THE NEXT .slideSelector li
			var getNextID = $(".slidesContainer > li").eq(currentPosition).attr("id");
	
			$(".slideSelectors > li a").removeClass(selectorClasses);
		
			$(".slideSelectors > li a[rel=#" + getNextID + "]").addClass(selectorClasses);
			
		} else {
			
			currentPosition++;
			
			// CHANGE BACKGROUNDS OF THE NEXT .slideSelector li
			var getNextID = $(currentSlide).next("li").attr("id");
			
			$(".slideSelectors > li a").removeClass(selectorClasses);
		
			$(".slideSelectors > li a[rel=#" + getNextID + "]").addClass(selectorClasses);
		
		}
	} // END FUNCTION
	
	
	// FUNCTION - PREVIOUS SLIDE
	function slidePrev() {
		
		var currentSlide = $(".slidesContainer > li").eq(currentPosition);
		
		$(currentSlide).
			animate({
				"left":-slideDirection
			}).
			prev("li").
				css({
					"left":slideDirection
				}).
				animate({
					"left":"0"
				});
		
		if(currentPosition == 0){
			
			$(".slidesContainer > li").
				eq(slidesTotal-1).
				css({
					"left":slideDirection
				}).
				animate({
					"left":"0"
				});
			
			currentPosition = slidesTotal-1;
			
			// CHANGE BACKGROUNDS OF THE PREVIOUS .slideSelector li
			var getPreviousID = $(".slidesContainer > li").eq(slidesTotal-1).attr("id");
		
			$(".slideSelectors > li a").removeClass(selectorClasses);
		
			$(".slideSelectors > li a[rel=#" + getPreviousID + "]").addClass(selectorClasses);
			
		} else {
			
			currentPosition--;
			
			// CHANGE BACKGROUNDS OF THE PREVIOUS .slideSelector li
			var getPreviousID = $(currentSlide).prev("li").attr("id");
			
			$(".slideSelectors > li a").removeClass(selectorClasses);
		
			$(".slideSelectors > li a[rel=#" + getPreviousID + "]").addClass(selectorClasses);
		
		}
		
		
	}// END FUNCTION - 'Previous' Button
	
	// FUNCTION - 'Slide Selectors' Button
	$(".slideSelectors a").click(function(){
		
		if(autoSlideIs == "on" ){
			clearInterval(autoSlide);
		}
		
		var currentSlide = $(".slidesContainer > li").eq(currentPosition);
		var mySlide = $(this).attr("rel");
		var mySlidePosition = $(".slidesContainer > li").index($(mySlide));
		
		if(currentPosition==mySlidePosition){
			return false;
		} else {
		
			$(mySlide).
				css({
					"left":-slideDirection
				}).
				animate({
					"left":"0"
				});
			
			$(currentSlide).
				animate({
					"left":slideDirection	
				});
				
			currentPosition = mySlidePosition;
			
			// CHANGE BACKGROUNDS OF THE NEXT .slideSelector li
		
			$(".slideSelectors > li a").removeClass(selectorClasses);
		
			$(this).addClass(selectorClasses);
		
		}
		
	}); // END FUNCTION
	
	// START AUTO SLIDE
	if(autoSlideIs == "on" ){
		autoSlide = setInterval(function(){
			slideNext();
		}, autoSlideDelay);
	}else if(autoSlideIs == "off" ){
		autoSlide;	
	}
	
	// ADD FUNCTION  - Next Button
	$("#next").click(function(){
		
		slideNext();
		
	});
	
	// ADD FUNCTION - Previous Button
	$("#previous").click(function(){
		
		slidePrev();
		
	});
	
	// ADD FUNCTION  - Pause Button
	$("#pause").click(function(){
		
		pauseActivated = true;
		
		if(autoSlideIs == "on" ){
			clearInterval(autoSlide);
		}
		
	});
	
	// ADD FUNCTION - Play Button
	$("#play").click(function(){
		
		pauseActivated = false;
		
		if(autoSlideIs == "on" ){
			autoSlide =	setInterval(function(){
				slideNext();
			}, autoSlideDelay);
		}
		
	});
	
	// SHOW || HIDE PAUSE & PLAY BUTTONS IF OPTION IS ON || OFF
	if(autoSlideIs == "on" ){
		$("#play, #pause").show();
	}else if(autoSlideIs == "off" ){
		$("#play, #pause").hide();
	}
	
});

}
/*
     FILE ARCHIVED ON 02:42:25 Oct 08, 2014 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 19:29:04 Dec 19, 2023.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 118.463
  exclusion.robots: 0.067
  exclusion.robots.policy: 0.058
  cdx.remote: 0.079
  esindex: 0.01
  LoadShardBlock: 85.052 (3)
  PetaboxLoader3.datanode: 324.935 (4)
  load_resource: 842.142
  PetaboxLoader3.resolve: 561.714
*/