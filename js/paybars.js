$(document).ready(function(){

	$(document).on('click','.payer span',function(){
		var form = $(this).attr('data-form');
		var el = $(this).attr('data-swap');
		
		if ( !$(this).hasClass('active') ){
			$('.pay-form').removeClass('active');
			$(form).addClass('active');
			$('.payer span').removeClass('active');
			$(this).addClass('active');
			$('.swap-el').removeClass('active');
			$(el).addClass('active');
			payResize();
		}
	});

	$('input,textarea').on('input',function(){
		var valid = true;
		$(this).removeClass('error');
		$(this).parents('form').find('.b-input').each(function(){
			if ( $(this).find('input').length ){
				if ( !$(this).find('input').val().length ){
					valid = false;
				}
			} else {
				if ( !$(this).find('textarea').val().length ){
					valid = false;
				}
			}
		});
		if (valid){
			$(this).parents('form').find('.form-btn').removeClass('active');
			$(this).parents('form').find('.submit-btn').addClass('active');
		} else {
			$(this).parents('form').find('.form-btn').addClass('active');
			$(this).parents('form').find('.submit-btn').removeClass('active');
		}
	});

	$(document).on('submit','form',function(){
		var valid = true;
		$(this).find('.b-input').each(function(){
			if ( $(this).find('input').length ){
				if ( !$(this).find('input').val().length ){
					valid = false;
					$(this).find('input').addClass('error');
				}
			} else {
				if ( !$(this).find('textarea').val().length ){
					valid = false;
					$(this).find('textarea').addClass('error');
				}
			}
		});
		if (!valid){
			return false;
		}
	});

	$('.b-select select').on('focus',function(){
		$(this).parents('.b-select').addClass('focus');
	});

	$('.b-select select').on('blur',function(){
		$(this).parents('.b-select').removeClass('focus');
	});

	$('.b-select select').on('change',function(){
		$(this).blur();
	});

	function inputId(){
		var i = 0;
		$('.b-input').each(function(){
			i++;
			$(this).find('label').attr('for','inp-'+i);
			if ( $(this).find('input').length ){
				$(this).find('input').attr('id','inp-'+i);
			} else {
				$(this).find('textarea').attr('id','inp-'+i);
			}
		});
	}
	inputId();

	function selectId(){
		var i = 0;
		$('.b-select').each(function(){
			i++;
			$(this).find('label').attr('for','select-'+i);
			$(this).find('select').attr('id','select-'+i);
		});
	}
	selectId();

	function payResize(){
		var ph = $('.pay-fix').outerHeight();
		if ( $(window).width() > 768 ){
			$('.pay-wrap').css('min-height',ph);
		} else {
			$('.pay-wrap').css('min-height','auto');
		}
	}

	function fixScroll(){
		payResize();
		if ( $(window).width() > 768 ) {
			var vg = $('.pay-fix').parents('.pay-wrap').offset().top - 90;
			var ng = vg + $('.pay-fix').parents('.pay-wrap').outerHeight() - $('.pay-fix').outerHeight();
			var st = $(window).scrollTop();

			if ( st > vg ) {
				if ( st > ng ) {
					$('.pay-fix').removeClass('scroll');
					$('.pay-fix').addClass('bottom');
				} else {
					$('.pay-fix').addClass('scroll');
					$('.pay-fix').removeClass('bottom');
				}
			} else {
				$('.pay-fix').removeClass('scroll');
				$('.pay-fix').removeClass('bottom');
			}
		} else {
			$('.pay-fix').removeClass('scroll');
			$('.pay-fix').removeClass('bottom');
		}
	}
	fixScroll();

	$(window).on('scroll',function(){
		fixScroll();
	});
	$(window).resize(function(){
		fixScroll();
	});

});