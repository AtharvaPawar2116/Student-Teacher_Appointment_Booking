
        // Import Firebase SDK
        import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
        import { getDatabase, ref, get, set, update, remove, child } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";

        // Firebase configuration
        const firebaseConfig = {
            apiKey: "AIzaSyA9c56RHjdkfv3As_B4paNHLLo33AyXijo",
            authDomain: "project1-a194f.firebaseapp.com",
            projectId: "project1-a194f",
            storageBucket: "project1-a194f.appspot.com",
            messagingSenderId: "391298026661",
            appId: "1:391298026661:web:8fee318082a2bdca0a514c",
            measurementId: "G-V2E84P1YBW"
        };

        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const db = getDatabase();

        // Input elements
        const namebox = document.getElementById("namebox");
        const rollbox = document.getElementById("rollbox");
        const secbox = document.getElementById("secbox");
        const genbox = document.getElementById("genbox");

        // Buttons
        const insbtn = document.getElementById("insbtn");
        const selbtn = document.getElementById("selbtn");
        const updbtn = document.getElementById("updbtn");
        const delbtn = document.getElementById("delbtn");

        // Insert data function
        function InsertData() {
            set(ref(db, "TheStudents/" + rollbox.value), {
                NameOfStd: namebox.value,
                RollNo: rollbox.value,
                Section: secbox.value,
                Gender: genbox.value
            })
                .then(() => alert("Data stored successfully"))
                .catch((error) => alert("Unsuccessful, error: " + error));
        }

        // Select data function
        function selectData() {
            const dbref = ref(db);
            get(child(dbref, "TheStudents/" + rollbox.value))
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        namebox.value = snapshot.val().NameOfStd;
                        secbox.value = snapshot.val().Section;
                        genbox.value = snapshot.val().Gender;
                    } else {
                        alert("No data found");
                    }
                })
                .catch((error) => alert("Error fetching data: " + error));
        }

        // Update data function
        function updateData() {
            const dbRef = ref(db, "TheStudents/" + rollbox.value);
            update(dbRef, {
                NameOfStd: namebox.value,
                Section: secbox.value,
                Gender: genbox.value
            })
                .then(() => alert("Data updated successfully"))
                .catch((error) => alert("Error while updating data: " + error));
        }

        // Delete data function
        function removeData() {
            const dbRef = ref(db, "TheStudents/" + rollbox.value);
            remove(dbRef)
                .then(() => {
                    alert("Data removed successfully");
                    namebox.value = "";
                    rollbox.value = "";
                    secbox.value = "";
                    genbox.value = "";
                })
                .catch((error) => alert("Error while removing data: " + error));
        }

        // Event listeners
        insbtn.addEventListener("click", InsertData); // Insert data
        selbtn.addEventListener("click", selectData); // Select data
        updbtn.addEventListener("click", updateData); // Update data
        delbtn.addEventListener("click", removeData); // Delete data
    