function getCSRFToken(name) {
    /**
    * Django AJAX CSRF token script
    * https://docs.djangoproject.com/en/3.1/ref/csrf/
    * 
    * Used to make fetch requests to the API.
    * 
    * Originally called getCookie(name).
    */
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
// Save csrftoken
const csrftoken = getCSRFToken('csrftoken')