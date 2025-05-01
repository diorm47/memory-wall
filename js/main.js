$( document ).ready(function() {

    if (location.pathname == '/materials/gallery/gallery/') {
        $('.footer').css('margin-top', '-20px');
    }

    $.Tween.propHooks.number = {
        get: function ( tween ){
            var num = tween.elem.innerHTML.replace(/^[^\d-]+/, '');
            return  parseFloat(num) || 0;
        },

        set: function( tween ) {
            var opts = tween.options;
            tween.elem.innerHTML = (opts.prefix || '')
                + tween.now.toFixed(opts.fixed || 0)
                + (opts.postfix || '');
        }
    };

    var test_ch = 0;

    setTimeout(function run() {
        if (test_ch>0) {
            test_ch--;
        }else {
            $('.social-item').toggleClass('active', false)
        }
        // console.log(test_ch);
        setTimeout(run, 100);
    }, 100);

    var anim = [];
    var animPz = [];
    var coling = $('.number-item__ch').length;
    for (i=0; i<coling; i++) {
        anim[i] = ($('#num-'+i).attr("data-val")).replace(/\s+/g, '');
        animPz[i] = $('[data-val]:eq('+i+')').offset();
    }
    $(window).scroll(function() {
        var prl = $(this).scrollTop();

        for (i=0; i<coling; i++) {
            if(prl+window.innerHeight > animPz[i].top) {
                $('#num-'+i)
                    .delay(500)
                    .animate({ number: anim[i] }, {
                        duration: 2000,
                        prefix: ''
                    })
                ;
            }
        }

        test_ch = 6
        $('.social-item').toggleClass('active', true)
    });



    if (undefined !== $('#detail-pers__alb') && $('#detail-pers__alb').length) {
        $('#detail-pers__alb').lightGallery({
            download: false,
            zoom: false,
            autoplayControls: false,
            // selector: '.detail-pers-list__gal_img',
        });
    }

    $('.placemark_slider__item').click(function(event) {
        console.log($(this));
    });

    $('#placemark_slider').mouseover(function(event) {
        console.log($(this));
        $('#placemark_slider').lightGallery({
            download: false,
            zoom: false,
            autoplayControls: false,
        });
    });

    if (undefined !== $('#placemark_slider') && $('#placemark_slider').length) {
        $('#placemark_slider').lightGallery({
            download: false,
            zoom: false,
            autoplayControls: false,
        });
        console.log('консоль видит слайдер для галереи...');
    }
    

    function calculateOffset(innerWidth, clientX, innerHeight, clientY) {
        offset_x = (2 * clientX - innerWidth) / innerWidth;
        offset_y = (2 * clientY - innerHeight) / innerHeight;
    };
    $(window).on('mousemove', function (e) {
        calculateOffset(window.innerWidth, e.clientX, window.innerHeight, e.clientY);
        $('.main-img__smoke:eq(2)').css('transform', ' translate(' + -offset_x * 3.5 + '%,' + -offset_y * 3.8 + '%)');
    });



    // стилевая добавка к последней выпадашке десктоп менюшки в шапке
        var dropdown = $('.menu-drop:last');
        // console.log(dropdown);
        var last_item_menu = $('.menu-drop:last').find('.menu-drop__item');
        // console.log(last_item_menu);
        $('.menu-drop:last').find('.menu-drop__item').css('text-align', 'right');



    // исправление багов по верстке - тех, что не получилось исправить через css, так как не перебиваются - и только для адаптива
    if ($(window).width() < 769) {
        $('.first_desc').css('margin-bottom', '15px');
    }
    if ($(window).width() < 426) {
        $('.about__title--number').attr('id', 'title--number');
    }



    //if($( window ).width() > 1024){
        //console.log("width: " + $( window ).width());
        //AOS.init();
    //}
    $('*').removeAttr('data-aos');

    $('.yearPicker').datetimepicker({
        format: "yyyy",
        autoclose: true,
        startView: "decade",
        minView: "decade",
        maxView: "decade",
        startDate: "1800",
        language: "ru",
    });

    $('input#rb1').on('click', function() {
        var $deathYear = $('input[name="odate"]');

        if($deathYear.attr('readonly')!='readonly'){
            $deathYear.val('');
            $deathYear.attr('readonly','readonly');
            $deathYear.attr('style','background-color:#D3D3D6;');
        }
        else{
            $deathYear.removeAttr('readonly');
            $deathYear.removeAttr('style');
        }
    });

    if (window.File && window.FileList && window.FileReader) {
        $("#files").on("change", function(e) {
            var files = e.target.files,
                filesLength = files.length;
            var j = 0;
            for (var i = 0; i < filesLength; i++) {
                var f = files[i]
                var fileReader = new FileReader();
                fileReader.onload = (function(e) {
                    var file = e.target;

                    var fname = files[j++].name;
                    console.log(fname);
                    $("div.b-images-prew-block").html("<span data-name=\""+fname+"\" class=\"pip\">" +
                        "<img class=\"imageThumb\" src=\"" + e.target.result + "\" />" +
                        "<br/><span class=\"remove\">Удалить</span>" +
                        "</span>" + $("div.b-images-prew-block").html());

                    $(".remove").click(function(){
                        $(this).parent(".pip").remove();
                        var rid = $(this).parent(".pip").attr('data-name');
                        var rm = $('input[name="files_remove"]').val();
                        $('input[name="files_remove"]').val(rid+"|"+rm);
                    });

                });
                fileReader.readAsDataURL(f);
            }
        });

        $("#files2").on("change", function(e) {
            var files = e.target.files,
                filesLength = files.length;
            var j = 0;
            for (var i = 0; i < filesLength; i++) {
                var f = files[i]
                var fileReader = new FileReader();
                fileReader.onload = (function(e) {
                    var file = e.target;

                    var fname = files[j++].name;
                    console.log(fname);
                    $("div.b-images-prew-block2").html("<span data-name=\""+fname+"\" class=\"pip\">" +
                        "<img class=\"imageThumb\" src=\"" + e.target.result + "\" />" +
                        "<br/><span class=\"remove\">Удалить</span>" +
                        "</span>" + $("div.b-images-prew-block2").html());

                    $(".remove").click(function(){
                        $(this).parent(".pip").remove();
                        var rid = $(this).parent(".pip").attr('data-name');
                        var rm = $('input[name="files_remove"]').val();
                        $('input[name="files_remove"]').val(rid+"|"+rm);
                    });

                });
                fileReader.readAsDataURL(f);
            }
        });
    } else {
        alert("Your browser doesn't support File API")
    }

    $('form.aj_fm').submit(function(e) {
        var $form = $(this);
        var formData = new FormData(this);
		var send = true;
		var count = 0;
		$('form.aj_fm input.req, form.aj_fm textarea.req, form.aj_fm select.req').each(function(index, el) {
			if(!$(this).val() || $(this).val() == ''){
			    $(this).css('border-color','red');
			    send = false;
				if (count == 0) {
					$('html, body').animate({
						scrollTop: $(this).offset().top
					}, 1000);
				}
				count++;
		   }
		   else{
			 $(this).css('border-color','#CCCCCC');
		   }
		});
		
		if(send)
		{
			$.ajax({
				type: $form.attr('method'),
				url: $form.attr('action'),
				data: formData,
				processData: false,
				contentType: false,
			}).done(function(response) {
				if (response==1) {
					$('#exampleModal').modal('show');

                    $(':input')
                    .not(':button, :submit, :reset, :hidden, :checkbox')
                    .val('')
                    .attr('checked')
                    .removeAttr('checked')
                    .removeAttr('selected');

                    $(':checkbox')
                    .removeAttr('checked') 
                    .prop('checked', false) 
                    .removeAttr('selected');

                    $.ajax({
                        type: $form.attr('method'),
                        url: $form.attr('action'),
                        data: formData,
                        processData: false,
                        contentType: false,
                    }).done(function(response) {
                        replaceCaptcha(response);
                    })
				} else if (response==0) {
					console.log('xss');
                    console.log('bad');
				} else {
                    replaceCaptcha(response, true);
                }
			});
		}
		e.preventDefault();
    });

    $('#reload-captcha').click(function(e) {
        var $type = $('form.aj_fm').attr('method');
        var $url = $('form.aj_fm').attr('action');
        $.ajax({
            type: $type,
            url: $url,
            data: {
                'captcha_code': '',
                'captcha_word': '',
            },
            success: function (response) {
                replaceCaptcha(response);
            }
        }).done;
    })

    /**
     * @param   {String}  code               sid of CCaptcha class instance
     * @param   {Boolean}  dueToInvalidInput  whether replacement is required due to an invalid user input or not. Default value is 'false'
     */
    function replaceCaptcha(code, dueToInvalidInput = false) {
        $('[name=captcha_code]').val(code);
        $('[name=captcha_word]').val('');
        $('#captcha_img').attr('src', '/bitrix/tools/captcha.php?captcha_code=' + code);
        if (dueToInvalidInput) {
            $('#invalid_captcha_message').removeAttr('hidden');
        } else {
            $('#invalid_captcha_message').attr('hidden', '');
        }
    }

    if ($(window).width() < 1025) {
        $('#title-search').click(function(event) {
            $(this).addClass('act');
        });
    }

    $('#search-svg').click(function () {
        $('.search-input').toggleClass('active');

        if ($(window).width() < 1025) {
            $('.link-logo').addClass('hide_for_search');
            $('.menu-pads').addClass('search_open');
        }
    });


    // скрытие меню и строки поиска при клике вне
    jQuery(function($){
        $(document).mouseup(function (e){ // событие клика по веб-документу
            var search_input = $("#title-search-input"); // тут указываем ID элемента
            if (!search_input.is(e.target) // если клик был не по нашему блоку
                && search_input.has(e.target).length === 0) { // и не по его дочерним элементам
                search_input.removeClass('active'); // скрываем его
                $('#title-search').removeClass('act');
                if ($('link-logo').hasClass('hide_for_search')) {
                    $('.link-logo').removeClass('hide_for_search');
                }
                if ($('.menu-pads').hasClass('search_open')) {
                    $('.menu-pads').removeClass('search_open');
                }
                $('.link-logo').removeClass('hide_for_search');
                $('.mmmenu').css('visibility', 'visible');
            }
        });
    });
});


jQuery(function($){

    $(document).mouseup(function (e){         
        if($('.navigation__toggle').is(e.target)) {
            $("#mobile_menu").toggleClass('show');
        } else if (!$("#mobile_menu").is(e.target)
            && $("#mobile_menu").has(e.target).length === 0 && $("#mobile_menu").hasClass('show')) {
                $("#mobile_menu").removeClass('show');
        }
    });

    $('#mobile_menu').click(function(event) {
        
        // console.log('target -', event.target);

        let point = event.target;

        if ($(point).hasClass('menu_item_parent')) {
            event.preventDefault();
        }

        if ($(point).hasClass('menu_item_link')) { // если точка - ссылка, ищем ближайшего родителя родного
            point = $(point).closest('.menu_item_parent'); // и переназначаем точку
            // console.log('point стал - menu_item_parent');
        }

        if ($(point).hasClass('menu_item_arrow')) {
            point = $(point).closest('.menu_item_parent');
        }

        if ( $(point).hasClass('open') ) {
            $(point).removeClass('open');
            $(point).children('.submenu').slideUp();
            // console.log('slideUP');
        } else {
            $(point).addClass('open');
            $(point).children('.submenu').slideDown();
            // console.log('slideDown');
        }
    });
});

$('#heroes_slider').slick({
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 2,
            }
        },
        {
            breakpoint: 551,
            settings: {
                slidesToShow: 1,
            }
        }
    ]
});

$('.projects_slider').slick({
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
        {
            breakpoint: 1051,
            settings: {
                slidesToShow: 2,
            }
        },
        {
            breakpoint: 751,
            settings: {
                slidesToShow: 1,
            }
        },
    ]
});





