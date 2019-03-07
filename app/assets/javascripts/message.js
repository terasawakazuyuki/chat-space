$(function() {
  function buildHTML(message){
    var messageImage = message.image?message.image:""
    var html =`<div class="message" data-messageid="${message.id}">
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
                  <div>
                    <img src=${messageImage}>
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
      contentType: false,
      disabled: false
    })
    .done(function(data) {
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      $('.form__message').val('');
      $("#new_message")[0].reset();
    })
    .always(() => {
      $(".form__submit").removeAttr("disabled")
    });
  })

  //自動更新
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
       setInterval(update,5000)
    };

  function update(){
    var href = window.location.href;
    var lastId = $('.message').last().attr('data-messageid');

    $.ajax({
      url: href,
      dataType: 'json',
      type: 'GET',
    })

    .done(function(data) {
      data.messages.forEach(function(message){
        console.log(lastId);
        if (message.id > lastId){
          var html = buildHTML(message);
          console.log(message.id)
          $('.messages').append(html);
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight},'fast');
        };
      });
    })
    .fail(function(){
      alert('メッセージの取得に失敗しました');
    });
  };

});
