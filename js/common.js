$(function() {


    var $window = $(window);

    //neon 불똥 관련 변수지정
    $spark = $('.neon .spark');
    $sparkSrc = $spark.attr('src');

    //sns 쉐어창 light 변수지정.
    var $light = $('.light');
    var $lightTop = $light.offset().top;
    var $winHeight = $(window).height();
    var $lightPoint = parseInt($lightTop - $winHeight / 2);

    //.coin 관련 클래스 변수 설정.
    var $coins = $('.coin');
    var $coinTop = $('.coin.top');
    var $coinTopLine1 = $coinTop.children('.line1');
    var $coinTopLine2 = $coinTop.children('.line2');
    var $coinTopLine3 = $coinTop.children('.line3');

    var $coinTopLine1Top;

    setTimeout(function() {
        $coinTopLine1Top = parseInt($coinTopLine1.css('top').replace('px', ''));
    }, 1000)

    //Popup이벤트 관련 변수 설정
    var $mainButton = $('#kakaoPromotion .mainButton');
    var $popup = $('#popup');
    var $popupTop = $('#popup .top');
    var $popupBottom = $('#popup .bottom');
    var $closeBtn = $('.closeBtn');
    var $PopupButton = $('#popup .mainButton');


    introAnimation();

    setTimeout(ImgPlaying($spark, 6, './img/', 'spark', '.png'), 500);






    //스크롤이벤트
    $window.on('scroll', function() {
        var $scrollTop = $window.scrollTop();

        //스크롤이 lightPoint 지점을 지나갈때, 이벤트
        if ($scrollTop < $lightPoint + 5 && $scrollTop > $lightPoint - 5) {
            console.log('light Point');
            $light.addClass('on');
            setTimeout(function() {
                $light.css({
                    'opacity': '1'
                });
                $light.removeClass('on');
            }, 1000)
        }


        //동전 패럴랙스
        if ($coinTopLine1Top) {
            var $topPosition1 = ((($coinTopLine1Top - $scrollTop / 10) / $winHeight) * 100) + 4;
            var $topPosition2 = ((($coinTopLine1Top - $scrollTop / 9) / $winHeight) * 100) + 8;
            $coinTopLine2.css({
                'top': $topPosition1 + '%'
            });
            $coinTopLine3.css({
                'top': $topPosition2 + '%'
            });
        }

    });


    //팝업 오픈 애니메이션
    $mainButton.on('click', function() {
        $popup.fadeIn(300);
        //상하단 팝업 스크롤업다운
        $popupTop.delay(200).animate({
            'top': '-10%'
        }, '500', 'easeOutBounce');
        $popupBottom.delay(200).animate({
            'bottom': '-10%'
        }, '500', 'easeOutBounce');

        //송금하기버튼 스크롤업
        $PopupButton.delay(500).animate({
            'bottom': '18%'
        });

    });

    //팝업 클로즈 애니메이션
    $closeBtn.on('click', function() {
        $popupTop.animate({
            'top': '-60%'
        }, '200', 'swing');

        $popupBottom.animate({
            'bottom': '-60%'
        }, '200', 'swing');

        $popup.delay(100).fadeOut();
    });

    function ImgPlaying(selector, ImgNumber, ImgPath, imgName, ext) {
        var $arrImg = [];
        var $CurrentNum = 0;

        return function() {
            selector.show();


            for (var i = 1; i < ImgNumber + 1; i++) {
                $arrImg.push(imgName + i + ext);
            }

            anim = setInterval(srcSetting, 60);

        }

        function srcSetting() {
            if ($CurrentNum === ImgNumber) {
                clearInterval(anim)
            } else {
                selector.attr('src', ImgPath + $arrImg[$CurrentNum]);
                $CurrentNum += 1;
            }
        }

    }

    function introAnimation() {
        $window.scrollTop(0);

        //초기화면 애니메이션
        $light.css({
            'opacity': '0'
        });

        $coins.addClass('on');
    }
})