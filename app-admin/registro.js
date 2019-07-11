if ('serviceWorker' in navigator)
{
    navigator.serviceWorker
             .register('./servico.js')
             .then(function() {
                 console.log('Service worker resgistered!');
             });
}