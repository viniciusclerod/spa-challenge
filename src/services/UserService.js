import users from '../mocks/users.json';

export default class UserService {

    static async search(keywords) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(users
                    .filter(user => (
                        user.first_name.match(new RegExp(keywords, 'i')) ||
                        user.last_name.match(new RegExp(keywords, 'i'))
                    ))
                    .sort((a, b) =>
                        `${a.first_name} ${a.last_name}`.localeCompare(`${b.first_name} ${b.last_name}`)
                    )
                );
            }, 1000);

        })

    }

}