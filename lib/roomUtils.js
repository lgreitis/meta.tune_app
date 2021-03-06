module.exports = {
  getRooms: function (cb) {
    fetch('http://88.119.36.191:8888/api/rooms',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(response => {
        if (response.status === 200) {
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

  getSongs: function (cb) {
    fetch('http://88.119.36.191:8888/api/playlist',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(response => {
        if (response.status === 200) {
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
      .catch(error => {
        console.log(error);
      });
  },
  addSongToPlaylist: function (id, cb) {
    let details = {
      id: id
    };
    

    let formBody = [];
    for (let property in details) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join("&");

    fetch('http://88.119.36.191:8888/api/addToPlaylist',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formBody
      }).then(response => {
        if (response.status === 201 ) {
          cb(response, response.status);
        }
        else if(response.status === 401)
        {
          cb(response, response.status)
        }
        else if(response.status === 403)
        {
          cb(response, response.status)
        }
        else if(response.status === 406)
        {
          cb(response,response.status)
        }
         else {
          throw new Error('Something went wrong on api server!' + response.status);
        }
      })
      .catch(error => {
        console.log(error);
      });
  },
  deleteSongFromPlaylist: function (id, cb) {
    let details = {
      id: id
    };
    
    let formBody = [];
    for (let property in details) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join("&");

    fetch('http://88.119.36.191:8888/api/playlist',
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formBody
      }).then(response => {
        if (response.status === 200 ) {
          cb(response, response.status);
        }
        else if(response.status === 401)
        {
          cb(response, response.status)
        }
        else if(response.status === 500)
        {
          cb(response, response.status)
        }
         else {
          throw new Error('Something went wrong on api server!' + response.status);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
}