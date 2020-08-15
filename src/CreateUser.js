import React, { useState } from 'react'
import styled from 'styled-components'

export const FormStyled = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 0;
    justify-content: center;
    border: 1px solid black;
    border-radius: 15px;
    margin: 10px;
    padding: 10px;
    background-color: lightgray;
    input,
    button {
        margin: 10px;
        padding: 5px 10px;
        font-weight: bold;
        border-radius: 10px;
        outline: none;
    }
    @media (min-width: 860px) {
        flex-direction: row;
    }
`
export const CreateUser = ({ getUsers }) => {
    const [userName, setUserName] = useState('')
    const [userSurname, setUserSurname] = useState('')
    const [userDescription, setUserDescription] = useState('')

    const handleUserNameChange = (e) => {
        setUserName(e.currentTarget.value)
    }
    const handleUserSurname = (e) => {
        setUserSurname(e.currentTarget.value)
    }
    const handleUserDescription = (e) => {
        setUserDescription(e.currentTarget.value)
    }

    const handleCreateUser = (e) => {
        e.preventDefault()
        fetch(
            `https://cors-anywhere.herokuapp.com/http://77.120.241.80:8911/api/users`,
            {
                method: 'POST',
                body: JSON.stringify({
                    name: userName,
                    surname: userSurname,
                    desc: userDescription,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        ).then((response) => response && getUsers())
    }
    return (
        <FormStyled onSubmit={handleCreateUser}>
            <h3>Create user</h3>
            <input
                type="text"
                name="name"
                placeholder="input name"
                onChange={handleUserNameChange}
                required
            />
            <input
                type="text"
                name="surname"
                placeholder="input surname"
                onChange={handleUserSurname}
                required
            />
            <input
                type="text"
                name="desc"
                placeholder="input desc"
                onChange={handleUserDescription}
                required
            />
            <button type="submit">Create user</button>
        </FormStyled>
    )
}
