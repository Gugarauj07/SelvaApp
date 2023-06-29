import React, { createContext} from 'react';

interface UserContextProps {
    user: any; // Altere o tipo do usuário para corresponder à sua estrutura de dados
  }
export const UserContext = createContext<UserContextProps>({user: undefined})

function UserProvider({
    children,
    user
}: any) {
    return(
        <UserContext.Provider value={{ user }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;