// deleteModal event
document.getElementById('deleteModal').addEventListener('show.bs.modal', (event) => {
    const button = event.relatedTarget;
    const userId = button.getAttribute('data-user-id');
    document.getElementById('confirmDelete').onclick = () => {
        deleteUser(userId);
    };
});


//EditModal event
document.getElementById('EditModal').addEventListener('show.bs.modal', async (event) => {
    const button = event.relatedTarget;
    const userId = button.getAttribute('data-user-id');

    const userRequest = {
        userId: userId
    }
    const userData = await fetchUser(userRequest);

    document.getElementById('first-name').value = userData.first_name;
    document.getElementById('last-name').value = userData.last_name;
    document.getElementById('email').value = userData.email;
    document.getElementById('saveChanges').onclick = async () => {
        const modifiedData = {
            first_name: document.getElementById('first-name').value,
            last_name: document.getElementById('last-name').value,
            email: document.getElementById('email').value
        };

        try {
            await updateUser(userId, modifiedData);
            location.reload();
        }
        catch (error) {
            console.log(error.message);
        }
    }
});


//function for request sending and response recieving to delete user
const deleteUser = async (userId) => {
    try {
        const response = await fetch(`/admin/users?userId=${userId}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            location.reload();
        }
        else {
            console.log('Failed to delete user', response.statusText);
        }
    }
    catch (error) {
        console.log('Error deleting user', error.message);
    }
    finally {
        $('#deleteModal').modal('hide');
    }
}


//fetch user
const fetchUser = async (userRequest) => {
    try {
        const response = await fetch(`/admin/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userRequest)
        });

        const userData = await response.json();
        return userData;
    }
    catch (error) {
        console.log(error);
    }
}


//function for request sending and response recieving to update user
const updateUser = async (userId, modifiedData) => {
    try {
        const response = await fetch(`/admin/users?userId=${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(modifiedData)
        });

        if (!response.ok) {
            throw new Error('Network response not ok')
        }
    }
    catch (error) {
        console.log(error.message);
        throw error;
    }
};

