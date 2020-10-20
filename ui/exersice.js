const baseURL = 'http://localhost:3000/download/'
const myFetch = (id) => {
    var element = document.createElement('a');
    element.setAttribute('href', baseURL + id);
    element.setAttribute('download', 'zip1.zip');
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
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