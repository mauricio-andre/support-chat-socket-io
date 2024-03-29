let socketAdminId = null;
let emailUser = null;
let socket = null;

document.querySelector('#start_chat').addEventListener('click', event => {
  socket = io();

  const chat_help = document.getElementById('chat_help');
  chat_help.style.display = 'none';

  const chat_in_support = document.getElementById('chat_in_support');
  chat_in_support.style.display = 'block';

  const email = document.getElementById('email').value;
  emailUser = email;

  const text = document.getElementById('txt_help').value;

  socket.on('connect', () => {
    const params = {
      email,
      text,
    };

    socket.emit('clientFirstAccess', params, (call, err) => {
      if (err) {
        console.err(err);
      } else {
        console.log(call);
      }
    });
  });

  socket.on('clientListAllMessages', messages => {
    var template_admin = document.getElementById('admin-template').innerHTML;
    var template_client = document.getElementById(
      'message-user-template',
    ).innerHTML;

    messages.forEach(message => {
      if (message.adminId === null) {
        const rendered = Mustache.render(template_client, {
          message: message.text,
          email,
        });

        document.getElementById('messages').innerHTML += rendered;
      } else {
        const rendered = Mustache.render(template_admin, {
          message_admin: message.text,
        });

        document.getElementById('messages').innerHTML += rendered;
      }
    });
  });

  socket.on('adminSendToClient', message => {
    socketAdminId = message.socketId;

    const template_admin = document.getElementById('admin-template').innerHTML;

    const rendered = Mustache.render(template_admin, {
      message_admin: message.text,
    });

    document.getElementById('messages').innerHTML += rendered;
  });
});

document
  .querySelector('#send_message_button')
  .addEventListener('click', event => {
    const text = document.getElementById('message_user');

    const params = {
      text: text.value,
      socketAdminId,
    };

    socket.emit('clientSendToAdmin', params);

    const template_client = document.getElementById(
      'message-user-template',
    ).innerHTML;

    const rendered = Mustache.render(template_client, {
      message: text.value,
      email: emailUser,
    });

    document.getElementById('messages').innerHTML += rendered;
  });
