// Find the button, status message, and profile container.
const discoverButton = document.getElementById("discoverButton");
const status = document.getElementById("status");
const profilesContainer = document.getElementById("profilesContainer");

// Listen for a click on the Discover button.
discoverButton.addEventListener("click", function () {


// Tell the user that the API request is loading.
status.innerText = "Please wait... discovering profiles.";

// Disable the button while the request is running.
discoverButton.disabled = true;

// Clear profiles from the previous request.
profilesContainer.innerHTML = "";

// Request three random profiles from the Random User API.
axios.get("https://randomuser.me/api/?results=3")

    // This runs when the API responds successfully.
    .then(function (response) {

        // Get the array of profiles returned by the API.
        const profiles = response.data.results;

        // Update the status message.
        status.innerText = "Collection updated successfully.";

        // Go through every profile in the array.
        profiles.forEach(function (profile) {

            // Create a card for this profile.
            const card = document.createElement("article");
            card.classList.add("profile-card");

            // Create the profile photograph.
            const photo = document.createElement("img");
            photo.src = profile.picture.large;
            photo.alt = "Profile photograph of " +
                profile.name.first + " " + profile.name.last;

            // Create the person's full name.
            const name = document.createElement("h3");
            name.innerText = profile.name.first + " " +
                profile.name.last;

            // Create the person's location.
            const location = document.createElement("p");
            location.classList.add("location");
            location.innerText =
                profile.location.city + ", " +
                profile.location.country;

            // Create the person's email address.
            const email = document.createElement("p");
            email.classList.add("email");
            email.innerText = profile.email;

            // Put all profile information inside the card.
            card.appendChild(photo);
            card.appendChild(name);
            card.appendChild(location);
            card.appendChild(email);

            // Display the completed card on the webpage.
            profilesContainer.appendChild(card);

        });

    })

    // This runs if the API request fails.
    .catch(function (error) {

        // Tell the user that something went wrong.
        status.innerText =
            "Unable to load profiles. Please check your internet and try again.";

        // Show technical details in the browser console.
        console.error("API request failed:", error);

    })

    // This runs after the request finishes.
    .finally(function () {

        // Allow the user to click the button again.
        discoverButton.disabled = false;

    });


});
