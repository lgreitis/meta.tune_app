module.exports = {
  submitHandler: function (email, password, cb) {
    let details = {
      'email': email,
      'password': password
    };
    
    let formBody = [];
    for (let property in details) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    fetch('http://88.119.36.191:8888/api/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formBody
      }).then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error('Something went wrong on api server!');
        }
      })
      .then(response => {
        cb(response);
      }).catch(error => {
        console.log(error);
      });
  },
  
  signUpHandler: function (username, email, password, password2, cb) {
    let details = {
      'email': email,
      'name': username,
      'password': password,
      'password2': password2
    };

    let formBody = [];
    for (let property in details) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    fetch('http://88.119.36.191:8888/api/signup',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
        },
        body: formBody
      }).then(response => {
        if (response.status === 201 ) {

          cb(response, response.status, null);
        }
        else if(response.status === 400)
        {
          response.json().then(data =>{
            cb(response, response.status, data[0].msg);
          })
        }
         else {
          throw new Error('Something went wrong on api server!' + response.status);
        }
      }).catch(error => {
        console.log(error);
      });
  }
}