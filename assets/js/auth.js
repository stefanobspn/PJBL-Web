function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

function registerUser(email, password) {
    const users = getUsers();
    if (users.find(user => user.email === email)) {
        return { success: false, message: 'Email already exists.' };
    }
    const newUser = { id: Date.now().toString(), email, password }; // kalau di real jangan gini ya dek, dihash dulu
    users.push(newUser);
    saveUsers(users);
    return { success: true, message: 'Registration successful.' };
}

function loginUser(email, password) {
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password); // heheh
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        return { success: true };
    }
    return { success: false, message: 'Invalid credentials.' };
}

function logoutUser() {
    localStorage.removeItem('currentUser');
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser')) || null;
}

function isLoggedIn() {
    return !!getCurrentUser();
}
