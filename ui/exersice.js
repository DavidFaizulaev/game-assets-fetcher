
const baseURL = 'http://localhost:3000/download/'
const myFetch = (id) => {
  fetch(baseURL + id)
  .then(response => response.body)
  .then(rs => {
    const reader = rs.getReader();

    return new ReadableStream({
      async start(controller) {
        while (true) {
          const { done, value } = await reader.read();

          // When no more data needs to be consumed, break the reading
          if (done) {
            break;
          }

          // Enqueue the next data chunk into our target stream
          controller.enqueue(value);
        }

        // Close the stream
        controller.close();
        reader.releaseLock();
      }
    })
  })
  .catch((error) => {
    console.error(error);
  })

  return;
}

document.addEventListener('click', event => {
    event.preventDefault();
	if (event.target.matches('.ID1')) {
        myFetch(1);
    }
	else if (event.target.matches('.ID2')) {
        myFetch(2);
    }
	else if (event.target.matches('.ID3')) {
        myFetch(3);
    }
    return

}, false);