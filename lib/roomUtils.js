module.exports = {
  getRooms: function (cb) {
    fetch('http://88.119.36.191:8888/api/rooms',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(response => {
        if (response.status === 201) {
          return response.json();
        } else {
          console.log(response.status);
          throw new Error('Something went wrong on api server!');
        }
      })
      .then(response => {
        cb(response);
      }).catch(error => {
        console.log(error);
      });
  },

  addRoom: function (name, desc, motd, cb) {
    let details = {
      'name': name,
      'desc': desc,
      'motd': motd
    };

    let formBody = [];
    for (let property in details) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join("&");

    fetch('http://88.119.36.191:8888/api/room',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formBody
      }).then(response => {
        if (response.status === 200 ) {

          cb(response, response.status, null);
        }
        else if(response.status === 401)
        {
          cb(response, response.status, "Not logged in")
        }
        else if(response.status === 403)
        {
          cb(response, response.status, "Room exists")
        }
         else {
          throw new Error('Something went wrong on api server!' + response.status);
        }
      })
      .then(response => {
        cb(response);
      }).catch(error => {
        console.log(error);
      });
  }
}