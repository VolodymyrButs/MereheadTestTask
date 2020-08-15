import React, { useEffect, useReducer, useState } from 'react'
import styled from 'styled-components'

import { Pagination } from './Pagination'
import { CreateUser } from './CreateUser'
import { EditUser } from './EditUser'
import { loadState, saveState } from './localStorage'

const UsersWrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`

const UserWrapper = styled.div`
    border: 1px solid black;
    border-radius: 15px;
    margin: 10px;
    padding: 10px;
    button,
    p,
    span {
        margin: 10px;
        padding: 5px 10px;
        border-radius: 10px;
        outline: none;
    }
`

const App = () => {
    const initState = loadState()
    function reducer(users, action) {
        switch (action.type) {
            case 'add':
                return {
                    users: action.data,
                }
            default:
                throw new Error()
        }
    }
    const [list, dispatch] = useReducer(reducer, initState)
    useEffect(() => {
        saveState(list)
    }, [list])

    const getUsers = () => {
        fetch(`http://77.120.241.80:8911/api/users`)
            .then((response) => response.json())
            .then((data) => {
                dispatch({
                    type: 'add',
                    data,
                })
            })
    }
    useEffect(() => {
        getUsers()
    }, [])
    const [currentPage, setCurrentPage] = useState(1)
    const usersPerPage = 5

    const currentUsers = list.users.slice(
        (currentPage - 1) * usersPerPage,
        currentPage * usersPerPage
    )
    return (
        <>
            <CreateUser getUsers={getUsers} />
            <Pagination
                list={list}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                usersPerPage={usersPerPage}
            />
            <UsersWrapper>
                {currentUsers.map((user, index) => {
                    return (
                        <UserWrapper key={index}>
                            <p>Name: {user.name}</p>
                            <p>Surname: {user.surname}</p>

                            <p>Description: {user.desc}</p>

                            <EditUser user={user} getUsers={getUsers} />
                        </UserWrapper>
                    )
                })}
            </UsersWrapper>
        </>
    )
}

export default App
