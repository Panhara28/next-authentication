export const LOGIN_MUTATION = `
    mutation LoginUser($input: UserLoginInput!) {
        loginUser(input: $input)
    }
`;

export const ME = `
    query Query {
        me {
            fullname
            id
            username
        }
    }
`;
