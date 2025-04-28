//IMPORTANTE  1. Po zalogowaniu pojawia się pasek przewijania, menu nie jest FIXED. 

window.addEventListener("DOMContentLoaded", function() {

    document.body.classList.add("default-background");
    const logInButton = document.querySelector("#login-button");
    const logo = document.querySelector("#logo-wrapper");
    const loginForm = document.querySelector("#login-form");
    const showRegister = document.querySelector("#show-register");
    const showLogin = document.querySelector("#show-login");
    const registerForm = document.querySelector("#register-form");
    const loginSection = document.querySelector("#login-section");
    const infoSection = document.querySelector("#info-section");
    const userPanel = document.querySelector("#user-panel");
    const header = document.querySelector("header");
    const mainContent = document.querySelector("#main-content");
    const logOutButton = document.querySelector("#logout-button");
    const button = document.querySelectorAll(".read-more");
    const welcomeBox = document.querySelector("#welcome-box");


    showRegister.addEventListener("click", function (e) {
        e.preventDefault();
        loginForm.classList.remove("visible");
    
        setTimeout(() => {
        loginForm.style.display = "none";
        registerForm.style.display = "flex";
    
        setTimeout(() => {
            registerForm.classList.add("visible");
        }, 10);
        }, 300);
    });
    
    showLogin.addEventListener("click", function (e) {
        e.preventDefault();
        registerForm.classList.remove("visible"); // fade-out rejestracji
    
        setTimeout(() => {
        registerForm.style.display = "none"; // ukryj z DOM
        loginForm.style.display = "flex"; // pokaż logowanie
        setTimeout(() => {
            loginForm.classList.add("visible"); // fade-in
        }, 10);
        }, 300); // odczekaj na fade-out
    });
    
    function getUsers() {
        return JSON.parse(localStorage.getItem("users") || "{}");
    }
    
    function saveUsers(users) {
        localStorage.setItem("users", JSON.stringify(users));
    }
    
    function registerUser(login, password) {
        const users = getUsers();
    
        if (users[login]) {
        return { success: false, message: "Użytkownik już istnieje!" };
        }
    
        if (login.length < 4) {
        return { success: false, message: "Login musi mieć min. 4 znaki." };
        }
    
        if (password.length < 6) {
        return { success: false, message: "Hasło musi mieć min. 6 znaków." };
        }
    
        users[login] = { password };
        saveUsers(users);
        return { success: true };
    }
    
    function logInUser(login, password) {
        const users = getUsers();
    
        if (!users[login]) {
        return { success: false, message: "Taki użytkownik nie istnieje." };
        }
    
        if (users[login].password !== password) {
        return { success: false, message: "Nieprawidłowe hasło." };
        }
    
        return { success: true };
    }
    
    registerButton = document.querySelector("#show-register");
    registerButton.addEventListener("click", function (e) {
        e.preventDefault();

        const login = document.querySelector("#register-login").value.trim();
        const password = document.querySelector("#register-password").value;
        const loginMessage = document.querySelector("#login-message");

        loginMessage.classList.remove("error", "success");
        loginMessage.textContent = "";

        const result = registerUser(login, password);

        loginMessage.style.display = "block";
        loginMessage.style.opacity = "1";

        if (result.success) {
            loginMessage.classList.add("success");
            loginMessage.textContent = "Zarejestrowano pomyślnie. Zaloguj się.";
            setTimeout(() => {
                loginMessage.style.opacity = "0";
            }, 1300);
            setTimeout(() => {
                loginMessage.style.display = "none";
                loginMessage.textContent = "";
                loginMessage.classList.remove("success");
            }, 2500);
        } 
        else {
            loginMessage.classList.add("error");
            loginMessage.textContent = result.message;
            setTimeout(() => {
                loginMessage.style.opacity = "0";
            }, 1300);
            setTimeout(() => {
                loginMessage.style.display = "none";
                loginMessage.textContent = "";
                loginMessage.classList.remove("error");
            }, 2500);
        }
    });

    logInButton.addEventListener("click", function(event) {
        event.preventDefault();
        const loginInput = document.querySelector("#login-form input[type='text']");
        const passwordInput = document.querySelector("#login-form input[type='password']");
        const loginMessage = document.querySelector("#login-message");
        loginMessage.classList.remove("error", "success");
        loginMessage.textContent = "";

        if (loginInput.value === "" || passwordInput.value === "") {

            loginMessage.classList.add("error");
            loginMessage.style.display = "block";
            loginMessage.style.opacity = "1";
            loginMessage.textContent = "Podano nieprawidłowe dane!";
            setTimeout(() => {
                loginMessage.style.opacity = "0";
                setTimeout(() => {
                    loginMessage.style.display = "none";
                }, 500);
            }, 1300);
            return;  // IMPORTANTE czy to usunąć czy jest potrzebne? 
            }
            
            else {
            loginMessage.classList.add("success");
            loginMessage.textContent = "Zalogowano poprawnie!";
            logo.style.display = "none";
            //IMPORTANTE Kod nadal przyjmuje błędne dane logowania nie zawarte w local storage
        
            loginForm.style.display = "none";
            welcomeBox.style.display = "block";
            loginMessage.style.opacity = "1";
            
            setTimeout(() => {
                loginMessage.style.opacity = "0";
            }, 1300);
            
            setTimeout(() => {
                loginMessage.textContent = "";
                loginMessage.classList.remove("success");
            }, 2000);
            welcomeBox.textContent = `Witaj, ${loginInput.value}! Cieszymy się, że jesteś z nami.`;
            
            setTimeout(function() {
                welcomeBox.style.opacity = "1";
            }, 50);

            setTimeout(() => {
                const loginSection = document.querySelector("#login-section");
                loginSection.style.opacity = "0";
                const headerDisplay = document.querySelector("header");
                headerDisplay.style.display = "none";

                setTimeout(() => {
                    loginSection.style.display = "none";
                    const infoSection = document.querySelector("#info-section");
                    headerDisplay.style.display = "block";
                    infoSection.style.display = "block";
                    mainContent.classList.add("visible");
                    mainContent.style.display = "block";
                    setTimeout(() => {
                        document.body.classList.remove("default-background");
                        document.body.classList.add("reading-background");
                        infoSection.style.opacity = "1";
                    }, 50);
                }, 500);
            }, 3000);
        }

        userPanel.innerHTML = `<span>${loginInput.value}</span>
                                <button id="logout-button" title="logout">
                                <i class="fas fa-power-off"></i>
                                </button>`;
        setTimeout(() => {});
        const logOutButton = document.querySelector("#logout-button");
        logOutButton.addEventListener("click", logOutUser);
        }, 10);
    });    

    const userPanel = document.querySelector("#user-panel");
    const infoSection = document.querySelector("#info-section");
    function logOutUser() {
        localStorage.removeItem("loggedUser");
        welcomeBox = document.querySelector("#welcome-box");
        // 1. FADE-OUT
        welcomeBox.style.opacity = "0";
        mainContent.style.opacity = "0";
        userPanel.style.opacity = "0";
        infoSection.style.opacity = "0";
        header.style.opacity = "0";
    
        // 2. SCHOWAJ WSZYSTKO PO 500ms
        setTimeout(() => {
            welcomeBox.style.display = "none";
            mainContent.style.display = "none";
            mainContent.classList.remove("visible");
            userPanel.style.display = "none";
            infoSection.style.display = "none";
            header.style.display = "none";
    
            // Zmień tło
            const logo = document.querySelector("#logo-wrapper");
            const loginSection = document.querySelector("#login-section");
            document.body.classList.remove("reading-background");
            document.body.classList.add("default-background");
            logo.style.display = "none";
            loginSection.displat = "none";
    
            // 3. Pokaż formularz logowania
            const loginForm = document.querySelector("#login-form");
            logo.style.display = "block";
            loginSection.style.display = "block";
            loginForm.style.display = "flex";
    
            // Usuń opacity z inline stylu (jeśli było nadpisane)
            loginSection.style.opacity = "1";
            
            // 4. Dodaj fade-in loginForm po chwili
            setTimeout(() => {
                loginForm.style.opacity = "1";
            }, 10);
        }, 500);
    }
    const readMoreButtons = document.querySelectorAll(".read-more");
    const articlePreview = document.querySelector("#article-preview");
    readMoreButtons.forEach(button => {
        button.addEventListener("click", function(e) {
            e.preventDefault();
            mainContent.classList.remove("visible");
            articlePreview.classList.add("visible");
        });
    });

    const goBackButton = document.querySelector(".go-back");
    const mainContent = document.querySelector("#main-content");
    goBackButton.addEventListener("click", function(e) {
        e.preventDefault();
        setTimeout(()=> {
        articlePreview.classList.remove("visible");
        mainContent.classList.add("visible");
            }, 50);
        });
    

