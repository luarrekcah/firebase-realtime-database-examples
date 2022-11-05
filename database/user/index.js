const { getDatabase, set, ref, push, query, equalTo, update, remove, onValue, child } = require('@firebase/database');

module.exports = {
    /**
     * @param string [userid, username, email, imageUrl] - Set's user by provided id
     */
    writeUserData: (userId, username, email, imageUrl) => {
        const db = getDatabase();
        set(ref(db, 'test/users/' + userId), {
            username,
            email,
            profile_picture: imageUrl
        }).then(
            console.log("[GRAVAÇÃO] User salvo no banco de dados.")
        ).catch((error) => {
            // The write failed...
            console.log(error);
        });
    },
    pushUserData: (username, email, imageUrl) => {
        const db = getDatabase();
        push(ref(db, 'test/users/'), {
            username,
            email,
            profile_picture: imageUrl
        }).then(
            console.log("[GRAVAÇÃO] User salvo no banco de dados.")
        ).catch((error) => {
            // The write failed...
            console.log(error);
        });
    },
    getUserData: (uniqueParam) => {
        const db = getDatabase();
        console.log(query(ref(db, 'test/users/'), equalTo(uniqueParam)));
    },
    getUserById: (id) => {
        const db = getDatabase();
        const user = ref(db, 'test/users/' + id);
        onValue(user, (snapshot) => {
            console.log(snapshot.val());
        }, {
            onlyOnce: true
        }).then(
            console.log("[GET] User coletado do banco de dados.")
        ).catch((error) => {
            // The write failed...
            console.log(error);
        });
    },
    updateUser: (id, params) => {
        /*
         * params need be object like: { uid: 'uniqueUID', username: 'Catchaa!', ...props }
         */
        const db = getDatabase();
        update(ref(db, 'test/users/' + id), {
            params
        }).then(
            console.log("[ATUALIZAÇÃO] User atualizado no banco de dados.")
        ).catch((error) => {
            // The write failed...
            console.log(error);
        });
    },
    deleteUser: (id) => {
        const db = getDatabase();
        remove(ref(db, 'test/users/' + id))
            .then(
                console.log("[REMOÇÃO] User removido do banco de dados.")
            ).catch((error) => {
                // The write failed...
                console.log(error);
            });
    },
    getAllUsers: () => {
        const db = getDatabase();
        const usersRef = ref(db, 'test/users');
        onValue(usersRef, snapshot => {
            let allUsers = [];
            if (snapshot.exists()) {
                snapshot.forEach(childSnapshot => {
                    let key = childSnapshot.key,
                        data = childSnapshot.val();
                    allUsers.push({ key, data })
                });
                /*
                 * set your global variable here, example:
                 *
                 * this.setState({data: allUsers})
                 */
                console.log("\n\n[LIST ALL USERS]:::\n\n", allUsers);
                /**
                 * EXAMPLE OUTPUT:
                 * 
                 * [
                 *  {
                 *       key: '-NG7xBvLOuj4SZ4CcV5n',
                 *       data: {
                 *        email: 'devluar.com',
                 *        profile_picture: 'https://somePicUrl.png',
                 *        username: 'luarrekcah'
                 *       }
                 *   }
                 * ]
                 */
            } else {
                return { error: 'Users database is null' }
            }
        }, {
            onlyOnce: true,
        });
    }
}