const disabledElements = ['input', 'textarea', 'select'];

if(typeof document !== 'undefined') {
    document.onkeydown = function (e) {
        const eTarget = e.target || e.srcElement;
        const tagName = String(eTarget.nodeName || eTarget.tagName).toLowerCase();

        //
        if (disabledElements.includes(tagName)) {
            e.stopImmediatePropagation();
            e.stopPropagation();
            // e.preventDefault();
            // return false;
        }
    }
}
