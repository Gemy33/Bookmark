var inputWebsiteName = document.getElementById('inputWebsiteName');
var inputWebsiteUrl = document.getElementById('inputWebsiteUrl');
var mainOutput = document.getElementById('main');
var model = document.getElementById('model');
var showadd = document.getElementById('showadd');
var showAlart = document.getElementById('showAlart');
var container = [];
if (localStorage.getItem('websit') != null) {
  container = JSON.parse(localStorage.getItem('websit'));
  display();
}
function add() {
  var webSiteInfo = {
    name: inputWebsiteName.value,
    url: inputWebsiteUrl.value,
  }
  if (inputWebsiteName.classList.contains('is-valid') && inputWebsiteUrl.classList.contains('is-valid')) {
    container.push(webSiteInfo);
    localStorage.setItem('websit', JSON.stringify(container));
    clearInput();
    display();
    inputWebsiteName.classList.remove('is-valid');
    inputWebsiteUrl.classList.remove('is-valid');
  }
}
function display() {
  var result = '';
  for (var i = 0; i < container.length; i++) {
    result += `
            <tr class="text-center" >
            <td class="bg-white p-2">${i + 1}</td>
            <td class="bg-white p-2">${container[i].name}</td>
            <td class="bg-white p-2"><a href="https://${container[i].url}" type="submit" class="btn btn-success "><i class="fa-solid fa-eye pe-1"></i> Visit</a>
            </td>
            <td onclick="deleteitem(${i})" class="bg-white p-2"><button class="btn btn-danger "><i class="fa-solid fa-trash-can pe-1"></i>delete</button></td>
            </tr>
        `
  }
  mainOutput.innerHTML = result;
}
function deleteitem(index) {
  container.splice(index, 1);
  localStorage.setItem("websit", JSON.stringify(container));
  display();
}
function clearInput() {
  inputWebsiteName.value = null;
  inputWebsiteUrl.value = null;

}
function validationForUser(curent_element) {
  var valid_input = {
    inputWebsiteName: /^[a-z]{3,13}$/,
    inputWebsiteUrl: /^(www.)[a-z]{1,13}[0-9]?[a-z]{0,9}.{1}(com|net|org|edu|gov){1}$/i,
  }
  console.log(valid_input[curent_element.id].test(curent_element.value));
  if (valid_input[curent_element.id].test(curent_element.value)) {
    curent_element.classList.add('is-valid');
    curent_element.classList.remove('is-invalid');
    document.getElementById('innerbtn').innerHTML = `<button id="showadd"   onclick="add()"  class="btn  my-4 btn-danger   px-5 py-2">Submit</button>`
  }
  else {
    curent_element.classList.add('is-invalid');
    curent_element.classList.remove('is-valid');
    document.getElementById('innerbtn').innerHTML = `<button id="showadd"   onclick="add()" data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn  my-4 btn-danger   px-5 py-2">Submit</button>`
  }
}

