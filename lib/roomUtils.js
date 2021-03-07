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
    }
  }