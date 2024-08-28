document.addEventListener("DOMContentLoaded", function () {
  // ======= Modal Elements and Functionality =======
  const modal = document.getElementById("bookingFormModal");
  const bookTrialBtn = document.getElementById("bookTrialBtn");
  const closeModal = document.getElementById("closeModal");
  const exitForm = document.getElementById("exitForm");
  const confirmationModal = document.getElementById("confirmationModal");
  const modalYes = document.getElementById("modalYes");
  const modalNo = document.getElementById("modalNo");

  // Check if the elements exist before adding event listeners
  if (bookTrialBtn) {
    bookTrialBtn.addEventListener("click", function () {
      modal.style.display = "block";
    });
  }

  if (closeModal) {
    closeModal.addEventListener("click", function () {
      modal.style.display = "none";
    });
  }

  if (exitForm) {
    exitForm.addEventListener("click", function () {
      modal.style.display = "none";
    });
  }

  // Close the modal when clicking outside of it
  if (modal) {
    window.addEventListener("click", function (event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  }

  // ======= Booking Form Submission and Validation =======
  const bookingForm = document.getElementById("bookingForm");

  if (bookingForm) {
    bookingForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent the form from submitting the default way

      // Get form values
      const firstName = document.getElementById("firstName").value;
      const lastName = document.getElementById("lastName").value;
      const age = document.getElementById("age").value;
      const joiningDate = new Date(
        document.getElementById("joiningDate").value
      );
      const timeSelect = document.getElementById("timeSelect").value; // Get selected time
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set the time to 00:00:00 for comparison

      // Validate age
      if (age < 15) {
        alert("Age must be 15 or older.");
        return; // Stop execution if validation fails
      } else if (age > 55) {
        const confirmationModal = document.getElementById("confirmationModal");
        confirmationModal.style.display = "block";
        const modalYes = document.getElementById("modalYes"); // Show the custom confirmation modal for doctor's approval
        const modalNo = document.getElementById("modalNo");
      } else {
        // Validate joining date if age validation passes
        validateJoiningDate();
      }
    });
    // --------------Modal Button Functionality-------------
    modalYes.addEventListener("click", function () {
      confirmationModal.style.display = "none"; //Hide the confirmation modal
      validateJoiningDate();
    });

    modalNo.addEventListener("click", function () {
      alert("Sorry, you need a doctor's letter to join this class!");
      confirmationModal.style.display = "none";
      //Hide the confirmation modal
      bookingForm.reset();
    });
  } else {
    validateJoiningDate();
  }

  const cancelForm = document.querySelector(
    "#bookingForm button[type='reset']"
  );
  if (cancelForm) {
    cancelForm.addEventListener("click", function () {
      bookingForm.reset();
    });
  }
  // Function to validate joining date
  function validateJoiningDate() {
    const joiningDate = new Date(document.getElementById("joiningDate").value);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set the time to 00:00:00 for comparison

    // Validate joining date
    if (joiningDate <= today) {
      alert("Joining date must be a future date.");
      return; // Stop execution if validation fails
    }
    // Ensure a time slot is selected
    if (timeSelect === "") {
      alert("Please select a time slot.");
      return;
    }
    // If all validations pass, show a success message
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const fullName = firstName + " " + lastName;
    alert(`Thanks, ${fullName}, we have registered your interest.`);

    // Reset the form after submission
    bookingForm.reset();
  }
});
