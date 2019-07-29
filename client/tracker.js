const postClient = () => {
  const body = {
    name: "Bob"
  }
  fetch('/clients', {
    method: 'POST',
    body: body
  })
  .then(res => res.text())
  .then(data => {
    console.log('client data', data)
  })
}

const getLocation = () => {
  const body = {
    id: 3,
    lat: 30.23,
    long: -97.7
  }

  fetch('/locations', {
    method: 'POST',
    body: {

    }
  })
  .then(res => res.json())
  .then(data => {
    const address = {};
    console.log('address', data.address);
  })

}