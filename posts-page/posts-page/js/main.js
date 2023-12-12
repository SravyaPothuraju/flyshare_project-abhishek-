"use strict";

$(document).ready(function () {
  const url =
    "https://raw.githubusercontent.com/ashhadulislam/JSON-Airports-India/master/airports.json";

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const citiesWithCodes = data.airports.map((airport) => ({
        cityName: airport.city_name,
        IATACode: airport.IATA_code,
      }));

      populateCitiesList(citiesWithCodes, "cityInputFrom", "citiesListFrom");
      populateCitiesList(citiesWithCodes, "cityInputTo", "citiesListTo");
    })
    .catch((error) => {
      console.error("There was a problem fetching the data:", error);
    });

  function populateCitiesList(citiesWithCodes, inputId, dataListId) {
    const datalist = document.createElement("datalist");
    datalist.id = dataListId;

    citiesWithCodes.forEach((city) => {
      const option = document.createElement("option");
      option.value = `${city.cityName} (${city.IATACode})`;
      datalist.appendChild(option);
    });

    const existingDatalist = document.getElementById(dataListId);
    if (existingDatalist) {
      existingDatalist.parentNode.removeChild(existingDatalist);
    }

    document.body.appendChild(datalist);

    const cityInput = document.getElementById(inputId);
    cityInput.setAttribute("list", dataListId);

    cityInput.addEventListener("input", function () {
      const inputText = this.value.toLowerCase();
      const matchingCities = citiesWithCodes.filter(
        (city) =>
          city.cityName.toLowerCase().includes(inputText) ||
          city.IATACode.toLowerCase().includes(inputText)
      );

      showCities(matchingCities, dataListId);
    });

    function showCities(matchingCities, dataListId) {
      const datalist = document.createElement("datalist");
      datalist.id = dataListId;

      matchingCities.forEach((city) => {
        const option = document.createElement("option");
        option.value = `${city.cityName} (${city.IATACode})`;
        datalist.appendChild(option);
      });

      const existingDatalist = document.getElementById(dataListId);
      if (existingDatalist) {
        existingDatalist.parentNode.removeChild(existingDatalist);
      }

      document.body.appendChild(datalist);
      cityInput.setAttribute("list", dataListId);
    }
  }
  $("form").on("submit", function (e) {
    e.preventDefault();

    var isFlightValid = false;
    var isPNRValid = false;

    // Validation for Flight Number
    var flightNumber = $("input[placeholder='Flight number']").val().trim();
    var alphanumericRegexFlight = /^[a-zA-Z0-9]{0,6}$/; // Alphanumeric, max 6 characters
    if (!alphanumericRegexFlight.test(flightNumber)) {
      $(".error-message-flight").remove();
      $("input[placeholder='Flight number']").after('<span class="error-message-flight">maximum 6 characters.</span>');
    } else {
      $(".error-message-flight").remove();
      isFlightValid = true;
    }

    // Validation for PNR Number
    var pnrNumber = $("input[placeholder='PNR number']").val().trim();
    var alphanumericRegexPNR = /^[a-zA-Z0-9]{6}$/; // Exactly 6 alphanumeric characters
    if (!alphanumericRegexPNR.test(pnrNumber)) {
      $(".error-message-pnr").remove();
      $("input[placeholder='PNR number']").after('<span class="error-message-pnr">exactly 6 characters.</span>');
    } else {
      $(".error-message-pnr").remove();
      isPNRValid = true;
    }

    // Check if both validations passed before proceeding
    if (isFlightValid && isPNRValid) {
      // Proceed with form submission or other actions
      alert("Form submitted successfully!");
      // this.submit(); // Uncomment this line to proceed with actual form submission
    }
  });
  // Your existing functionality
  $(".btn-forget").on("click", function (e) {
    e.preventDefault();
    var inputField = $(this).closest("form").find("input");
    if (inputField.attr("required") && inputField.val()) {
      $(".error-message").remove();
      $(".form-items", ".form-content").addClass("hide-it");
      $(".form-sent", ".form-content").addClass("show-it");
    } else {
      $(".error-message").remove();
      $(
        '<small class="error-message">Please fill the field.</small>'
      ).insertAfter(inputField);
    }
  });

  $(".btn-tab-next").on("click", function (e) {
    e.preventDefault();
    $(".nav-tabs .nav-item > .active")
      .parent()
      .next("li")
      .find("a")
      .trigger("click");
  });

  $('.custom-file input[type="file"]').on("change", function () {
    var filename = $(this).val().split("\\").pop();
    $(this).next().text(filename);
  });
});
