export default ({
  state, helmet, assets, markup, isProduction
}) => `
    <!DOCTYPE html>
    <html lang="ru">
      <head>
        ${helmet.title.toString()}
        <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="apple-touch-icon" sizes="57x57" href="/assets/images/share/apple-icon-57x57.png">
        <link rel="apple-touch-icon" sizes="60x60" href="/assets/images/share/apple-icon-60x60.png">
        <link rel="apple-touch-icon" sizes="72x72" href="/assets/images/share/apple-icon-72x72.png">
        <link rel="apple-touch-icon" sizes="76x76" href="/assets/images/share/apple-icon-76x76.png">
        <link rel="apple-touch-icon" sizes="114x114" href="/assets/images/share/apple-icon-114x114.png">
        <link rel="apple-touch-icon" sizes="120x120" href="/assets/images/share/apple-icon-120x120.png">
        <link rel="apple-touch-icon" sizes="144x144" href="/assets/images/share/apple-icon-144x144.png">
        <link rel="apple-touch-icon" sizes="152x152" href="/assets/images/share/apple-icon-152x152.png">
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/images/share/apple-icon-180x180.png">
        <link rel="icon" type="image/png" sizes="192x192"  href="/assets/images/share/android-icon-192x192.png">
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/images/share/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="96x96" href="/assets/images/share/favicon-96x96.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/images/share/favicon-16x16.png">
        <link rel="manifest" href="/manifest.json">
        <meta name="msapplication-TileColor" content="#ffffff">
        <meta name="msapplication-TileImage" content="/assets/images/share/ms-icon-144x144.png">
        <meta name="theme-color" content="#5e9cdf">
        <meta name="mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-capable" content="yes">
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
        <link rel='stylesheet' href='${assets.css}' />
        ${isProduction ? (`
        <style>.async-hide { opacity: 0 !important} </style>
        <script>(function(a,s,y,n,c,h,i,d,e){s.className+=' '+y;h.start=1*new Date;
        h.end=i=function(){s.className=s.className.replace(RegExp(' ?'+y),'')};
        (a[n]=a[n]||[]).hide=h;setTimeout(function(){i();h.end=null},c);h.timeout=c;
        })(window,document.documentElement,'async-hide','dataLayer',4000,
        {'CONTAINER_ID':'GTM-MWRLXHK'});</script>
        `) : ''}
        ${isProduction ? (`
        <!-- Google Tag Manager -->
        <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-WRCWZ3F');</script>
        <!-- End Google Tag Manager -->
        
        `) : ''}
       
      </head>
      <body>
      <!-- Yandex.Metrika counter -->
<script type="text/javascript" >
   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(${process.env.YANDEX_METRIKA_ID}, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        webvisor:true,
        ecommerce:"dataLayer"
   });
</script>
<noscript><div><img src="https://mc.yandex.ru/watch/${process.env.YANDEX_METRIKA_ID}" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
<!-- /Yandex.Metrika counter -->
        <script>
          window.destraMode = "${(process.env.MODE).toString()}";
          window.metrikaId = ${process.env.YANDEX_METRIKA_ID};
          window.dataLayer = window.dataLayer || [];
        </script>
        ${isProduction ? (
    `<!-- Google Tag Manager (noscript) -->
          <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WRCWZ3F"
          height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
          <!-- End Google Tag Manager (noscript) -->`
  ) : ''}
        ${isProduction ? (
    `<script>
            function gtag_report_conversion(url) {
              var callback = function () {
                if (typeof(url) != 'undefined') {
                  window.location = url;
                }
              };
              gtag('event', 'conversion', {
                'send_to': 'AW-996412873/5Z2zCNmD_sYBEMmbkNsD',
                'event_callback': callback
              });
              return false;
            }
          </script>`
  ) : ''}
        <div id='boot'>${markup}</div>
        <script>window.__STATE__ = ${JSON.stringify(state)}</script>
        <script src='${assets.js}'></script>
        <script type="application/ld+json">
          {
            "@context" : "http://schema.org",
            "@type" : "Organization",
            "name" : "Destra",
            "url" : "https://destralegal.ru/",
            "sameAs" : [
              "https://vk.com/destralegal",
              "https://www.instagram.com/destra_legal/"
            ]
          }
        </script>
        <script type="application/ld+json">
          {
            "@context": "http://schema.org",
            "@type": "Organization",
            "url": "https://destralegal.ru/",
            "logo": "https://destralegal.ru/assets/images/share/logo.svg"
          }
        </script>
        ${isProduction ? (
    `<!-- Facebook Pixel Code -->
          <script>
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '647270772410722');
          fbq('track', 'PageView');
          </script>
          <noscript><img height="1" width="1" style="display:none"
          src="https://www.facebook.com/tr?id=647270772410722&ev=PageView&noscript=1"
          /></noscript>
        <!-- End Facebook Pixel Code -->`
  ) : ''}
        ${isProduction ? (
    `<!-- Chatra {literal} -->
          <script>
            ChatraSetup = {
              onInit: function () {
                ChatraSetup._titleBlink = function () {};
              }
            }
          </script>
          <script>
            window.ChatraSetup = {
                colors: {
                    buttonText: '#ffffff', /* цвет текста кнопки чата */
                    buttonBg: '#1EC28C'    /* цвет фона кнопки чата */
                }
            };
          </script>
          <script>
            (function(d, w, c) {
              w.ChatraID = 'KCCTybqDT6Z97K23w';
              var s = d.createElement('script');
              w[c] = w[c] || function() {
                  (w[c].q = w[c].q || []).push(arguments);
              };
              s.async = true;
              s.src = 'https://call.chatra.io/chatra.js';
              if (d.head) d.head.appendChild(s);
            })(document, window, 'Chatra');
          </script>
          <!-- /Chatra {/literal} -->`
  ) : ''}
        <script src="https://kassa.yandex.ru/checkout-ui/v2.js"></script>
      </body>
    </html>
  `;
