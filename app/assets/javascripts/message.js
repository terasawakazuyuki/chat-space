$(function() {
  function buildHTML(message){
    var html =`<div class="message">
                <div class="upper-message">
                  <div class="upper-message__user-name">
                  ${message.user_name}
                  </div>
                  <div class="upper-message__date">
                  ${message.created_at}
                  </div>
                </div>
                <div class="lower-meesage">
                  <p class="lower-message__content">
                  ${message.content}
                  </p>
                  ${message.image}
                </div>
              </div>`
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).prop('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      var html = buildHTML(data);
      $('.messages').append(html)
      $('.form__message').val('');
    })
    .always(() => {
      $(".form__submit").removeAttr("disabled")
    });
  })
});
