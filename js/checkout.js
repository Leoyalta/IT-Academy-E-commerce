// Exercise 6
function validate() {
  let error = 0;
  const userForm = document.querySelector(".form");
  userForm.addEventListener("submit", (event) => {
    event.preventDefault();
  });
  // Get the input fields
  const fName = userForm.elements["fName"];
  const fEmail = userForm.elements["fEmail"];
  const fAddress = userForm.elements["fAddress"];
  const fLastName = userForm.elements["fLastN"];
  const fPassword = userForm.elements["fPassword"];
  const fPhone = userForm.elements["fPhone"];

  // Validate fields entered by the user: name, phone, password, and email
  if (!/^[A-Za-z]{3,}$/.test(fName.value.trim())) {
    error++;
    fName.classList.add("is-invalid");
  } else {
    fName.classList.remove("is-invalid");
  }
  if (
    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
      fEmail.value.trim()
    )
  ) {
    error++;
    fEmail.classList.add("is-invalid");
  } else {
    fEmail.classList.remove("is-invalid");
  }
  if (!/[a-zA-Z0-9.-]/.test(fAddress.value.trim())) {
    error++;
    fAddress.classList.add("is-invalid");
  } else {
    fAddress.classList.remove("is-invalid");
  }
  if (!/^[A-Za-z]{3,}$/.test(fLastName.value.trim())) {
    error++;
    fLastName.classList.add("is-invalid");
  } else {
    fLastName.classList.remove("is-invalid");
  }
  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(fPassword.value.trim())) {
    error++;
    fPassword.classList.add("is-invalid");
  } else {
    fPassword.classList.remove("is-invalid");
  }
  if (!/^\d{9}$/.test(fPhone.value)) {
    error++;
    fPhone.classList.add("is-invalid");
  } else {
    fPhone.classList.remove("is-invalid");
  }

  if (error > 0) {
    alert("Please correct the errors in the highlighted fields.");
  } else {
    alert("Form successfully submitted!");
  }
}
