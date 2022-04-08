//

'use strict';

(function () {

    let navigationItem = document.getElementById('weitere-leistungen');
    let navigationItemTarget = document.getElementById('weitere-leistungen-ziel');
    let navigationItemTriangle = document.getElementById('weitere-leistungen-dreieck');
    if (navigationItem !== null && navigationItemTarget !== null && navigationItemTriangle !== null) {
        navigationItem.addEventListener('click', function (event) {
            if (navigationItemTarget.classList.contains('hidden')) {
                navigationItemTarget.classList.remove('hidden');
                navigationItemTriangle.classList.remove('rotate-90');
                navigationItemTriangle.classList.add('-rotate-90');
            } else {
                navigationItemTarget.classList.add('hidden');
                navigationItemTriangle.classList.remove('-rotate-90');
                navigationItemTriangle.classList.add('rotate-90');
            }
        });
    }

    let burgerItem = document.getElementById('burger');
    let burgerItemTarget = document.getElementById('burger-ziel');
    if (burgerItem !== null && burgerItemTarget !== null) {
        burgerItem.addEventListener('click', function (event) {
            burgerItemTarget.classList.contains('hidden') ? burgerItemTarget.classList.remove('hidden') : burgerItemTarget.classList.add('hidden');
        })
    }

})();
